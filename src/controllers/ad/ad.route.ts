import * as express from "express";
import {Route} from "../Route";
import {create} from "./ad.controller";

export default class AdRouter implements Route {
    public static create(): Route {
        return new AdRouter();
    }

    public URL: string = "/ad";

    public decorate(app: express.Application) {
        app.route(this.URL + "/create").post(create);
    }
}
