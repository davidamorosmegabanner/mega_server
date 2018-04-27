import {assert, expect} from "chai";
import * as mongoose from "mongoose";
import * as path from "path";

import config from "../../../src/config/config";
import {TwitterAdMiddleware} from "../../../src/middleware/twitter/ad.middleware";
import {TwitterCreativeMiddleware} from "../../../src/middleware/twitter/creative.middleware";
import {default as UserMongo, User} from "../../../src/models/user/user.model";

const twitterCreativeMiddleware = new TwitterCreativeMiddleware();
const twitterAdMiddleware = new TwitterAdMiddleware();

describe("Twitter Ad Middleware test", () => {

    before((done) => {
        mongoose.connect(config.db);
        done();
    });

    it("Should retrieve user ad tweets", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const adAccount = await twitterAdMiddleware.makeSandboxAccount(user.twToken, user.twTokenSecret);
            const tweets = await twitterCreativeMiddleware.getTweets(
                user.twToken, user.twTokenSecret, adAccount.data[0].id,
            );

            console.log(tweets);
            expect(tweets).to.satisfy(() => typeof tweets === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should create an advertising tweet with only text", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const adAccount = await twitterAdMiddleware.makeSandboxAccount(user.twToken, user.twTokenSecret);
            const tweet = await twitterCreativeMiddleware.createTweet(
                user.twToken, user.twTokenSecret, adAccount.data[0].id,
                "Test tweet - " + Math.round((Math.random() * 1000000)).toString(),
            );

            console.log(tweet);
            expect(tweet).to.satisfy(() => typeof tweet === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should create an advertising tweet with a text and an image", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const adAccount = await twitterAdMiddleware.makeSandboxAccount(user.twToken, user.twTokenSecret);

            const filePath = path.join(process.cwd(), "test", "media", "1-1.jpg");
            const image = await twitterCreativeMiddleware.uploadMedia(
                user.twToken, user.twTokenSecret, filePath,
            );

            const tweet = await twitterCreativeMiddleware.createTweet(
                user.twToken, user.twTokenSecret, adAccount.data[0].id,
                "Test tweet - " + Math.round((Math.random() * 1000000)).toString(),
                undefined, [image.media_id_string],
            );

            console.log(tweet);
            expect(tweet).to.satisfy(() => typeof tweet === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should upload an image and return media id", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const filePath = path.join(process.cwd(), "test", "media", "img.jpg");
            const image = await twitterCreativeMiddleware.uploadMedia(
                user.twToken, user.twTokenSecret, filePath,
            );

            console.log(image);
            expect(image).to.satisfy(() => image.length > 3);
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should upload a GIF and return media id", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const filePath = path.join(process.cwd(), "test", "media", "gif.gif");
            const gif = await twitterCreativeMiddleware.uploadMedia(
                user.twToken, user.twTokenSecret, filePath,
            );

            console.log(gif);
            expect(gif).to.satisfy(() => gif.length > 3);
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should upload a video and return media id", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const filePath = path.join(process.cwd(), "test", "media", "video2.mp4");
            const video = await twitterCreativeMiddleware.uploadMedia(
                user.twToken, user.twTokenSecret, filePath,
            );

            console.log(video);
            expect(video).to.satisfy(() => video.length > 3);
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should get a mediaKey when mediaId is passed", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const mediaKey = await twitterCreativeMiddleware.getMediaKey(
                user.twToken, user.twTokenSecret, user.twAdAccount, "989450954356482048", "video/mp4",
            );

            console.log(mediaKey);
            expect(mediaKey).to.satisfy(() => mediaKey.length > 3);
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should upload an image, get mediaKey and create a website card", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const filePath = path.join(process.cwd(), "test", "media", "1-1.jpg");
            const image = await twitterCreativeMiddleware.uploadMedia(
                user.twToken, user.twTokenSecret, filePath,
            );
            const mediaKey = await twitterCreativeMiddleware.getMediaKey(
                user.twToken, user.twTokenSecret, user.twAdAccount, image, "image/jpg",
            );
            const websiteVideoCard = await twitterCreativeMiddleware.createWebsiteImageCard(
                user.twToken, user.twTokenSecret, user.twAdAccount,
                "Website test", "Megabanner web", "http://www.megabanner.net", mediaKey,
            );

            console.log(websiteVideoCard);
            expect(websiteVideoCard).to.satisfy(() => typeof websiteVideoCard === "object");

        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    it("Should upload a video, get mediaKey and create a website card", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const filePath = path.join(process.cwd(), "test", "media", "16-9.mp4");
            const video = await twitterCreativeMiddleware.uploadMedia(
                user.twToken, user.twTokenSecret, filePath,
            );
            const mediaKey = await twitterCreativeMiddleware.getMediaKey(
                user.twToken, user.twTokenSecret, user.twAdAccount, video, "video/mp4",
            );
            const websiteVideoCard = await twitterCreativeMiddleware.createWebsiteVideoCard(
                user.twToken, user.twTokenSecret, user.twAdAccount,
                "Website test", "Megabanner web", "http://www.megabanner.net", mediaKey,
            );

            console.log(websiteVideoCard);
            expect(websiteVideoCard).to.satisfy(() => typeof websiteVideoCard == "object");

        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    after((done) => {
        mongoose.connection.close();
        done();
    });
});
