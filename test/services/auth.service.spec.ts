import {expect, assert} from 'chai';
import * as mongoose from 'mongoose';
import {AuthService} from "../../src/services/auth.service";
import config from "../../src/config/config";

const authService = new AuthService();

describe("Authentication service test", () => {
    before(done => {
        mongoose.connect(config.db);
        done();
    });


    it("Should be allowed with admin token", async () => {
        try {
            let authentication = await authService.isAllowed(
                ["admin"],
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmN0b3JyZWxsZXNAZ21haWwuY29tIiwicGFzcyI6InBhc3N3b3JkIiwiaWF0IjoxNTIxMTM0NDg5fQ.E_bhFhfwEFbri3S__WvXCHedSbeM9H8YSSSZ4zmeVLE");
            console.log(authentication);
            expect(authentication).to.be.true;
        } catch(err) {
            assert.ifError(err, "Error when authenticating user with admin token");
        }
    });

    it("Should be allowed with superToken", async () => {
        try {
            let authentication = await authService.isAllowed(
                [""],
                config.superToken.value)
            expect(authentication).to.be.true;
        } catch(err) {
            assert.ifError(err, "Error when authenticating user with superToken");
        }
    });

    after(done => {
        mongoose.connection.close();
        done();
    });
});
