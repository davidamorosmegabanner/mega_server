import {Document, Model, Schema} from "mongoose";
import * as mongoose from "mongoose";
import {AdModel} from "../../models/ad/ad.model";
import {Campaign} from "../../models/campaign/campaign.model";

export interface DummyStats extends Document {
    date: Date;
    campaign: Campaign;
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
        ref: "Campaign",
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
