"use strict";

import * as bodyParser from "body-parser";
import * as express from "express";
import * as fileUpload from "express-fileupload";
import * as mongoose from "mongoose";
import * as morgan from "morgan";

import config from "./config/config";
import AdRouter from "./controllers/ad/ad.route";
import CampaignRouter from "./controllers/campaign/campaign.router";
import CreativityRouter from "./controllers/creativity/creativity.router";
import RoleRouter from "./controllers/role/role.router";
import UserRouter from "./controllers/user/user.router";

import InsertAll from "./services/insert/main.insert";

import {logger, Stream} from "./config/logger";

export class Server {
    public static bootstrap(): Server {
        return new Server();
    }

    public app: express.Application;

    private constructor() {
        this.app = express();
        this.load();
    }

    private async load() {
        logger.info("************** MEGA SERVER INITIATED **************");

        this.logger();
        this.files();
        await this.config();
        await this.routes();
        await this.inserts();
        logger.info(`App is active in port ${config.port}`);

        this.app.get("/", (request, response: express.Response) => {
            response.json({
                welcome: "Megabanner Server",
            });
        });
    }

    private async config() {
        try {
            await mongoose.connect(config.db);
            logger.info("Connected to MongoDB");
            this.app.use(bodyParser.urlencoded({extended: true}));
            this.app.use(bodyParser.json({limit: "50mb"}));
        } catch (err) {
            logger.error("Could not connect to MongoDB!");
            logger.info(err);
            throw new Error(err);
        }
    }

    private async routes() {
        try {
            ([ AdRouter.create() ]).forEach((route) => { route.decorate(this.app); });
            ([ CreativityRouter.create() ]).forEach((route) => { route.decorate(this.app); });
            ([ CampaignRouter.create() ]).forEach((route) => { route.decorate(this.app); });
            ([ RoleRouter.create() ]).forEach((route) => { route.decorate(this.app); });
            ([ UserRouter.create() ]).forEach((route) => { route.decorate(this.app); });
            logger.info("All routes were loaded successfully");
        } catch (err) {
            logger.error("Could not load all routes!");
            logger.info(err);
        }
    }

    private files() {
        this.app.use(fileUpload({
            limits: { fileSize: config.maxFileSize },
        }));
        logger.info("Files configuration loaded successfully");
    }

    private async inserts() {
        if (process.env.INSERT === "true") {
            const insertAll = new InsertAll();
            await insertAll.insert();
        }
    }

    private logger() {
        logger.info("Overriding 'Express' logger");
        this.app.use(morgan("combined", { stream: Stream.write }));
    }
}
