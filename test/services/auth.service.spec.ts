import {expect} from 'chai';
import {AuthService} from "../../src/services/auth.service";

describe("Authentication service test", () => {

    const authService = new AuthService();

    it("should be allowed", done => {
        let authentication = authService.isAllowed(
            ["admin"],
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o");
        expect(authentication).to.be.true;
    });

});
