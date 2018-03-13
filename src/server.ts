"use strict";

import * as bodyParser from "body-parser";
import * as express from "express";
import * as mongoose from "mongoose";
import config from "./config/config";

/**
 * The server.
 *
 * @class Server
 */
export class Server {
    public static bootstrap(): Server {
        return new Server();
    }

    public app: express.Application;

    private constructor() {
        this.app = express();
        this.config();
        // TODO
        // this.routes();
    };

    public config() {
        mongoose.connect(config.db, (err) => {
            if (err) {
                console.error('Could not connect to MongoDB!');
                console.log(err);
            }
        });
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json({limit: '50mb'}));
    }
}
