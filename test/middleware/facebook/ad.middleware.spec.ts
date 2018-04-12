import {assert, expect} from "chai";
import * as mongoose from "mongoose";
import config from "../../../src/config/config";
import {FacebookAdMiddleware} from "../../../src/middleware/facebook/ad.middleware";
import {FacebookBasicMiddleware} from "../../../src/middleware/facebook/basic.middleware";
import {default as UserMongo, User} from "./../../../src/models/user/user.model";

const facebookAdMiddleware = new FacebookAdMiddleware();
const facebookBasicMiddleware = new FacebookBasicMiddleware();

describe("Ad middleware test", () => {

    before((done) => {
        mongoose.connect(config.db);
        done();
    });

    it("Should return ad accounts owned by user", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ fbToken: { $exists: true}, email: "email@test.com"});
            if (!user) {assert.ifError( "Error finding user with fbtoken"); }

            const facebookUser = await facebookBasicMiddleware.getFacebookInfo(user.fbToken);
            console.log(facebookUser);

            const adAccounts = await facebookAdMiddleware.getAdAccounts(facebookUser.id, user.fbToken);
            console.log(adAccounts);

            expect(adAccounts).to.satisfy((info) => typeof info === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    after((done) => {
        mongoose.connection.close();
        done();
    });
});
