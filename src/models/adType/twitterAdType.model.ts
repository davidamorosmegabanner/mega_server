import {Model, Schema} from "mongoose";
import {AdType, AllowedSize, default as AdTypeMongo, Duration, NumCreativities} from "./adType.model";

export interface TwitterAdType extends AdType {
    mandatoryTweet: boolean;
    mandatoryAppIds: boolean;
    mimetypes?: string[];
    allowedSize?: AllowedSize;
    duration?: Duration;
    frames?: number;
    objectives: string[];
    placements: string[];
}

const TwitterAdTypeSchema = new Schema({
    mandatoryTweet: {
        type: Boolean,
        required: true,
    },
    mandatoryAppIds: {
        type: Boolean,
        required: true,
    },
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
    duration: {
        min: {
            type: Number,
        },
        max: {
            type: Number,
        },
    },
    frames: {
        type: Number,
    },
    objectives: [{
        type: String,
        required: true,
    }],
    placements: [{
        type: String,
        required: true,
    }],
});

const TwitterAdTypeMongo: Model<TwitterAdType> =
    AdTypeMongo.discriminator("TwitterAdType", TwitterAdTypeSchema);
export default TwitterAdTypeMongo;
