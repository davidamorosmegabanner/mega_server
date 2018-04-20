import {sign, verify} from "jsonwebtoken";
import {Model} from "mongoose";
import config from "../config/config";
import {UserService} from "../models/user/user.service";

const userService = new UserService();

/**
 *
 * 1 - Find user role in database
 * 2 - Return if user role is present in roles passed
 * ******* If superToken.isActive, superToken.value can be used ****
 *
 */

export class AuthService {

    public async isAllowed(roles: string[], request): Promise<boolean> {

        if (request.headers["x-access-token"] === undefined) {
            return false;
        }

        if (config.superToken && config.superToken.isActive) {
            if (config.superToken.value === request.headers["x-access-token"]) {
                return true;
            }
        }

        const user = await userService.findByToken(request.headers["x-access-token"]);
        if (user) {
            return (roles.indexOf(user.role.name) !== -1);

        } else {
            return false;
        }
    }
}
