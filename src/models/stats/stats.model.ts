import {Document, Model, Schema} from "mongoose";
import * as mongoose from "mongoose";
import {Ad} from "../ad/ad.model";
import {Campaign} from "../campaign/campaign.model";
import {Statistic} from "./statistic.model";

export interface Stats extends Document {
    date: Date;
    campaign: Campaign;
    ads: Ad[];
    statistics: Statistic[];
}

const StatsSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    campaign: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Campaign",
    },
    ads: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Ad",
    }],
    statistics: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Statistic",
    }],
});

const StatsMongo: Model<Stats> = mongoose.model<Stats>("Stats", StatsSchema);
export default StatsMongo;
