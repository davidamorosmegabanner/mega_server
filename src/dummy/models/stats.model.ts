import {Document, Model, Schema} from "mongoose";
import * as mongoose from "mongoose";
import {Ad} from "../../models/ad/ad.model";
import {Campaign} from "../../models/campaign/campaign.model";

export interface DummyStats extends Document {
    date: Date;
    campaign: Campaign;
    stats: {
        ad: Ad;
        CTR: number;
    }[];
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
            ref: "Ad",
            required: true,
        },
        CTR: {
            type: Number,
            required: true,
        },
    }],
});

const DummyStatsMongo: Model<DummyStats> = mongoose.model<DummyStats>("DummyStats", DummyStatsSchema);
export default DummyStatsMongo;
