import {assert, expect} from "chai";
import {FacebookMiddleware} from "../../../src/middleware/facebook/facebook.middleware";

const facebookMiddleware = new FacebookMiddleware();

describe("Simple Fuelbanner request test", () => {
    it("Should make a simple request", async () => {
        try {
            const request = await facebookMiddleware.makeSimpleRequest();

            expect(request).to.satisfy((req) => (req).length > 1);
        } catch (err) {
            assert.ifError(err, "error making request");
        }
    });
});
