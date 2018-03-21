"use strict";

import * as bodyParser from "body-parser";
import * as express from "express";
import * as fileUpload from "express-fileupload";
import * as mongoose from "mongoose";

import config from "./config/config";
import AdRouter from "./controllers/ad/ad.route";
import CreativityRouter from "./controllers/creativity/creativity.router";
import RoleRouter from "./controllers/role/role.router";
import UserRouter from "./controllers/user/user.router";

import InsertAll from "./services/inserts/main.insert";

export class Server {
    public static bootstrap(): Server {
        return new Server();
    }

    public app: express.Application;

    private constructor() {
        this.app = express();
        this.load();
    }

    public async load() {
        console.log("*****************************");
        console.log("*** Mega server initiated ***");
        console.log("*****************************");

        this.files();
        await this.config();
        await this.routes();
        await this.inserts();

        this.app.get("/", (response: express.Response) => {
            response.json({
                welcome: "Megabanner Server",
            });
        });
    }

    public async config() {
        try {
            await mongoose.connect(config.db);
            console.log("Connected to MongoDB");
            this.app.use(bodyParser.urlencoded({extended: true}));
            this.app.use(bodyParser.json({limit: "50mb"}));
        } catch (err) {
            console.error("Could not connect to MongoDB!");
            console.log(err);
            throw new Error(err);
        }
    }

    public async routes() {
        try {
            ([ UserRouter.create() ]).forEach((route) => { route.decorate(this.app); });
            ([ CreativityRouter.create() ]).forEach((route) => { route.decorate(this.app); });
            ([ RoleRouter.create() ]).forEach((route) => { route.decorate(this.app); });
            ([ AdRouter.create() ]).forEach((route) => { route.decorate(this.app); });
            console.log("All routes were loaded successfully");
        } catch (err) {
            console.error("Could not load all routes!");
            console.log(err);
        }
    }

    public files() {
        this.app.use(fileUpload({
            limits: { fileSize: config.maxFileSize },
        }));
        console.log("Files configuration loaded successfully");
    }

    public async inserts() {
        const insertAll = new InsertAll();

        await insertAll.insert();
    }

    // TODO logger
}
