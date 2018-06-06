import {assert, expect} from "chai";
import * as mongoose from "mongoose";
import config from "../../../src/config/config";
import {FacebookPageMiddleware} from "../../../src/middleware/facebook/page.middleware";
import {default as UserMongo, User} from "./../../../src/models/user/user.model";

const facebookPageMiddleware = new FacebookPageMiddleware();

describe("Page middleware test", () => {

    before((done) => {
        mongoose.connect(config.db);
        done();
    });

    it("Should return pages owned by user", async () => {
        try {
            const mongoUser = UserMongo;
            const user: User = await mongoUser.findOne({ fbToken: { $exists: true}, email: "prova@prova.com"});
            if (!user) {assert.ifError( "Error finding user with fbtoken"); }

            const pages = await facebookPageMiddleware.getOwnedPages(user.fbToken);

            expect(pages).to.satisfy((o) => typeof o === "object");
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });

    after((done) => {
        mongoose.connection.close();
        done();
    });
});
