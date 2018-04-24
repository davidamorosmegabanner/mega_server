import {assert, expect} from "chai";
import * as mongoose from "mongoose";
import * as path from "path";

import config from "../../../src/config/config";
import {TwitterCreativeMiddleware} from "../../../src/middleware/twitter/creative.middleware";
import {default as UserMongo, User} from "../../../src/models/user/user.model";

const twitterCreativeMiddleware = new TwitterCreativeMiddleware();

describe("Twitter Ad Middleware test", () => {

    before((done) => {
        mongoose.connect(config.db);
        done();
    });

    it("Should upload an image", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ twToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with twToken"); }

            const filePath = "/Users/marc/TFG/mega_server/test/media/img.jpg";
            console.log("/Users/marc/TFG/mega_server/test/media/img.jpg")
            const image = await twitterCreativeMiddleware.uploadImage(
                user.twToken, user.twTokenSecret, filePath,
            );

            console.log(image);
            expect(image).to.satisfy(() => typeof (image) === "object");

        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    after((done) => {
        mongoose.connection.close();
        done();
    });
});
