import * as express from "express";
import {Route} from "../Route";
import {edit, getInfo, list, login, register, remove} from "./user.controller";

export default class UserRouter implements Route {
    public static create(): Route {
        return new UserRouter();
    }

    public URL: string = "/user";

    public decorate(app: express.Application) {
        app.route(this.URL + "/login").post(login);
        app.route(this.URL + "/register").post(register);
        app.route(this.URL + "/edit").post(edit);
        app.route(this.URL + "/remove").delete(remove);
        app.route(this.URL + "/list").post(list);
        app.route(this.URL + "/getInfo").get(getInfo);
    }
}
