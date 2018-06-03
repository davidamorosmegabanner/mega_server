import {assert, expect} from "chai";
import * as mongoose from "mongoose";
import * as path from "path";

import config from "../../../src/config/config";
import {FacebookAdMiddleware} from "../../../src/middleware/facebook/ad.middleware";
import {FacebookAdCreativeMiddleware} from "../../../src/middleware/facebook/adCreative.middleware";
import {FacebookAuthMiddleware} from "../../../src/middleware/facebook/auth.middleware";
import {FacebookCampaignMiddleware} from "../../../src/middleware/facebook/campaign.middleware";
import {default as UserMongo, User} from "./../../../src/models/user/user.model";

const facebookAdMiddleware = new FacebookAdMiddleware();
const facebookBasicMiddleware = new FacebookAuthMiddleware();
const facebookCampaignMiddleware = new FacebookCampaignMiddleware();
const facebookAdCreativeMiddleware = new FacebookAdCreativeMiddleware();

describe("AdModel middleware test", () => {

    before((done) => {
        mongoose.connect(config.db);
        done();
    });

    it("Should return one ad account owned by user", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ fbToken: { $exists: true}, email: "email@test.com"});
            if (!user) {assert.ifError( "Error finding user with fbtoken"); }

            const facebookUser = await facebookBasicMiddleware.getFacebookInfo(user.fbToken);
            console.log(facebookUser);

            const adAccounts = await facebookAdMiddleware.getAdAccount(facebookUser.id, user.fbToken);
            console.log(adAccounts);

            expect(adAccounts).to.satisfy((info) => info.id.length);
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should create an ad account given a business -- Not working while app in development", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ fbToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with fbtoken"); }

            const facebookUser = await facebookBasicMiddleware.getFacebookInfo(user.fbToken);
            console.log(facebookUser);

            const adAccounts = await facebookAdMiddleware.getAdAccount(facebookUser.id, user.fbToken);
            const adAccount = adAccounts[0];
            console.log(adAccount);

            const newAdAccount = await facebookAdMiddleware.createAdAccount(
                "Megabanner test AdModel Account",
                "EUR",
                "1",
                "1844629475818586", // Megabanner page
                "1844629475818586",
                "235920547146912",
                user.fbToken,
            );

            console.log(newAdAccount);

            expect(newAdAccount).to.satisfy((info) => typeof info === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should create an AdModel", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ fbToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with fbtoken"); }

            const campaign = (await facebookCampaignMiddleware.listCampaigns(user.fbAdAccount, user.fbToken));

            const filePath = path.join(process.cwd(), "test", "media", "img.jpg");
            const image = await facebookAdCreativeMiddleware.uploadImage(filePath, user.fbAdAccount, user.fbToken);

            const ad = await facebookAdMiddleware.createAd(
                "prova ad", campaign.data[0].id, "prova creative", "prova creative body", "http://google.com",
                image.hash, user.fbAdAccount, user.fbToken,
            );

            expect(ad).to.satisfy(() => typeof ad === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    after((done) => {
        mongoose.connection.close();
        done();
    });
});
