import {Model} from "mongoose";
import {Role} from "../role/role.model";
import {Password} from "./password";
import {Token} from "./token";
import {default as UserMongo, User} from "./user.model";

export class UserService {
    private mongoModel: Model<User>;

    constructor(mongoModel?: Model<User>) {
        this.mongoModel = mongoModel || UserMongo;
    }

    public async create(name: string, email: string, password: string, role: Role, phone: string): Promise<User> {

        const user = new this.mongoModel({
            email: (email),
            name: (name),
            password: Password.encrypt(password).value,
            phone: (phone),
            role: (role),
            token: Token.generateToken(email, password).value,
        });

        return await user.save();
    }

    public async update(id: string, name: string, email: string, password: string, phone: string): Promise<User> {
        const user = {
            email: (email),
            name: (name),
            password: (password),
            phone: (phone),
        };

        if (id === undefined) {throw new Error("Param id is required")}

        if (user.name === undefined) {delete user.name}
        if (user.email === undefined) {delete user.email}
        if (user.password === undefined) {delete user.password}
        if (user.phone === undefined) {delete user.phone}

        return await this.mongoModel.findOneAndUpdate({_id: id}, user);
    }

    public async remove(id: string): Promise<User> {
        if (id === undefined) {throw new Error("Param id is required")}

        return await this.mongoModel.findByIdAndRemove(id);
    }

    public async listUsers(role: Role): Promise< Array<User> > {
        const find: any = {};

        find.active = true;
        if (role !== undefined) {find.role = role}

        return await this.mongoModel.find(find, {id: 1, name: 1, email: 1});
    }

    public async findByToken(token: string): Promise<User> {
        return await this.mongoModel.findOne({token: (token)});
    }

    public async findById(id: string): Promise<User> {
        return await this.mongoModel.findById(id);
    }

    public async findByEmail(email: string): Promise<User> {
        return await this.mongoModel.findOne({email: (email)});
    }

}
