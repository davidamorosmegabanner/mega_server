import {assert, expect} from "chai";
import * as mongoose from "mongoose";
import config from "../../../src/config/config";
import {logger} from "../../../src/config/logger";
import {FacebookBusinessMiddleware} from "../../../src/middleware/facebook/business.middleware";
import {default as UserMongo, User} from "./../../../src/models/user/user.model";

const facebookBusinessMiddleware = new FacebookBusinessMiddleware();

describe("Simple Fuelbanner request test", () => {

    before((done) => {
        mongoose.connect(config.db);
        done();
    });

    it("Should return Business info given a business id", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ fbToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with fbtoken"); }

            const businessInfo = await facebookBusinessMiddleware.getBusinessInfo("235920547146912", user.fbToken);

            console.log("businessInfo");
            console.log(businessInfo);

            expect(businessInfo).to.satisfy((info) => typeof info === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should return Businesses of the user", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ fbToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with fbtoken"); }

            const businesses = await facebookBusinessMiddleware.getBusinesses(user.fbToken);

            console.log("businesses");
            console.log(businesses);

            expect(businesses).to.satisfy((info) => typeof info === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should update Business info", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ fbToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with fbtoken"); }
            logger.info(user.fbToken);

            const businesses = await facebookBusinessMiddleware.updateBusinessInfo(
                "235920547146912", user.fbToken, "Megabanner 2.0", "ADVERTISING", "1844629475818586",
            );

            //const businessInfo = await facebookBusinessMiddleware.getBusinessInfo("235920547146912", user.fbToken);

            logger.info("businessInfo");
            logger.info(businesses);

            expect(businesses).to.satisfy((info) => typeof info === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should create a business", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ fbToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with fbtoken"); }

            console.log(user.fbToken);

            const businessCreated = await facebookBusinessMiddleware.createBusiness(
                "Megaprova", "ADVERTISING", "1844629475818586", user.fbToken,
            );

            // console.log("businessCreated");
            // console.log(businessCreated);

            setTimeout(() => {expect(businessCreated).to.satisfy((info) => typeof info === "object")}, 3000)

        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    after((done) => {
        mongoose.connection.close();
        done();
    });
});
