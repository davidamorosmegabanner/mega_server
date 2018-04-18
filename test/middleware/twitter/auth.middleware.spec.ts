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

    it("Should return oauth_token", async () => {
        try {

            const test = await twitterAuthMiddleware.getRequestToken();
            console.log(test);
            expect(test).to.satisfy(() => typeof (test) === "object");

        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should return get User Credentials", async () => {
        try {

            const userAccessToken = await twitterAuthMiddleware.getAccessToken(
                "1qR65QAAAAAA5Y5bAAABYtkcAhA", "gaFx4l0HyeMtpFgSdInJ2eOLL4n2jeHj", "DoD2y1QiX1lYxIr9qPqBUQkmo66g2QgO",
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
