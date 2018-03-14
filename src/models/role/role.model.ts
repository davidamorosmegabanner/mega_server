import {Model, Schema, Document} from "mongoose";
import * as mongoose from "mongoose";

export interface Role extends Document {
    name: string;
    key: string;
    description: string
}

let RoleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    key: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});


const RoleMongo: Model<Role> = mongoose.model<Role>('Role', RoleSchema);
export default RoleMongo;
