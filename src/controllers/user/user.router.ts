import {Route} from "../Route";
import * as express from "express";
import {register, edit, remove, list} from "./user.controller";

export default class UserRouter implements Route {
    URL: string = "/user";

    decorate(app: express.Application) {
        app.route(this.URL + '/register').post(register);
        app.route(this.URL + '/edit').post(edit);
        app.route(this.URL + '/remove').post(remove);
        app.route(this.URL + '/list').post(list);
    }

    static create(): Route {
        return new UserRouter();
    }
}
