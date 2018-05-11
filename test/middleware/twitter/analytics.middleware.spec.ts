import {assert, expect} from "chai";
import * as mongoose from "mongoose";

import config from "../../../src/config/config";
import {default as UserMongo, User} from "../../../src/models/user/user.model";
import {TwitterAnalyticsMiddleware} from "../../../src/middleware/twitter/analytics.middleware";

const twitterAnalyticsMiddleware = new TwitterAnalyticsMiddleware();

describe("Twitter Ad Middleware test", () => {

    before((done) => {
        mongoose.connect(config.db);
        done();
    });

    it("Should get stats for specified entity and range dates", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const startDate = new Date();
            const endDate = new Date();
            endDate.setDate(startDate.getDate() + 1);

            const stats = await twitterAnalyticsMiddleware.getStats(
                user.twToken, user.twTokenSecret, "gq1drn",
                "ACCOUNT", ["gq1drn"], startDate, endDate,
            );

            console.log(stats);
            console.log(stats.data[0].id_data);
            expect(stats).to.satisfy(() => typeof stats === "object");

        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should get stats for specified campaign and range dates", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const startDate = new Date();
            const endDate = new Date();
            endDate.setDate(startDate.getDate() + 1);

            const stats = await twitterAnalyticsMiddleware.getStats(
                user.twToken, user.twTokenSecret, "gq1drn",
                "CAMPAIGN", ["hv7l"], startDate, endDate,
            );

            console.log(stats);
            console.log(stats.data[0].id_data);
            expect(stats).to.satisfy(() => typeof stats === "object");

        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    after((done) => {
        mongoose.connection.close();
        done();
    });
});
