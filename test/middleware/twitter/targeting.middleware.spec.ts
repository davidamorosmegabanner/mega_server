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

    it("Should get all app store categories", async () => {
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

    it("Should get all devices", async () => {
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

    it("Should get all interests", async () => {
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

    it("Should get all languages", async () => {
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

    it("Should get all locations", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const languages = await twitterTargetingMiddleware.getLocations(
                user.twToken, user.twTokenSecret,
            );

            console.log(languages);
            expect(languages).to.satisfy(() => typeof languages === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should get all network operators", async () => {
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

    it("Should get all platforms", async () => {
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

    after((done) => {
        mongoose.connection.close();
        done();
    });
});
