/* tslint:disable:no-unused-expression */

import {assert, expect} from "chai";
import * as mongoose from "mongoose";
import config from "../../src/config/config";
import {AuthService} from "../../src/services/auth.service";

const authService = new AuthService();

describe("Authentication service test", () => {
    before((done) => {
        mongoose.connect(config.db);
        done();
    });

    it("Should be allowed with admin token", async () => {
        try {
            const authentication = await authService.isAllowed(
                ["admin"],
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmN0b3JyZWxsZXNAZ21haWwuY29tIiwicGFzcyI6InBhc3N3b3JkIiwiaWF0IjoxNTIxMTM0NDg5fQ.E_bhFhfwEFbri3S__WvXCHedSbeM9H8YSSSZ4zmeVLE"
            );

            expect(authentication).to.be.true;
        } catch (err) {
            assert.ifError(err, "Error when authenticating user with admin token");
        }
    });

    it("Should be allowed with superToken", async () => {
        try {
            const authentication = await authService.isAllowed(
                [""],
                config.superToken.value);

            expect(authentication).to.be.true;
        } catch (err) {
            assert.ifError(err, "Error when authenticating user with superToken");
        }
    });

    after((done) => {
        mongoose.connection.close();
        done();
    });
});

/* tslint:disable:no-unused-expression */
