import {Document, Model, Schema} from "mongoose";
import * as mongoose from "mongoose";
import {Ad} from "../ad/ad.model";

export interface Statistic extends Document {
    ad: Ad;
    impressions: number;
    clicks: number;
    // Twitter
    follows?: number;
    app_clicks?: number;
    retweets?: number;
    likes?: number;
    replies?: number;
    url_clicks?: number;
}

const StatisticSchema = new Schema({
    ad: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Ad",
    },
    impressions: {
        type: Number,
        required: true,
    },
    clicks: {
        type: Number,
        required: true,
    },
    follows: {
        type: Number,
    },
    app_clicks: {
        type: Number,
    },
    retweets: {
        type: Number,
    },
    likes: {
        type: Number,
    },
    replies: {
        type: Number,
    },
    url_clicks: {
        type: Number,
    },
});

const StatisticMongo: Model<Statistic> = mongoose.model<Statistic>("Statistic", StatisticSchema);
export default StatisticMongo;
