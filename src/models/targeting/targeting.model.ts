import {Document, Model, Schema} from "mongoose";
import * as mongoose from "mongoose";
import {SubCategory} from "../category/subCategory.model";
import {Location, LocationSchema} from "./location.model";

export interface Targeting extends Document {
    age?: [number, number];
    sex?: string;
    sentimentalStatus?: string;
    formation?: string;
    employed?: boolean;
    location?: Location;
    language?: string;
    interests?: SubCategory[];
    operatingSystemKey?: [string];
}

const TargetingSchema = new Schema({
    age: [{
        type: Number,
    }],
    sex: {
        type: String,
    },
    sentimentalStatus: {
        type: String,
    },
    formation: {
        type: String,
    },
    employed: {
        type: Boolean,
    },
    location: {
        type: LocationSchema,
    },
    language: {
        type: String,
    },
    interests: [{
        type: String,
    }],
    operatingSystemKey: [{
        type: String,
    }],
});

const TargetingMongo: Model<Targeting> = mongoose.model<Targeting>("TargetingModel", TargetingSchema);
export default TargetingMongo;
