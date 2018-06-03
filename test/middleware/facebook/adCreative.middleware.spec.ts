import {assert, expect} from "chai";
import * as mongoose from "mongoose";
import * as path from "path";

import config from "../../../src/config/config";
import {FacebookAdCreativeMiddleware} from "../../../src/middleware/facebook/adCreative.middleware";
import {FacebookCampaignMiddleware} from "../../../src/middleware/facebook/campaign.middleware";
import {FacebookPageMiddleware} from "../../../src/middleware/facebook/page.middleware";
import {default as UserMongo, User} from "./../../../src/models/user/user.model";

const facebookAdCreativeMiddleware = new FacebookAdCreativeMiddleware();
const facebookPageMiddleware = new FacebookPageMiddleware();
const fbCampaignMiddleware = new FacebookCampaignMiddleware();

describe("AdModel middleware test", () => {

    before((done) => {
        mongoose.connect(config.db);
        done();
    });

    it("Should upload an image", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ fbToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with fbtoken"); }

            const filePath = path.join(process.cwd(), "test", "media", "img.jpg");
            const image = await facebookAdCreativeMiddleware.uploadImage(filePath, user.fbAdAccount, user.fbToken);
            console.log(image);

            expect(image).to.satisfy(() => typeof image === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }

    });

    it("Should create a Creative Link AdModel -- Not working while app in development", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ fbToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with fbtoken"); }

            const name = "Creative Link AdModel Test";
            const campaignId = (await fbCampaignMiddleware.listCampaigns(user.fbAdAccount, user.fbToken)).data[0].id;
            const actionType = "SIGN_UP";
            const actionValue = {link: "http://megabanner.net"};
            const link = "http://megabanner.net";
            const message = "MEGA power for YOU";
            const pageId = (await facebookPageMiddleware.getOwnedPages(user.fbToken))[1].id;

            const creative = await facebookAdCreativeMiddleware.createLink(
                name, campaignId, actionType, actionValue, link, message, pageId, user.fbAdAccount, user.fbToken,
            );

            console.log(creative);

            expect(creative).to.satisfy(() => typeof creative === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should create a Creative Link AdModel -- Not working while app in development", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ fbToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with fbtoken"); }

            const name = "Creative Link AdModel Test";
            const campaignId = (await fbCampaignMiddleware.listCampaigns(user.fbAdAccount, user.fbToken)).data[0].id;
            const actionType = "SIGN_UP";
            const actionValue = {link: "http://megabanner.net"};
            const link = "http://megabanner.net";
            const message = "MEGA power for YOU";
            const pageId = (await facebookPageMiddleware.getOwnedPages(user.fbToken))[1].id;

            const creative = await facebookAdCreativeMiddleware.createLink(
                name, campaignId, actionType, actionValue, link, message, pageId, user.fbAdAccount, user.fbToken,
            );

            console.log(creative);

            expect(creative).to.satisfy(() => typeof creative === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    after((done) => {
        mongoose.connection.close();
        done();
    });
});
