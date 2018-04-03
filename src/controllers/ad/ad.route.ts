import * as express from "express";
import {Route} from "../Route";
import {create, list, remove} from "./ad.controller";

export default class AdRouter implements Route {
    public static create(): Route {
        return new AdRouter();
    }

    public URL: string = "/ad";

    public decorate(app: express.Application) {
        app.route(this.URL + "/create").post(create);
        app.route(this.URL + "/list").get(list);
        app.route(this.URL + "/remove").delete(remove);
    }
}
