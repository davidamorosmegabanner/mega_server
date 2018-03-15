import {Role, default as RoleMongo} from "../role/role.model";

import {Model} from "mongoose";

export class RoleService {
    mongoModel: Model<Role>;

    constructor(mongoModel?: Model<Role>) {
        this.mongoModel = mongoModel || RoleMongo;
    }

    async findByName(name: string) {
        return await this.mongoModel.findOne({name: name});
    }

    async findById(id: string) {
        return await this.mongoModel.findById(id);
    }
}
