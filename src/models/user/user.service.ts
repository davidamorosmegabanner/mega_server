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

        phone ? user.phone = phone : {};

        return await user.save();
    }

    async findByToken(token: string): Promise<User> {
        return await this.mongoModel.findOne({token: token});
    }

    async findById(id: string): Promise<User> {
        return await this.mongoModel.findById(id);
    }
}
