import * as express from "express";
import {Route} from "../Route";
import {create} from "./campaign.controller";

export default class CampaignRouter implements Route {
    public static create(): Route {
        return new CampaignRouter();
    }

    public URL: string = "/campaign";

    public decorate(app: express.Application) {
        app.route(this.URL + "/create").post(create);
    }
}
