import {assert, expect} from "chai";
import * as mongoose from "mongoose";

import config from "../../../src/config/config";
import {TwitterTargetingMiddleware} from "../../../src/middleware/twitter/targeting.middleware";
import {default as UserMongo, User} from "../../../src/models/user/user.model";

const twitterTargetingMiddleware = new TwitterTargetingMiddleware();

describe("Twitter Ad Middleware test", () => {

    before((done) => {
        mongoose.connect(config.db);
        done();
    });

    it("Should getUserAds all app store categories", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const appStoreCat = await twitterTargetingMiddleware.getAppStoreCaregories(
                user.twToken, user.twTokenSecret,
            );

            console.log(appStoreCat);
            expect(appStoreCat).to.satisfy(() => typeof appStoreCat === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should getUserAds all devices", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const appStoreCat = await twitterTargetingMiddleware.getDevices(
                user.twToken, user.twTokenSecret,
            );

            console.log(appStoreCat);
            expect(appStoreCat).to.satisfy(() => typeof appStoreCat === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should getUserAds all interests", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const interests = await twitterTargetingMiddleware.getInterests(
                user.twToken, user.twTokenSecret,
            );

            console.log(interests);
            expect(interests).to.satisfy(() => typeof interests === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should getUserAds all languages", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const languages = await twitterTargetingMiddleware.getLanguages(
                user.twToken, user.twTokenSecret,
            );

            console.log(languages);
            expect(languages).to.satisfy(() => typeof languages === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should getUserAds all locations", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const languages = await twitterTargetingMiddleware.getLocations(
                user.twToken, user.twTokenSecret, null, "REGIONS", "Barcelona",
            );

            console.log(languages);
            expect(languages).to.satisfy(() => typeof languages === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should getUserAds all network operators", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const languages = await twitterTargetingMiddleware.getNetworkOperators(
                user.twToken, user.twTokenSecret, "ES",
            );

            console.log(languages);
            expect(languages).to.satisfy(() => typeof languages === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should getUserAds all platforms", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const languages = await twitterTargetingMiddleware.getPlatforms(
                user.twToken, user.twTokenSecret,
            );

            console.log(languages);
            expect(languages).to.satisfy(() => typeof languages === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should getUserAds targeting for specific line item", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const targeting = await twitterTargetingMiddleware.getTargeting(
                user.twToken, user.twTokenSecret, "gq1drn", "emgu",
            );

            console.log(targeting);
            expect(targeting).to.satisfy(() => typeof targeting === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should delete a targeting criteria for a line item", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const targeting = await twitterTargetingMiddleware.deleteTargeting(
                user.twToken, user.twTokenSecret, "gq1drn", "38rsz",
            );

            console.log(targeting);
            expect(targeting).to.satisfy(() => typeof targeting === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should associate an existing line item with specific targeting", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const targetsArray = [
                {targetingType: "AGE", targetingValue: "AGE_13_TO_34"},
                {targetingType: "INTEREST", targetingValue: "9002"},
                {targetingType: "INTEREST", targetingValue: "9003"},
                {targetingType: "LANGUAGE", targetingValue: "es"},
                {targetingType: "LOCATION", targetingValue: "f3e29c4c744f3625"},
                {targetingType: "PLATFORM", targetingValue: "0"},
                {targetingType: "PLATFORM", targetingValue: "1"},
                {targetingType: "PLATFORM", targetingValue: "4"},
            ];

            const target = await twitterTargetingMiddleware.doTargeting(
                user.twToken, user.twTokenSecret, "gq1drn",
                "emgu", targetsArray,
            );

            console.log(target);
            expect(target).to.satisfy(() => typeof target === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    })

    after((done) => {
        mongoose.connection.close();
        done();
    });
});
