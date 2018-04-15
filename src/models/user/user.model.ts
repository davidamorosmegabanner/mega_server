import {Document, Model, Schema} from "mongoose";
import * as mongoose from "mongoose";
import {Role} from "../role/role.model";

export interface User extends Document {
    _id: string;
    token: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    role: Role;
    active: boolean;
    deleted: boolean;
    // Social parameters
    fbToken?: string;
    fbAdAccount?: string;
}

const UserSchema = new Schema({
    token: {
        type: String,
        required: true,
        sparse: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, "Please fill a valid email address"],
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: "Role",
        required: true,
    },
    phone: {
        type: String,
    },
    deleted: {
        type: Boolean,
        required: true,
        default: false,
    },
    fbToken: {
        type: String,
    },
    fbAdAccount: {
        type: String,
    },
});

const UserMongo: Model<User> = mongoose.model<User>("User", UserSchema);
export default UserMongo;
