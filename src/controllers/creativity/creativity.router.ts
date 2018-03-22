import * as express from "express";
import {Route} from "../Route";
import {create, getInfo, list, remove} from "./creativity.controller";

export default class UserRouter implements Route {
    public static create(): Route {
        return new UserRouter();
    }

    public URL: string = "/creativity";

    public decorate(app: express.Application) {
        app.route(this.URL + "/create").post(create);
        app.route(this.URL + "/remove").delete(remove);
        app.route(this.URL + "/list").get(list);
        app.route(this.URL + "/getInfo").post(getInfo);
    }
}
