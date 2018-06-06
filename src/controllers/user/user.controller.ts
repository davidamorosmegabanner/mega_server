import {logger} from "../../config/logger";

import {Role} from "../../models/role/role.model";
import {RoleService} from "../../models/role/role.service";
import {PasswordService} from "./password.service";
import {User} from "../../models/user/user.model";
import {UserService} from "../../models/user/user.service";
import {AuthService} from "./auth.service";
import {ExpressSignature} from "../Route";

const userService = new UserService();
const roleService = new RoleService();
const authService = new AuthService();

export let login: ExpressSignature = async (request, response, next) => {
    // params -> email:string, password:string

    const params = request.body;
    const allowedRoles = ["admin"];

    if (!await authService.isAllowed(allowedRoles, request)) {
        response.status(401).send("Unauthorized");
    }
    try {

        const user: User = await userService.findByEmail(params.email);

        if (PasswordService.encrypt(params.password).value !== user.password) {
            response.status(401).send("Email and password do not match!");
        }

        request.session.userId = user._id;

        response.status(200).send({
            _id: user._id,
            token: user.token,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
        });
    } catch (err) {
        logger.error(err);
        response.status(400).send(err.toString());
    }
};

export let register: ExpressSignature = async (request, response, next) => {
    // params -> name:string, email:string, password:string, phone?:string

    const params = request.body;

    const allowedRoles = ["admin"];

    if (!await authService.isAllowed(allowedRoles, request)) {
        response.status(401).send("Unauthorized");
    }

    try {
        const user: User = await userService.create(
            params.name, params.email, params.password, params.role, params.phone
        );

        request.session.userId = user._id;

        response.status(200).send({
            token: user.token,
            _id: user._id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            role: user.role,
        });
    } catch (err) {
        logger.error(err);
        response.status(400).send(err.toString());
    }
};

export let edit: ExpressSignature = async (request, response, next) => {

    // params -> id:string, name:string, email:string, password:string, phone:string

    const params = request.body;
    const allowedRoles = ["admin"];

    if (!await authService.isAllowed(allowedRoles, request)) {
        response.status(401).send("Unauthorized");
    }

    try {
        const user: User = await userService.update(
            params.id, params.name, params.email, params.password, params.phone,
        );
        response.status(200).send({
            email: user.email,
            _id: user._id,
            name: user.name,
            phone: user.phone,
        });
    } catch (err) {
        logger.error(err);
        response.status(400).send(err.toString());
    }
};

export let remove: ExpressSignature = async (request, response, next) => {

    // params -> id?:string

    const params = request.body;
    const allowedRoles = ["admin"];

    if (!await authService.isAllowed(allowedRoles, request)) {
        response.status(401).send("Unauthorized");
    }

    try {
        await userService.remove(params.id);
        response.status(200).send({
            executed: true,
        });
    } catch (err) {
        logger.error(err);
        response.status(400).send(err.toString());
    }
};

export let list: ExpressSignature = async (request, response, next) => {

    // params -> role?:string

    const params = request.body;
    const allowedRoles = ["admin"];

    if (!await authService.isAllowed(allowedRoles, request)) {
        response.status(401).send("Unauthorized");
    }

    try {
        let role: any;

        const user: User[] = await userService.listUsers(params.role);

        response.status(200).send({
            user,
        });
    } catch (err) {
        logger.error(err);
        response.status(400).send(err.toString());
    }
};

export let getInfo: ExpressSignature = async (request, response, next) => {

    const allowedRoles = ["admin"];

    if (!await authService.isAllowed(allowedRoles, request)) {
        response.status(401).send("Unauthorized");
    }

    const xAccessToken = request.headers["x-access-token"].toString();
    try {
        const user: User = await userService.getUserProfile(xAccessToken);
        response.status(200).send(user);
    } catch (err) {
        logger.error(err);
        response.status(400).send(err.toString());
    }
};

// Request to store user id in user session
// Probably is not needed, but may be if user is not stored when login or registering
export let id: ExpressSignature = async (request, response, next) => {
    const allowedRoles = ["admin"];

    if (!await authService.isAllowed(allowedRoles, request)) {
        response.status(401).send("Unauthorized");
    }

    const xAccessToken = request.headers["x-access-token"].toString();
    try {

        const user: User = await userService.findByToken(xAccessToken);
        request.session.userId = user._id;

        response.status(200).send({executed: true});

    } catch (err) {
        logger.error(err);
        response.status(400).send(err.toString());
    }
};
