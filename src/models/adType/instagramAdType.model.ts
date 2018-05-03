import {Model, Schema} from "mongoose";
import {AdType, AllowedRatio, AllowedSize, default as AdTypeMongo, Duration} from "./adType.model";

export interface InstagramAdType extends AdType {
    mimetypes: string[];
    allowedSize: AllowedSize;
    allowedRatio: AllowedRatio;
    duration?: Duration;
    actions: string[];
    objectives: string[];
}

const InstagramAdTypeSchema = new Schema({
    mimetypes: [{
        type: String,
        required: true,
    }],
    allowedSize: {
        min: {
            width: {
                type: Number,
                required: true,
            },
            height: {
                type: Number,
                required: true,
            },
        },
        max: {
            width: {
                type: Number,
                required: true,
            },
            height: {
                type: Number,
                required: true,
            },
        },
    },
    allowedRatio: {
        min: {
            width: {
                type: Number,
                required: true,
            },
            height: {
                type: Number,
                required: true,
            },
        },
        max: {
            width: {
                type: Number,
                required: true,
            },
            height: {
                type: Number,
                required: true,
            },
        },
    },
    duration: {
        min: {
            type: Number,
        },
        max: {
            type: Number,
        },
    },
    actions: [{
        type: String,
        required: true,
    }],
    objectives: [{
        type: String,
        required: true,
    }],
});

const InstagramAdTypeMongo: Model<InstagramAdType> =
    AdTypeMongo.discriminator("InstagramAdType", InstagramAdTypeSchema);
export default InstagramAdTypeMongo;
