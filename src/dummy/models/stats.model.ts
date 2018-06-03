import {Document, Model, Schema} from "mongoose";
import * as mongoose from "mongoose";
import {AdModel} from "../../models/ad/ad.model";
import {CampaignModel} from "../../models/campaign/campaign.model";

export interface DummyStats extends Document {
    date: Date;
    campaign: CampaignModel;
    stats: Array<{
        ad: AdModel;
        weight: number;
    }>;
    published: boolean;
}

const DummyStatsSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    campaign: {
        type: Schema.Types.ObjectId,
        ref: "CampaignModel",
        required: true,
    },
    stats: [{
        ad: {
            type: Schema.Types.ObjectId,
            ref: "AdModel",
            required: true,
        },
        // CTR: {
        //     type: Number,
        //     required: true,
        // },
        weight: {
            type: Number,
            required: true,
        },
    }],
    published: {
        type: Boolean,
        default: false,
    },
});

const DummyStatsMongo: Model<DummyStats> = mongoose.model<DummyStats>("DummyStats", DummyStatsSchema);
export default DummyStatsMongo;
