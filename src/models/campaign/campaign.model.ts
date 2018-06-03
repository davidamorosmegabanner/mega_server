import {Document, Model, Schema} from "mongoose";
import * as mongoose from "mongoose";
import {User} from "../user/user.model";
import {Targeting} from "./targeting.model";
import {Category} from "./category.model";
import {SubCategory} from "./subCategory.model";

export interface Campaign extends Document {
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
    targeting?: Targeting;
    category?: Category;
    subCategory?: SubCategory;
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
    targeting: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Targeting",
    },
    category: {
        type: String,
    },
    subCategory: {
        type: String,
    }
});

const CampaignMongo: Model<Campaign> = mongoose.model<Campaign>("Campaign", CampaignSchema);
export default CampaignMongo;
