import {expect, assert} from 'chai';
import * as supertest from 'supertest';
import * as mongoose from 'mongoose';
import {Server} from "../../../src/server";
import config from "../../../src/config/config";

const server = Server.bootstrap();

describe("User controller test", () => {
    let name = "name2",
        email = "email2@test.com",
        password = "passwordpassword",
        phone = "666666666",
        role = "admin";

    let receivedId = "";

    it("Should create user", done => {
        supertest(server.app)
            .post("/user/register")
            .set({
                'x-access-token': config.superToken.value,
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
                receivedId = res.body.id;
                done();
            });
    });

    it("Should edit user name and email", done => {
        supertest(server.app)
            .post("/user/edit")
            .set({
                'x-access-token': config.superToken.value,
                'Content-Type': 'application/json'
            })
            .send({
                "id": receivedId,
                "name": "NEW NAME",
                "email": "new@email.com"
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
                'x-access-token': config.superToken.value,
                'Content-Type': 'application/json'
            })
            .send({
                "id": receivedId,
                "name": "NEW NAME",
                "email": "new@email.com"
            })
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                expect(res.body).to.have.property("name");
                expect(res.body.phone).to.not.be.a('null');
                done();
            });
    });

    it("Should list users - Only passes if there is at least one user in db", done => {
        supertest(server.app)
            .post("/user/list")
            .set({
                'x-access-token': config.superToken.value,
                'Content-Type': 'application/json'
            })
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
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
