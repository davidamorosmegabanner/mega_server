"use strict";

import * as bodyParser from "body-parser";
import * as connectMongo from "connect-mongo";
import * as express from "express";
import * as fileUpload from "express-fileupload";
import * as session from "express-session";
import * as mongoose from "mongoose";
import * as morgan from "morgan";

import AdRouter from "./controllers/ad/ad.route";
import CampaignRouter from "./controllers/campaign/campaign.router";
import CreativityRouter from "./controllers/creativity/creativity.router";
import FacebookRouter from "./controllers/social/facebook.router";
import RoleRouter from "./controllers/role/role.router";
import TwitterRouter from "./controllers/social/twitter.router";
import UserRouter from "./controllers/user/user.router";

import config from "./config/config";
import {logger, Stream} from "./config/logger";
import CronManager from "./tasks/Cron";

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
        await this.session();
        await this.mongo();
        this.parser();
        await this.routes();
        await this.tasks();

        logger.info(`App is active in port ${config.port}`);

        this.app.get("/", (request, response: express.Response) => {
            response.json({
                welcome: "Megabanner Server",
            });
        });
    }

    private async mongo() {
        try {
            await mongoose.connect(config.db);
            logger.info("Connected to MongoDB");
        } catch (err) {
            logger.error("Could not connect to MongoDB!");
            logger.info(err);
            throw new Error(err);
        }
    }

    private parser() {
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json({limit: "50mb"}));
    }

    private async routes() {
        try {
            ([ AdRouter.create() ]).forEach((route) => { route.decorate(this.app); });
            ([ CreativityRouter.create() ]).forEach((route) => { route.decorate(this.app); });
            ([ CampaignRouter.create() ]).forEach((route) => { route.decorate(this.app); });
            ([ RoleRouter.create() ]).forEach((route) => { route.decorate(this.app); });
            ([ UserRouter.create() ]).forEach((route) => { route.decorate(this.app); });

            ([ FacebookRouter.create() ]).forEach((route) => { route.decorate(this.app); });
            ([ TwitterRouter.create() ]).forEach((route) => { route.decorate(this.app); });
            logger.info("All routes were loaded successfully");
        } catch (err) {
            logger.error("Could not load all routes!");
            logger.info(err);
        }
    }

    private async session() {
        try {
            const MongoStore = connectMongo(session);
            const sessionStore = new MongoStore({mongooseConnection: mongoose.connection});
            this.app.use(session({
                secret: config.session.seed,
                store: sessionStore,
                resave: config.session.resave,
                saveUninitialized: config.session.saveUninitialized,
                cookie: config.session.cookie,
            }));
            logger.info("Session started successfully");
        } catch (err) {
            logger.error("Could not load session config!");
            logger.info(err);
            throw new Error(err);
        }
    }

    private files() {
        this.app.use(fileUpload({
            limits: { fileSize: config.maxFileSize },
        }));
        logger.info("Files configuration loaded successfully");
    }

    private logger() {
        logger.info("Overriding 'Express' logger");
        this.app.use(morgan("combined", { stream: Stream }));
    }

    private tasks() {
        const cronManager = new CronManager();
        cronManager.startJobs();
    }
}
