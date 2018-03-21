import {Model, Schema} from "mongoose";
import {AdType, AllowedRelation, AllowedSize, default as AdTypeMongo, NumCreativities} from "../adType.model";

export interface InstagramAdType extends AdType {
    mimetypes: [string];
    numCreativities: NumCreativities;
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

// constructor(
//     name = "Instagram Story",
//     key = "IG_STORY",
//     description = "Instagram image or video that appears while viewing stories",
//     platform: Platform = new Instagram(),
//     allowedSize: AllowedSize = {
//     min: {
//         width: 200,
//         height: 400,
//     },
//     max: {
//         width: 800,
//         height: 1600,
//     },
// },
// ) {
//     this.name = name;
//     this.key = key;
//     this.description = description;
//     this.platform = platform;
//     this.allowedSize = allowedSize;
// }
