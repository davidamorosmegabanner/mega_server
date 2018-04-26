import {assert, expect} from "chai";
import * as mongoose from "mongoose";
import * as path from "path";

import config from "../../../src/config/config";
import {TwitterCampaignMiddleware} from "../../../src/middleware/twitter/campaign.middleware";
import {default as UserMongo, User} from "../../../src/models/user/user.model";

const twitterCampaignMiddleware = new TwitterCampaignMiddleware();

describe("Twitter Ad Middleware test", () => {

    before((done) => {
        mongoose.connect(config.db);
        done();
    });

    it("Should get or create a funding instrument -- ONLY IN SANDBOX!!!!!", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const fundingInstrument = await twitterCampaignMiddleware.createFundingInstrument(
                user.twToken, user.twTokenSecret, "gq1drn",
            );

            console.log(fundingInstrument);
            expect(fundingInstrument).to.satisfy(() => typeof fundingInstrument == "object");

        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    after((done) => {
        mongoose.connection.close();
        done();
    });
});
