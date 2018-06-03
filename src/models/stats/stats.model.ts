import {Document, Model, Schema} from "mongoose";
import * as mongoose from "mongoose";
import {AdModel} from "../ad/ad.model";
import {CampaignModel} from "../campaign/campaign.model";
import {Statistic} from "./statistic.model";

export interface Stats extends Document {
    date: Date;
    campaign: CampaignModel;
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
        ref: "CampaignModel",
    },
    ads: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "AdModel",
    }],
    statistics: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Statistic",
    }],
});

const StatsMongo: Model<Stats> = mongoose.model<Stats>("Stats", StatsSchema);
export default StatsMongo;
