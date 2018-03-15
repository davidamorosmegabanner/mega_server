import {sign, verify} from "jsonwebtoken";
import {Model} from "mongoose";
import {UserService} from "../models/user/user.service";
import {RoleService} from "../models/role/role.service";

/*

1 - Find for user role in database
2 - Return if user role is present in roles passed

*/

const userService = new UserService();
const roleService = new RoleService();

export class AuthService {

    async isAllowed(roles: Array<string>, token: string): Promise<boolean> {
        console.log("in");
        let user = await userService.findByToken(token);
        if (user) {
            let role = await roleService.findById(user.role);
            return (roles.indexOf(role.name) != -1);
        } else {
            return false;
        }
    }

}
