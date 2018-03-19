import {sign, verify} from "jsonwebtoken";
import {Model} from "mongoose";
import config from "../config/config";
import {RoleService} from "../models/role/role.service";
import {UserService} from "../models/user/user.service";

const userService = new UserService();
const roleService = new RoleService();

/**
 *
 * 1 - Find user role in database
 * 2 - Return if user role is present in roles passed
 * ******* If superToken.isActive, superToken.value can be used ****
 *
 */

export class AuthService {

    public async isAllowed(roles: string[], token: string): Promise<boolean> {

        if (config.superToken && config.superToken.isActive && config.superToken.value === token) {
            return true;
        }

        const user = await userService.findByToken(token);
        if (user) {
            const role = await roleService.findById(user.role);
            return (roles.indexOf(role.name) !== -1);
        } else {
            return false;
        }
    }

}
