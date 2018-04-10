import * as express from "express";
import {Route} from "../Route";
import {authCode} from "./facebook.controller";

export default class FacebookRouter implements Route {
    public static create(): Route {
        return new FacebookRouter();
    }

    public URL: string = "/facebook";

    public decorate(app: express.Application) {
        app.route(this.URL + "/authCode/").get(authCode);
    }
}
