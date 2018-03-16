import {Model, Schema, Document} from "mongoose";
import * as mongoose from "mongoose";

export interface User extends Document {
  _id: string;
  token: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  active: boolean;
  deleted: boolean;
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
        required: true
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
    },
    phone: {
        type: String
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    deleted: {
        type: Boolean,
        required: true,
        default: false
    }
});

const UserMongo: Model<User> = mongoose.model<User>("User", UserSchema);
export default UserMongo;
