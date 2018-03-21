import {Model, Schema} from "mongoose";
import {AdType, AllowedRelation, AllowedSize, default as AdTypeMongo} from "../adType.model";

export interface InstagramAdType extends AdType {
    mimetypes: [string];
    allowedSize: AllowedSize;
    allowedRelation: AllowedRelation;
    actions: [string];
    objectives: [string];
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
    allowedRelation: {
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
    actions: [{
        type: String,
        required: true,
    }],
    objectives: [{
        type: String,
        required: true,
    }],
});

const InstagramAdTypeMongo: Model<InstagramAdType> = AdTypeMongo.discriminator("InstagramAdType", InstagramAdTypeSchema);
export default InstagramAdTypeMongo;