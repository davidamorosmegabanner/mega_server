import {Document, Model, Schema} from "mongoose";
import * as mongoose from "mongoose";
import {User} from "../user/user.model";
import {DimensionsModel} from "./dimensions.model";

export interface CreativityModel extends Document {
    _id: string;
    name: string;
    owner: User;
    path: string;
    thumbnail: string;
    mimetype: string;
    fileformat: string;
    filetype: string;
    dimensions: DimensionsModel;
    size: number; // in bytes
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
    path: {
        type: String,
        required: true,
    },
    thumbnail: {
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
    dimensions: {
        width: {
            type: Number,
            required: true,
        },
        height: {
            type: Number,
            required: true,
        },
    },
    size: {
        type: Number,
        required: true,
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

const CreativityMongo: Model<CreativityModel> = mongoose.model<CreativityModel>("CreativityModel", CreativitySchema);
export default CreativityMongo;
