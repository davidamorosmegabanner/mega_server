import {default as RoleMongo, Role} from "../role/role.model";

import {Model} from "mongoose";

export class RoleService {
    public mongoModel: Model<Role>;

    constructor(mongoModel?: Model<Role>) {
        this.mongoModel = mongoModel || RoleMongo;
    }

    public async listRoles(): Promise<Role[]> {
        return await this.mongoModel.find({}, {_id: 0, name: 1, description: 1});
    }

    public async findByName(name: string) {
        return await this.mongoModel.findOne({name});
    }

    public async findById(id: string) {
        return await this.mongoModel.findById(id);
    }
}
