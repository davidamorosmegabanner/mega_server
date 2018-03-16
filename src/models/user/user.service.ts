import {User, default as UserMongo} from "./user.model";

import {Model} from "mongoose";
import {Password} from "./password";
import {Token} from "./token";
import {Role} from "../role/role.model";

export class UserService {
    mongoModel: Model<User>;

    constructor(mongoModel?: Model<User>) {
        this.mongoModel = mongoModel || UserMongo;
    }

    async create(name: string, email: string, password: string, role: Role, phone: string): Promise<User> {

        let user = new this.mongoModel({
            token: Token.generateToken(email, password).value,
            name: name,
            email: email,
            password: Password.encrypt(password).value,
            phone: phone,
            role: role
        });

        return await user.save();
    }

    async update(id: string, name: string, email: string, password: string, phone: string): Promise<User> {
        let user = {
            name: name,
            email: email,
            password: password,
            phone: phone,
        };

        if (id == undefined) throw("Param id is required");

        if (user.name == undefined) delete user.name;
        if (user.email == undefined) delete user.email;
        if (user.password == undefined) delete user.password;
        if (user.phone == undefined) delete user.phone;

        return await this.mongoModel.findOneAndUpdate({_id: id}, user);
    }

    async remove(id: string): Promise<User> {
        if (id == undefined) throw("Param id is required");

        return await this.mongoModel.findByIdAndRemove(id);
    }

    async listUsers(role: Role): Promise< Array<User> > {
        let find:any = {};

        find.active = true;
        if (role != undefined) find.role = role;

        return await this.mongoModel.find(find, {id: 1, name: 1, email: 1});
    }

    async findByToken(token: string): Promise<User> {
        return await this.mongoModel.findOne({token: token});
    }

    async findById(id: string): Promise<User> {
        return await this.mongoModel.findById(id);
    }
}
