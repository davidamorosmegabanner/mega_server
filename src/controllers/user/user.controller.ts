import {ExpressSignature} from "../Route";
import {UserService} from "../../models/user/user.service";
import {RoleService} from "../../models/role/role.service";
import {AuthService} from "../../services/auth.service";

const userService = new UserService();
const roleService = new RoleService();
const authService = new AuthService();

export let register: ExpressSignature = async (request, response, next) => {

    const params = request.body;
    const xAccessToken = request.headers['x-access-token'];

    const allowedRoles = ["admin"];

    if (!xAccessToken ||
        await !authService.isAllowed(allowedRoles, xAccessToken.toString())) {
        response.status(401).send("Unauthorized");
        next();
    } else {

        try {
            let role = await roleService.findByName(params.role);
            let user = await userService.create(params.name, params.email, params.password, role, params.phone);
            response.status(200).send({
                id: user._id,
                token: user.token,
                name: user.name,
                email: user.email,
                role: role.name,
                phone: user.phone
            });
            next();
        } catch (err) {
            console.log(err);
            response.status(400).send(err);
            next();
        }

    }
};

export let update: ExpressSignature = async (request, response, next) => {

    const params = request.body;
    const xAccessToken = request.headers['x-access-token'];
    const allowedRoles = ["admin"];

    if (!params || !xAccessToken || await !authService.isAllowed(allowedRoles, xAccessToken.toString())) {
        response.status(401).send("Unauthorized");
        next();
    } else {
        //TODO
        try {
            let user = await userService.update(params.id, params.name, params.email, params.password, params.phone);
            response.status(200).send({
                id: user._id,
                token: user.token,
                name: user.name,
                email: user.email,
                phone: user.phone
            });
            next();
        } catch (err) {
            console.log(err);
            response.status(400).send(err);
            next();
        }

    }
};