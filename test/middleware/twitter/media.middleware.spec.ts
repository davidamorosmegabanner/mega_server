import {assert, expect} from "chai";
import * as mongoose from "mongoose";

import config from "../../../src/config/config";
import {TwitterCreativeMiddleware} from "../../../src/middleware/twitter/media.middleware";
import {default as UserMongo, User} from "../../../src/models/user/user.model";

const twitterCreativeMiddleware = new TwitterCreativeMiddleware();

describe("Twitter Ad Middleware test", () => {

    before((done) => {
        mongoose.connect(config.db);
        done();
    });

    it("Should upload an image and return media id", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const filePath = "/Users/marc/TFG/mega_server/test/media/img.jpg";
            const image = await twitterCreativeMiddleware.uploadMedia(
                user.twToken, user.twTokenSecret, filePath
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

            const filePath = "/Users/marc/TFG/mega_server/test/media/gif.gif";
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

            const filePath = "/Users/marc/TFG/mega_server/test/media/video.mp4";
            const video = await twitterCreativeMiddleware.uploadMedia(
                user.twToken, user.twTokenSecret, filePath,
            );

            console.log(video);
            expect(video).to.satisfy(() => video.length > 3);

        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    after((done) => {
        mongoose.connection.close();
        done();
    });
});
