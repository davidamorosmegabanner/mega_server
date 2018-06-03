import {logger} from "../../config/logger";

import {Role, default as Roles} from "../../models/role/role.model";
import {AuthService} from "../../services/auth.service";
import {ExpressSignature} from "../Route";

const authService = new AuthService();

export let list: ExpressSignature = async (request, response, next) => {

    const allowedRoles = ["admin"];

    if (!await authService.isAllowed(allowedRoles, request)) {
        response.status(401).send("Unauthorized");
    }

    try {
        const roles: Role[] = Roles;
        response.status(200).send(
            roles,
        );
    } catch (err) {
        logger.error(err);
        response.status(400).send(err.toString());
    }
};
