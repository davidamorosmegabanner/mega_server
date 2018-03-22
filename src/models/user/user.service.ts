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

        if (id === undefined) { throw new Error("Param id is required"); }

        if (user.name === undefined) { delete user.name; }
        if (user.email === undefined) { delete user.email; }
        if (user.password === undefined) { delete user.password; }
        if (user.phone === undefined) { delete user.phone; }

        return await this.mongoModel.findOneAndUpdate({_id: id}, user);
    }

    public async findByToken(token: string): Promise<User> {
        return await this.mongoModel
            .findOne({token: (token), deleted: false})
            .populate("role");
    }

    public async findById(id: string): Promise<User> {
        return await this.mongoModel
            .findOne({id: (id), deleted: false});
    }

    public async findByEmail(email: string): Promise<User> {
        return await this.mongoModel
            .findOne({email: (email), deleted: false})
            .populate("role");
    }

    public async remove(id: string): Promise<User> {
        if (id === undefined) {throw new Error("Param id is required"); }

        return await this.mongoModel.findOneAndUpdate({_id: id}, {$set: {deleted: true}});
    }

    public async listUsers(role?: Role): Promise<User[]> {
        const find: any = {};
        find.deleted = false;
        if (role && role !== undefined) {find.role = role; }

        return await this.mongoModel
            .find(find, {id: 1, name: 1, email: 1})
            .populate("role", {name: 1, _id: 0});
    }

    public async getUserProfile(token: string): Promise<User> {
        return await this.mongoModel
            .findOne({ token: (token), deleted: false }, { _id: 1, token: 1, email: 1, name: 1, phone: 1})
            .populate("role", {name: 1, _id: 0});
    }
}
