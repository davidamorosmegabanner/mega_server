import * as path from "path";
import {Creativity, Size} from "../../models/creativity/creativity.model";
import {CreativityService} from "../../models/creativity/creativity.service";
import {User} from "../../models/user/user.model";
import {UserService} from "../../models/user/user.service";
import {AuthService} from "../../services/auth.service";
import {FileService} from "../../services/file.service";
import {ExpressSignature} from "../Route";

const authService = new AuthService();
const creativityService = new CreativityService();
const fileService = new FileService();
const userService = new UserService();

export let create: ExpressSignature = async (request, response, next) => {
    // TODO upload files to another server

    const params = request.body;
    const xAccessToken = request.headers["x-access-token"].toString();
    const allowedRoles = ["admin"];

    if (!xAccessToken || await !authService.isAllowed(allowedRoles, xAccessToken)) {
        return response.status(401).send("Unauthorized");
    }

    if (!request.files) {
        return response.status(404).send("No files were uploaded!");
    }

    if (!request.files.file) {
        return response.status(404).send("Please upload a file with param 'file'");
    }

    if (!request.body.name) {
        return response.status(404).send("Please give a name as param 'name' in body");
    }

    try {
        const file: any = request.files.file;

        const user: User = await userService.findByToken(xAccessToken);
        const mimetype: string = fileService.checkMimetype(file.mimetype);
        const filetype: string = fileService.getFiletype(file.mimetype);
        const fileformat: string = fileService.getFileformat(file.mimetype);

        file.name = fileService.makeFileName(fileformat);

        const fileSource: string = path.join(fileService.createPath(user, file), file.name);
        await file.mv(fileSource);
        const size: Size = await fileService.getSize(fileSource, filetype);

        const creativity: Creativity = await creativityService.create(request.body.name, user, fileSource, mimetype, fileformat, filetype, size);

        response.status(200).send({
            id: creativity._id,
            name: creativity.name,
        });

    } catch (err) {
        console.error(err);
        response.status(400).send(err.toString());
    }
};

export let remove: ExpressSignature = async (request, response, next) => {
    const params = request.body;
    const xAccessToken = request.headers["x-access-token"].toString();
    const allowedRoles = ["admin"];

    if (!xAccessToken || await !authService.isAllowed(allowedRoles, xAccessToken)) {
        return response.status(401).send("Unauthorized");
    }

    try {
        await creativityService.remove(params.id);
        response.status(200).send({
            executed: true,
        });
    } catch (err) {
        console.error(err);
        response.status(400).send(err.toString());
    }
};

export let list: ExpressSignature = async (request, response, next) => {
    const xAccessToken = request.headers["x-access-token"].toString();
    const allowedRoles = ["admin"];

    if (!xAccessToken || await !authService.isAllowed(allowedRoles, xAccessToken)) {
        return response.status(401).send("Unauthorized");
    }

    try {
        const user: User = await userService.findByToken(xAccessToken);
        const creativities: Creativity[] = await creativityService.list(user);
        response.status(200).send(
            creativities,
        );
    } catch (err) {
        console.error(err);
        response.status(400).send(err.toString());
    }
};