import {default as RoleMongo, RoleModel, default as Roles} from "./role.model";

import {Model} from "mongoose";

export class RoleService {
    public mongoModel: Model<RoleModel>;

    constructor(mongoModel?: Model<RoleModel>) {
        this.mongoModel = mongoModel || RoleMongo;
    }

    public async listRoles(): Promise<RoleModel[]> {
        return await this.mongoModel
            .find({}, {_id: 0, name: 1, description: 1})
            .lean();
    }

    public async findByName(name: string) {
        return Roles.find((role) =>  role.name === name);
    }

    public async findById(id: string) {
        return await this.mongoModel
            .findById(id)
            .lean();
    }
}
