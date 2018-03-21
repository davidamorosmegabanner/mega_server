import {Document, Model, Schema} from "mongoose";
import * as mongoose from "mongoose";
import {User} from "../user/user.model";

export interface Size {
    width: number;
    height: number;
}

export interface Creativity extends Document {
    _id: string;
    name: string;
    owner: User;
    path: string;
    mimetype: string;
    fileformat: string;
    filetype: string;
    size: Size;
    duration?: number;
    deleted: boolean;
    created: Date;
}

const CreativitySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    source: {
        type: String,
        required: true,
    },
    mimetype: {
        type: String,
        required: true,
    },
    fileformat: {
        type: String,
        required: true,
    },
    filetype: {
        type: String,
        required: true,
    },
    size: {
        width: {
            type: Number,
            required: true,
        },
        height: {
            type: Number,
            required: true,
        },
    },
    duration: {
        type: Number,
    },
    deleted: {
        type: Boolean,
        required: true,
        default: false,
    },
    created: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const CreativityMongo: Model<Creativity> = mongoose.model<Creativity>("Creativity", CreativitySchema);
export default CreativityMongo;
