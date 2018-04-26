import {assert, expect} from "chai";
import * as mongoose from "mongoose";

import config from "../../../src/config/config";
import {TwitterAdMiddleware} from "../../../src/middleware/twitter/ad.middleware";
import {default as UserMongo, User} from "../../../src/models/user/user.model";

const twitterAdMiddleware = new TwitterAdMiddleware();

describe("Twitter Ad Middleware test", () => {

    before((done) => {
        mongoose.connect(config.db);
        done();
    });

    it("Should get account info", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with fbtoken"); }

            const userAccessToken = await twitterAdMiddleware.getAdAccount(
                user.twToken, user.twTokenSecret,
            );

            console.log(userAccessToken);
            expect(userAccessToken).to.satisfy(() => typeof (userAccessToken) === "object");

        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should get or create (if none) a SANDBOX account", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with fbtoken"); }

            const sandboxAccount = await twitterAdMiddleware.createSandboxAccount(
                user.twToken, user.twTokenSecret,
            );

            console.log(sandboxAccount);
            expect(sandboxAccount).to.satisfy(() => typeof (sandboxAccount) === "object");

        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    after((done) => {
        mongoose.connection.close();
        done();
    });
});
