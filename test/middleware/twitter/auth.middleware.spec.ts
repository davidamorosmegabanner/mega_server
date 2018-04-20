import {assert, expect} from "chai";
import * as mongoose from "mongoose";
import * as path from "path";

import config from "../../../src/config/config";
import {TwitterAuthMiddleware} from "../../../src/middleware/twitter/auth.middleware";

const twitterAuthMiddleware = new TwitterAuthMiddleware();

describe("Twitter Auth Middleware test", () => {

    // before((done) => {
    //     mongoose.connect(config.db);
    //     done();
    // });

    it("Should return requestToken & requestTokenSecret", async () => {
        try {

            const test = await twitterAuthMiddleware.getRequestToken();
            console.log(test);
            expect(test).to.satisfy(() => typeof (test) === "object");

        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should return User Credentials", async () => {
        try {

            const userAccessToken = await twitterAuthMiddleware.getAccessToken(
                "Jmj8hQAAAAAA5Y5bAAABYuOxL6I", "79kw38CJ4TA5KFjH7fNfLPhlKPzF6rzl", "DoD2y1QiX1lYxIr9qPqBUQkmo66g2QgO",
            );

            console.log(userAccessToken);
            expect(userAccessToken).to.satisfy(() => typeof (userAccessToken) === "object");

        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    // after((done) => {
    //     mongoose.connection.close();
    //     done();
    // });
});
