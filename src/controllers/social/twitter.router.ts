import * as express from "express";
import {Route} from "../Route";
import {authTokens, oauthToken} from "./twitter.controller";

export default class TwitterRouter implements Route {
    public static create(): Route {
        return new TwitterRouter();
    }

    public URL: string = "/twitter";

    public decorate(app: express.Application) {
        app.route(this.URL + "/oauthToken/").get(oauthToken);
        app.route(this.URL + "/authTokens").get(authTokens);
    }
}
