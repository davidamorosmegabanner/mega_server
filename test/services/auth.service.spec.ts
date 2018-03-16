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


    it("Should be allowed", async () => {
        try {
            let authentication = await authService.isAllowed(
                ["admin"],
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o");
            console.log(authentication);
            expect(authentication).to.be.true;
        } catch(err) {
            assert.ifError(err, "Error when authenticating user");
        }
    });

    after(done => {
        mongoose.connection.close();
        done();
    });
});
