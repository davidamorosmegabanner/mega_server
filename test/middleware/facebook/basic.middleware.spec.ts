import {assert, expect} from "chai";
import * as mongoose from "mongoose";
import config from "../../../src/config/config";
import {logger} from "../../../src/config/logger";
import {FacebookBasicMiddleware} from "../../../src/middleware/facebook/basic.middleware";
import {default as UserMongo, User} from "./../../../src/models/user/user.model";

const facebookBasicMiddleware = new FacebookBasicMiddleware();

describe("Simple Fuelbanner request test", () => {

    before((done) => {
        mongoose.connect(config.db);
        done();
    });

    it("Should make a simple request", async () => {
        try {
            const request = await facebookBasicMiddleware.makeSimpleRequest();
            console.log(request);
            expect(request).to.satisfy((req) => typeof req === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should return Facebook user info", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ fbToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with fbtoken"); }

            const userInfo = await facebookBasicMiddleware.getFacebookInfo(user.fbToken);

            console.log(userInfo);

            expect(userInfo).to.satisfy((info) => typeof info === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    after((done) => {
        mongoose.connection.close();
        done();
    });
});
