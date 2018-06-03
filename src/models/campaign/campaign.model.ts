import {Document, Model, Schema} from "mongoose";
import * as mongoose from "mongoose";
import {User} from "../user/user.model";

export interface CampaignModel extends Document {
    _id: string;
    name: string;
    description: string;
    owner: User;
    budget: number;
    dailyBudget: number;
    startDate: Date;
    endDate: Date;
    active: boolean;
    deleted: boolean;
    created: Date;
    updated: Date;
}

const CampaignSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    budget: {
        type: Number,
        required: true,
    },
    dailyBudget: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: false,
    },
    deleted: {
        type: Boolean,
        required: true,
        default: false,
    },
    created: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updated: {
        type: Date,
        required: true,
        default: Date.now,
    },
    socialId: {
        type: String,
        required: false,
    },
});

const CampaignMongo: Model<CampaignModel> = mongoose.model<CampaignModel>("CampaignModel", CampaignSchema);
export default CampaignMongo;
