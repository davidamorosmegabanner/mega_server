import {Document, Model, Schema} from "mongoose";
import * as mongoose from "mongoose";
import {Size} from "../creativity/creativity.model";
import {Platform} from "../platform/platform.model";

export interface AdType extends Document {
    name: string;
    key: string;
    description: string;
    platform: Platform;
    creativities: {
        min: number;
        max: number;
        size: Size;
        type: string;
    };
}

export interface Size {
    width: number;
    height: number;
}

const AdTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    key: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    platform: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Platform",
    },
    creativities: {
        min: {
            type: Number,
        },
        max: {
            type: Number,
        },
        size: {
            width: {
                type: Number,
            },
            height: {
                type: Number,
            },
        },
        type: {
            type: String,
        },
    },
});

const AdTypeMongo: Model<AdType> = mongoose.model<AdType>("AdType", AdTypeSchema);
export default AdTypeMongo;
