import {Document, Model, Schema} from "mongoose";
import * as mongoose from "mongoose";
import {Campaign} from "../campaign/campaign.model";

export interface Objective extends Document {
    campaign: Campaign;
    awareness: {
        brandAwareness: boolean;
        reach: boolean;
    };
    consideration: {
        traffic: boolean;
        appInstalls: boolean;
        engagement: boolean;
        leadGeneration: boolean;
    };
    conversion: {
        conversions: boolean;
        storeVisits: boolean;
    };
}

const ObjectiveSchema = new Schema({
    campaign: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Campaign",
    },
    awareness: {
        brandAwareness: {
            type: Boolean,
            default: false,
            required: true,
        },
        reach: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
    consideration: {
        traffic: {
            type: Boolean,
            default: false,
            required: true,
        },
        appInstalls: {
            type: Boolean,
            default: false,
            required: true,
        },
        engagement: {
            type: Boolean,
            default: false,
            required: true,
        },
        leadGeneration: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
    conversion: {
        conversions: {
            type: Boolean,
            default: false,
            required: true,
        },
        storeVisits: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
});

const ObjectiveMongo: Model<Objective> = mongoose.model<Objective>("ObjectiveModel", ObjectiveSchema);
export default ObjectiveMongo;
