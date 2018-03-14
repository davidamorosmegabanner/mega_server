import {ExpressSignature} from "../Route";
import {UserService} from "../../models/user/user.service";
import {RoleService} from "../../models/role/role.service";

const userService = new UserService();
const roleService = new RoleService();

export let register: ExpressSignature = async (request, response, next) => {
    const params = request.body;
    try {
        let roleId = await roleService.findByName(params.role);
        let user = await userService.create(params.name, params.email, params.password, roleId, params.phone);
        response.status(200).send({
            user: user
        });
    } catch (err) {
        console.log(err);
        response.status(400).send(err);
    }
};
