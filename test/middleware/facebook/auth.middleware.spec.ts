import {assert, expect} from "chai";
import * as mongoose from "mongoose";
import config from "../../../src/config/config";
import {FacebookAuthMiddleware} from "../../../src/middleware/facebook/auth.middleware";
import {default as UserMongo, User} from "./../../../src/models/user/user.model";

const facebookBasicMiddleware = new FacebookAuthMiddleware();

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
            const user: User = await mongoUser.findOne({ fbToken: { $exists: true}, email: "email@test.com"});
            if (!user) {assert.ifError( "Error finding user with fbtoken"); }

            const userInfo = await facebookBasicMiddleware.getFacebookInfo(user.fbToken);

            console.log(userInfo);

            expect(userInfo).to.satisfy((info) => typeof info === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should list user permissions", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ fbToken: { $exists: true}, email: "email@test.com"});
            if (!user) {assert.ifError( "Error finding user with fbtoken"); }

            const userInfo = await facebookBasicMiddleware.getFacebookInfo(user.fbToken);
            const userPermissions = await facebookBasicMiddleware.getPermissions(userInfo.id, user.fbToken);

            console.log(userInfo);
            console.log(userPermissions);

            expect(userPermissions).to.satisfy((info) => typeof info === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    after((done) => {
        mongoose.connection.close();
        done();
    });
});
