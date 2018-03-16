import {sign, verify} from "jsonwebtoken";
import {Model} from "mongoose";
import {UserService} from "../models/user/user.service";
import {RoleService} from "../models/role/role.service";
import config from "../config/config";

/*

1 - Find for user role in database
2 - Return if user role is present in roles passed
******* If superToken.isActive, superToken.value can be used ****

*/

const userService = new UserService();
const roleService = new RoleService();

export class AuthService {

    async isAllowed(roles: Array<string>, token: string): Promise<boolean> {

        if (config.superToken && config.superToken.isActive && config.superToken.value == token)
            return true;

        let user = await userService.findByToken(token);
        if (user) {
            let role = await roleService.findById(user.role);
            return (roles.indexOf(role.name) != -1);
        } else {
            return false;
        }
    }

}
