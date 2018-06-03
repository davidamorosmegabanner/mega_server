import {assert, expect} from "chai";
import * as mongoose from "mongoose";

import config from "../../../src/config/config";
import {TwitterAuthMiddleware} from "../../../src/middleware/twitter/auth.middleware";
import {TwitterCampaignMiddleware} from "../../../src/middleware/twitter/campaign.middleware";
import {TwitterCreativeMiddleware} from "../../../src/middleware/twitter/creative.middleware";
import {default as UserMongo, User} from "../../../src/models/user/user.model";

const twitterCampaignMiddleware = new TwitterCampaignMiddleware();
const twitterCreativeMiddleware = new TwitterCreativeMiddleware();
const twitterAuthMiddleware = new TwitterAuthMiddleware();

describe("Twitter AdModel Middleware test", () => {

    before((done) => {
        mongoose.connect(config.db);
        done();
    });

    it("Should getUserAds or create a funding instrument -- ONLY IN SANDBOX!!!!!", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const fundingInstrument = await twitterCampaignMiddleware.makeFundingInstrument(
                user.twToken, user.twTokenSecret, "gq1drn",
            );

            console.log(fundingInstrument);
            expect(fundingInstrument).to.satisfy(() => typeof fundingInstrument === "object");

        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should getUserAds all funding instruments", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const fundingInstrument = await twitterCampaignMiddleware.getFundingInstrument(
                user.twToken, user.twTokenSecret, "gq1drn",
            );

            console.log(fundingInstrument);
            expect(fundingInstrument).to.satisfy(() => typeof fundingInstrument === "object");

        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it ("Should list user campaigns", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const campaign = (await twitterCampaignMiddleware.getCampaigns(
                user.twToken, user.twTokenSecret, "gq1drn",
            ));

            console.log(campaign);
            expect(campaign).to.satisfy(() => typeof campaign === "object");

        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it ("Should getUserAds all line items", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const lineItems = await twitterCampaignMiddleware.getLineItems(
                user.twToken, user.twTokenSecret, "gq1drn"
            );

            console.log(lineItems);
            expect(lineItems).to.satisfy(() => typeof lineItems === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    })

    it ("Should create a tweet, create a promoted tweet, create a campaign and create a line item", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const fundingInstrumentId = (await twitterCampaignMiddleware.getFundingInstrument(
                user.twToken, user.twTokenSecret, "gq1drn",
            )).data[0].id;

            const tweetId = (await twitterCreativeMiddleware.createTweet(
                user.twToken, user.twTokenSecret, "gq1drn",
                "Megabanner test tweet! " + Math.round((Math.random() * 1000000)).toString(),
            )).data.id_str;

            const startDate = new Date();
            const endDate = new Date(); endDate.setDate(startDate.getDate() + 1);
            const campaignId = (await twitterCampaignMiddleware.createCampaign(
                user.twToken, user.twTokenSecret, "gq1drn",
                1, fundingInstrumentId, "Campaign test",
                startDate, endDate,
            )).data.id;

            const lineItem = (await twitterCampaignMiddleware.createLineItem(
                user.twToken, user.twTokenSecret, "gq1drn",
                campaignId, "TWEET_ENGAGEMENTS", "ALL_ON_TWITTER", "PROMOTED_TWEETS",
            ));
            console.log(lineItem);

            const promotedTweet = (await twitterCampaignMiddleware.createPromotedTweets(
                user.twToken, user.twTokenSecret, "gq1drn", lineItem.data.id, [tweetId],
            ));
            console.log(promotedTweet);

            const campaignStatus = (await twitterCampaignMiddleware.getCampaignWithId(
                user.twToken, user.twTokenSecret, "gq1drn", campaignId,
            ));

            console.log(campaignStatus);
            expect(campaignStatus).to.satisfy(() => typeof campaignStatus === "object");

        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it ("Should create a campaign, create a line item and create a promoted account with current one", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const fundingInstrumentId = (await twitterCampaignMiddleware.getFundingInstrument(
                user.twToken, user.twTokenSecret, "gq1drn",
            )).data[0].id;

            const startDate = new Date();
            const endDate = new Date(); endDate.setDate(startDate.getDate() + 1);
            const campaignId = (await twitterCampaignMiddleware.createCampaign(
                user.twToken, user.twTokenSecret, "gq1drn",
                1, fundingInstrumentId, "Campaign test",
                startDate, endDate,
            )).data.id;

            const lineItem = (await twitterCampaignMiddleware.createLineItem(
                user.twToken, user.twTokenSecret, "gq1drn",
                campaignId, "FOLLOWERS", "ALL_ON_TWITTER", "PROMOTED_ACCOUNT",
            ));
            console.log(lineItem);

            const twitterAccountId = (await twitterAuthMiddleware.getAccount(user.twToken, user.twTokenSecret)).id_str;

            const promotedAccountId = (await twitterCampaignMiddleware.createPromotedAccount(
                user.twToken, user.twTokenSecret, "gq1drn", lineItem.data.id, twitterAccountId,
            ));
            console.log(promotedAccountId);

            const campaignStatus = (await twitterCampaignMiddleware.getCampaignWithId(
                user.twToken, user.twTokenSecret, "gq1drn", campaignId,
            ));
            console.log(campaignStatus);

            expect(campaignStatus).to.satisfy(() => typeof campaignStatus === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    after((done) => {
        mongoose.connection.close();
        done();
    });
});
