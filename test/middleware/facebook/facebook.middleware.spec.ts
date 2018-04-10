import {assert, expect} from "chai";
import * as mongoose from "mongoose";
import config from "../../../src/config/config";
import {FacebookMiddleware} from "../../../src/middleware/facebook/facebook.middleware";
import {default as UserMongo, User} from "./../../../src/models/user/user.model";

const facebookMiddleware = new FacebookMiddleware();

describe("Simple Fuelbanner request test", () => {

    before((done) => {
        mongoose.connect(config.db);
        done();
    });

    it("Should make a simple request", async () => {
        try {
            const request = await facebookMiddleware.makeSimpleRequest();

            expect(request).to.satisfy((req) => (req).length > 1);
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should return Facebook user info", async () => {
        try {
            const mongoUser = UserMongo;
            const user = await mongoUser.findOne({ fbToken: { $exists: true}});
            if (!user) {assert.ifError( "Error finding user with fbtoken");}

            const userInfo = await facebookMiddleware.getFacebookInfo(user.fbToken);

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
