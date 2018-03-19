import {UploadedFile} from "express-fileupload";
import * as ffmpeg from "ffmpeg";
import * as fs from "fs";
import * as sizeOf from "image-size";
import * as path from "path";
import * as shortid from "shortid";
import config from "../config/config";
import {Size} from "../models/creativity/creativity.model";
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

    public async getSize(fileSource: string, filetype: string): Promise<Size> {
        let size: Size;

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

        } else { throw new Error("Check size: invalid filetype"); }

        return size;
    }

    public createPath(user: User, file: UploadedFile): string {
        const mediaDirectory = path.basename(path.join(__dirname, "media"));
        const envDirectory = path.join(mediaDirectory, (process.env.NODE_ENV || "development"));
        const userDirectory = path.join(envDirectory, user._id.toString());

        if (!fs.existsSync(mediaDirectory)) { fs.mkdirSync(mediaDirectory); }
        if (!fs.existsSync(envDirectory)) { fs.mkdirSync(envDirectory); }
        if (!fs.existsSync(userDirectory)) { fs.mkdirSync(userDirectory); }

        return userDirectory;
    }

    public makeFileName(fileformat: string): string {
        return shortid.generate() + "." + fileformat;
    }
}
