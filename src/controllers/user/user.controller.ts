import {ExpressSignature} from "../Route";
import {UserService} from "../../models/user/user.service";
import {RoleService} from "../../models/role/role.service";
import {AuthService} from "../../services/auth.service";

const userService = new UserService();
const roleService = new RoleService();
const authService = new AuthService();

export let register: ExpressSignature = async (request, response, next) => {
    //TODO fix this mess
    const params = request.body;
    const xAccessToken = request.headers['x-access-token'].toString();
    const allowedRoles = ["admin"];

    if (await authService.isAllowed(allowedRoles, xAccessToken)) {
        response.status(401).send("Unauthorized");
    } else {

        try {
            let roleId = await roleService.findByName(params.role);
            let user = await userService.create(params.name, params.email, params.password, roleId, params.phone);
            response.status(200).send({
                //TODO fix response
                user: user
            });
        } catch (err) {
            console.log(err);
            response.status(400).send(err);
        }

    }
};
