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

    it("Should return one ad account owned by user", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ fbToken: { $exists: true}, email: "email@test.com"});
            if (!user) {assert.ifError( "Error finding user with fbtoken"); }

            const facebookUser = await facebookBasicMiddleware.getFacebookInfo(user.fbToken);
            console.log(facebookUser);

            const adAccounts = await facebookAdMiddleware.getAdAccount(facebookUser.id, user.fbToken);
            console.log(adAccounts);

            expect(adAccounts).to.satisfy((info) => typeof info === "object");
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
                "Megabanner test Ad Account",
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

    it("Should create a simple campaign", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ fbToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with fbtoken"); }

            const newCampaign = await facebookAdMiddleware.createCampaignSimple(
                "Megabanner test campaign",
                "LINK_CLICKS",
                user.fbAdAccount,
                user.fbToken,
            );

            console.log(newCampaign);

            expect(newCampaign).to.satisfy((campaign) => {
                return (typeof campaign === "object") && (campaign !== null);
            });
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    })

    after((done) => {
        mongoose.connection.close();
        done();
    });
});
