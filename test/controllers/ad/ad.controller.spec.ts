import {assert, expect} from "chai";
import * as supertest from "supertest";
import config from "../../../src/config/config";
import {Server} from "../../../src/server";

const server = Server.bootstrap();

describe("User controllers test", () => {
    const startDate = new Date();
    const endDate = new Date(); endDate.setDate(startDate.getDate() + 1); // +1 day

    it("Should create a TW_TWEET ad", (done) => {

        supertest(server.app)
            .post("/ad/create")
            .set({
                "x-access-token": config.superToken.value,
                "Content-Type": "application/json",
            })
            .send({
                name: "Test Ad TW_TWEET",
                owner: "5aac26ce1bd7980cd46251d1",
                adType: "TW_TWEET",
                text: "This is a tweeeeeeet",
                campaign: "5ac3cbdfb7f5542d592698d3",
            })
            .expect(200)
            .end((err, res) => {
                if (err) {throw new Error(err);}
                expect(res.statusCode).to.be.equal(200);
                expect(res.body).to.have.property("name");
                done();
            });
    });
});
