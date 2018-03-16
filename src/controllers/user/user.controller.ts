import {ExpressSignature} from "../Route";
import {UserService} from "../../models/user/user.service";
import {RoleService} from "../../models/role/role.service";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user/user.model";
import {Role} from "../../models/role/role.model";

const userService = new UserService();
const roleService = new RoleService();
const authService = new AuthService();

export let register: ExpressSignature = async (request, response, next) => {

    const params = request.body;
    const xAccessToken = request.headers['x-access-token'].toString();

    const allowedRoles = ["admin"];

    if (!xAccessToken || await !authService.isAllowed(allowedRoles, xAccessToken))
        return response.status(401).send("Unauthorized");

    try {
        let role: Role = await roleService.findByName(params.role);
        let user: User = await userService.create(params.name, params.email, params.password, role, params.phone);
        response.status(200).send({
            id: user._id,
            token: user.token,
            name: user.name,
            email: user.email,
            role: role.name,
            phone: user.phone
        });
    } catch (err) {
        console.log(err);
        response.status(400).send(err);
    }
};

export let edit: ExpressSignature = async (request, response, next) => {

    const params = request.body;
    const xAccessToken = request.headers['x-access-token'].toString();
    const allowedRoles = ["admin"];

    if (!xAccessToken || await !authService.isAllowed(allowedRoles, xAccessToken))
        return response.status(401).send("Unauthorized");

    try {
        let user: User = await userService.update(params.id, params.name, params.email, params.password, params.phone);
        response.status(200).send({
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone
        });
    } catch (err) {
        console.log(err);
        response.status(400).send(err);
    }
};

export let remove: ExpressSignature = async (request, response, next) => {

    const params = request.body;
    const xAccessToken = request.headers['x-access-token'].toString();
    const allowedRoles = ["admin"];

    if (!xAccessToken || await !authService.isAllowed(allowedRoles, xAccessToken))
        return response.status(401).send("Unauthorized");

    try {
        let user: User = await userService.remove(params.id);
        response.status(200).send({
            executed: true
        });
    } catch (err) {
        console.log(err);
        response.status(400).send(err);
    }
};

export let list: ExpressSignature = async (request, response, next) => {

    const params = request.body;
    const xAccessToken = request.headers['x-access-token'].toString();
    const allowedRoles = ["admin"];

    if (!xAccessToken || await !authService.isAllowed(allowedRoles, xAccessToken))
        return response.status(401).send("Unauthorized");

    try {
        let role: any = undefined;
        if (params.role)
            role = roleService.findByName(params.role);

        let user: Array<User> = await userService.listUsers(role);

        console.log(user)

        response.status(200).send({
            user
        });
    } catch (err) {
        console.log(err);
        response.status(400).send(err);
    }
};