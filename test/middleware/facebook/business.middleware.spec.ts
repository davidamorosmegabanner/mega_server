import {assert, expect} from "chai";
import * as mongoose from "mongoose";
import config from "../../../src/config/config";
import {FacebookBasicMiddleware} from "../../../src/middleware/facebook/basic.middleware";
import {FacebookBusinessMiddleware} from "../../../src/middleware/facebook/business.middleware";
import {default as UserMongo, User} from "./../../../src/models/user/user.model";

const facebookBusinessMiddleware = new FacebookBusinessMiddleware();
const facebookBasicMiddleware = new FacebookBasicMiddleware();

describe("Simple Fuelbanner request test", () => {

    before((done) => {
        mongoose.connect(config.db);
        done();
    });

    it("Should return Business info given a business id", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ fbToken: { $exists: true}, email: "email@test.com"});
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

            // Getting first business of the user
            const business = (await facebookBusinessMiddleware.getBusinesses(user.fbToken))[0].id;
            console.log(business);

            const businesses = await facebookBusinessMiddleware.updateBusinessInfo(
                (business), user.fbToken, "Megabanner 2.0", "ADVERTISING", "1844629475818586",
            );

            const businessInfo = await facebookBusinessMiddleware.getBusinessInfo((business), user.fbToken);

            console.log("businessInfo");
            console.log(businessInfo);

            expect(businesses).to.satisfy((info) => typeof info === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should create a business", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ fbToken: { $exists: true}, email: "email@test.com"});
            if (!user) {assert.ifError( "Error finding user with fbtoken"); }

            const fbUser = await facebookBasicMiddleware.getFacebookInfo(user.fbToken);

            console.log(fbUser)

            const businessCreated = await facebookBusinessMiddleware.createBusiness(
                (fbUser.id), "Megaprova", "ADVERTISING", "1844629475818586", user.fbToken,
            );

            expect(businessCreated).to.satisfy((info) => typeof info === "object");

        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    after((done) => {
        mongoose.connection.close();
        done();
    });
});
