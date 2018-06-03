import {Document, Model, Schema} from "mongoose";
import * as mongoose from "mongoose";
import {Location, LocationSchema} from "./location.model";
import {SubCategory} from "./subCategory.model";

export interface Targeting extends Document{
    age?: [number, number];
    sex?: string;
    sentimentalStatus?: string;
    formation?: string;
    employed?: boolean;
    location?: Location;
    interests?: SubCategory[];
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
        type: Schema,
    },
    employed: {
        type: Boolean,
    },
    location: {
        type: LocationSchema,
    },
    interests: [{
        type: String,
    }],
});

const TargetingMongo: Model<Targeting> = mongoose.model<Targeting>("TargetingModel", TargetingSchema);
export default TargetingMongo;
