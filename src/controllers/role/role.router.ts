import * as express from "express";
import {Route} from "../Route";
import {list} from "./role.controller";

export default class RoleRouter implements Route {
    public static create(): Route {
        return new RoleRouter();
    }

    public URL: string = "/role";

    public decorate(app: express.Application) {
        app.route(this.URL + "/list").get(list);
    }
}
