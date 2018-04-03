import {Document, Model, Schema} from "mongoose";
import * as mongoose from "mongoose";
import {Platform} from "../platform/platform.model";

export interface Size {
    width: number;
    height: number;
}

export interface AllowedSize {
    min: Size;
    max: Size;
}

export interface AllowedRatio {
    min: Size;
    max: Size;
}

export interface Duration {
    min: number;
    max: number;
}

export interface NumCreativities {
    min: number;
    max: number;
}

export interface AdType extends Document {
    name: string;
    key: string;
    description: string;
    platform: Platform;
    numCreativities: NumCreativities;
    __t?: AdType;
}

const AdTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    platform: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Platform",
    },
    numCreativities: {
        min: {
            type: Number,
            required: true,
        },
        max: {
            type: Number,
            required: true,
        },
    },
});

const AdTypeMongo: Model<AdType> = mongoose.model<AdType>("AdType", AdTypeSchema);
export default AdTypeMongo;
