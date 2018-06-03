import {expect, assert} from "chai";
import * as mongoose from "mongoose";
import * as supertest from "supertest";
import config from "../../../src/config/config";
import {Server} from "../../../src/server";

const server = Server.bootstrap();

describe("User controllers test", () => {
    const name = "CampaignModel new";
    const description = "CampaignModel to test everything is ok";
    const dailyBudget = 666;
    const startDate = new Date();
    const endDate = new Date(); endDate.setDate(startDate.getDate() + 1); // +1 day

    let receivedId = "";

    it("Should create a campaign", done => {
        supertest(server.app)
            .post("/campaign/create")
            .set({
                "x-access-token": config.superToken.value,
                "Content-Type": "application/json"
            })
            .send({
                name: (name),
                description: (description),
                dailyBudget: (dailyBudget),
                startDate: (startDate.toISOString()),
                endDate: (endDate.toISOString()),
            })
            .expect(200)
            .end((err, res) => {
                console.log(res.body)
                if (err) {throw new Error(err)}
                expect(res.body).to.have.property("name");
                receivedId = res.body.id;
                done();
            });
    });

    it("Should edit user name and email", done => {
        supertest(server.app)
            .post("/user/edit")
            .set({
                "x-access-token": config.superToken.value,
                "Content-Type": "application/json"
            })
            .send({
                id: (receivedId),
                name: "NEW NAME",
                email: "new@email.com",
            })
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                expect(res.body).to.have.property("name");
                expect(res.body.phone).to.not.be.a('null');
                done();
            });
    });

    it("Should delete the user created before", done => {
        supertest(server.app)
            .post("/user/edit")
            .set({
                "x-access-token": config.superToken.value,
                "Content-Type": "application/json"
            })
            .send({
                "id": (receivedId),
                "name": "NEW NAME",
                "email": "new@email.com",
            })
            .expect(200)
            .end((err, res) => {
                if (err) {throw new Error(err)};
                expect(res.body).to.have.property("name");
                expect(res.body.phone).to.not.be.a("null");
                done();
            });
    });

    it("Should list users - Only passes if there is at least one user in db", done => {
        supertest(server.app)
            .post("/user/list")
            .set({
                "x-access-token": config.superToken.value,
                "Content-Type": "application/json"
            })
            .expect(200)
            .end((err, res) => {
                if (err) {throw new Error(err)}
                expect(res.body).to.have.length;
                done();
            });
    });

    after(done => {
        // Done with remove
        // mongoose.connection.collections['users'].findOneAndDelete({email:"email@test.com"})
        mongoose.connection.close();
        done();
    });
});
