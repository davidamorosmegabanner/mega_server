import {logger} from "../../config/logger";

import * as path from "path";
import {Creativity} from "../../models/creativity/creativity.model";

import {CreativityService} from "../../models/creativity/creativity.service";
import {DimensionsModel} from "../../models/creativity/dimensions.model";
import {User} from "../../models/user/user.model";
import {UserService} from "../../models/user/user.service";
import {ExpressSignature} from "../Route";
import {AuthService} from "../user/auth.service";
import {FileService} from "./file.service";

const authService = new AuthService();
const creativityService = new CreativityService();
const fileService = new FileService();
const userService = new UserService();

export let create: ExpressSignature = async (request, response, next) => {
    // TODO upload files to another static server

    const params = request.body;
    const allowedRoles = ["admin"];

    if (!await authService.isAllowed(allowedRoles, request)) {
        response.status(401).send("Unauthorized");
    }

    if (!request.files) {
        response.status(404).send("No files were uploaded!");
    }

    if (!request.files.file) {
        response.status(404).send("Please upload a file with param 'file'");
    }

    if (!request.body.name) {
        response.status(404).send("Please give a name as param 'name' in body");
    }

    const xAccessToken = request.headers["x-access-token"].toString();
    try {
        const file: any = request.files.file;

        const user: User = await userService.findByToken(xAccessToken);
        const mimetype: string = fileService.checkMimetype(file.mimetype);
        const filetype: string = fileService.getFiletype(file.mimetype);
        const fileformat: string = fileService.getFileformat(file.mimetype);

        file.name = fileService.makeFileName(fileformat);

        const fileSource: string = path.join(fileService.createPath(user), file.name);
        await file.mv(fileSource);
        const dimensions: DimensionsModel = await fileService.getDimensions(fileSource, filetype);
        const thumbnail = await fileService.createThumbnail(fileSource, filetype);
        const size = await fileService.getSize(fileSource);
        let duration: number;
        if (filetype === "video") { duration = await fileService.getDuration(fileSource, filetype); }

        const creativity: Creativity = await creativityService.create(
            params.name, user, fileSource, thumbnail, mimetype, fileformat, filetype, dimensions, size, duration,
        );

        response.status(200).send({
            _id: creativity._id,
            name: creativity.name,
            source: creativity.path,
            thumbnail: creativity.thumbnail,
            mimetype: creativity.mimetype,
            filetype: creativity.filetype,
            fileformat: creativity.fileformat,
            duration: creativity.duration,
            dimensions: creativity.dimensions,
            size: creativity.size,
        });

    } catch (err) {
        logger.error(err);
        response.status(400).send(err.toString());
    }
};

export let remove: ExpressSignature = async (request, response, next) => {
    const params = request.body;
    const allowedRoles = ["admin"];

    if (!await authService.isAllowed(allowedRoles, request)) {
        response.status(401).send("Unauthorized");
    }

    try {
        await creativityService.remove(params.id);
        response.status(200).send({
            executed: true,
        });
    } catch (err) {
        logger.error(err);
        response.status(400).send(err.toString());
    }
};

export let list: ExpressSignature = async (request, response, next) => {
    const allowedRoles = ["admin"];

    if (!await authService.isAllowed(allowedRoles, request)) {
        response.status(401).send("Unauthorized");
    }

    const xAccessToken = request.headers["x-access-token"].toString();
    try {
        const user: User = await userService.findByToken(xAccessToken);
        let creativities: any;
        if (request.query.id) {
            creativities = await creativityService.get(user, request.query.id);
        } else {
            creativities = await creativityService.list(user);
        }
        response.status(200).send(
            creativities,
        );
    } catch (err) {
        logger.error(err);
        response.status(400).send(err.toString());
    }
};
