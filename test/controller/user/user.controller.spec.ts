import {expect, assert} from 'chai';
import {Server} from "../../../src/server";
import * as supertest from 'supertest';
import * as mongoose from "mongoose";

const server = Server.bootstrap();

describe("User controller test", () => {
    let name = "name",
        email = "email@test.com",
        password = "passwordpassword",
        phone = "666666666",
        role = "admin";
    it("should create user", done => {
        supertest(server.app)
            .post("/user/register")
            .set({
                'x-access-token': 'eyJhbGciOJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmN0b3JyZWxsZXNAZ21haWwuY29tIiwicGFzcyI6InBhc3N3b3JkIiwiaWF0IjoxNTIxMTM0NDg5fQ.E_bhFhfwEFbri3S__WvXCHedSbeM9H8YSSSZ4zmeVLE',
                'Content-Type': 'application/json'
            })
            .send({
                "name": name,
                "email": email,
                "password": password,
                "phone": phone,
                "role": role
            })
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                expect(res.body).to.have.property("name");
                done();
            });
    });

    after(done => {
        mongoose.connection.collections['users'].findOneAndDelete({email:"email@test.com"})
        mongoose.connection.close();
        done();
    });
});
