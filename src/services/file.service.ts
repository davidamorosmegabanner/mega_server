import * as ffmpeg from "ffmpeg";
import * as fs from "fs";
import * as gm from "gm";
import * as sizeOf from "image-size";
import * as path from "path";
import * as uuidv4 from "uuid/v4";
import * as thumbler from "video-thumb";
import config from "../config/config";
import {Dimensions} from "../models/creativity/dimensions";
import {User} from "../models/user/user.model";

/**
 *
 * General functions to manage files
 *
 */

export class FileService {

    public checkMimetype(mimetype: string): string {
        const acceptedMedia = config.acceptedMedia;

        if (acceptedMedia.indexOf(mimetype) !== -1) {
            return mimetype;
        } else {
            throw new Error("Unsupported mimetype. \nSupported: " + acceptedMedia.join(", ") + ".");
        }
    }

    public getFiletype(mimetype: string): string {
        if (mimetype.includes("image")) {
            return "image";
        }
        if (mimetype.includes("video")) {
            return "video";
        }
        throw new Error("Unsupported file type");
    }

    public getFileformat(mimetype: string): string {
        return(mimetype.replace("video/", "").replace("image/", ""));
    }

    public async getDimensions(fileSource: string, filetype: string): Promise<Dimensions> {
        let size: Dimensions;

        if (filetype === "image") {

            const imageSize = await sizeOf(fileSource);
            size = {
                width: imageSize.width,
                height: imageSize.height,
            };

        } else if (filetype === "video") {

            const video = await ffmpeg(fileSource);
            size = {
                width: video.metadata.video.resolution.w,
                height: video.metadata.video.resolution.h,
            };

        } else { throw new Error("Check size failed"); }

        return size;
    }

    public async getSize(fileSource): Promise<number> {
        const stats = fs.statSync(fileSource);
        return stats.size;
    }

    public async createThumbnail(fileSource: string, filetype: string): Promise<string> {
        const fileName = fileSource.substr(0, fileSource.lastIndexOf("."));
        const fileAdded = "_120x180.";
        const fileExtension = fileSource.substr(fileSource.lastIndexOf(".") + 1);
        let fileDestination: string = "";

        if (filetype === "image") {
            fileDestination = fileName + fileAdded + fileExtension;
            fs.createReadStream(fileSource).pipe(fs.createWriteStream(fileDestination));
            gm(fileDestination).resize(180, 120);
        }
        if (filetype === "video") {
            fileDestination = fileName + fileAdded + "png";
            await this.makeVideoThumbnail(fileSource, fileDestination);
        }
        return fileDestination;
    }

    public async getDuration(fileSource: string, filetype: string): Promise<number> {
        const video = await ffmpeg(fileSource);
        return video.metadata.duration.seconds * 1000;
    }

    public createPath(user: User): string {
        const mediaDirectory = path.basename(path.join(__dirname, "media"));
        const envDirectory = path.join(mediaDirectory, (process.env.NODE_ENV || "development"));
        const userDirectory = path.join(envDirectory, user._id.toString());

        if (!fs.existsSync(mediaDirectory)) { fs.mkdirSync(mediaDirectory); }
        if (!fs.existsSync(envDirectory)) { fs.mkdirSync(envDirectory); }
        if (!fs.existsSync(userDirectory)) { fs.mkdirSync(userDirectory); }

        return userDirectory;
    }

    public makeFileName(fileformat: string): string {
        return uuidv4() + "." + fileformat;
    }

    public async encodeBase64(file: string): Promise<string> {
        // Source: https://stackoverflow.com/questions/8110294/nodejs-base64-image-encoding-decoding-not-quite-working
        return new Promise<any> ((resolve, reject) => {
            fs.readFile(file, (err, originalData) => {
                if (err) {reject(err); }
                const base64Image = originalData.toString('base64');
                resolve(base64Image);
            });
        });
        // // read binary data
        // const bitmap = fs.readFileSync(file);
        // // convert binary data to base64 encoded string
        // return fs.readFileSync(file, { encoding: 'base64' })
    }

    private makeVideoThumbnail(fileSource: string, fileDestination: string): Promise<void> {
        return new Promise<void>((resolve) => {
            thumbler.extract(fileSource, fileDestination, "00:00:01", "180x120", (err) => {
                if (err) { throw new Error(err); }
                resolve();
            });
        });
    }
}
