import {logger} from "../../config/logger";

import {Role} from "../../models/role/role.model";
import {RoleService} from "../../models/role/role.service";
import {AuthService} from "../../services/auth.service";
import {ExpressSignature} from "../Route";

const authService = new AuthService();
const roleService = new RoleService();

export let list: ExpressSignature = async (request, response, next) => {

    const allowedRoles = ["admin"];

    if (!await authService.isAllowed(allowedRoles, request)) {
        response.status(401).send("Unauthorized");
    }

    try {
        const roles: Role[] = await roleService.listRoles();
        response.status(200).send(
            roles,
        );
    } catch (err) {
        logger.error(err);
        response.status(400).send(err.toString());
    }
};
