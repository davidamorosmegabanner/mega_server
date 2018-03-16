import {Model, Schema, Document} from "mongoose";
import * as mongoose from "mongoose";

export interface Campaign extends Document {
    _id: string;
    name: string;
    owner: string;
    ads: Array<string>;
    budget: number;
    dailyBudget: number;
    startDate: Date;
    endDate: Date;
    active: boolean;
    deleted: boolean;
    created: Date;
    updated: Date;
}

let CampaignSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId, 
        required: true,
        ref: 'User'
    },
    ads: [{
        type: Schema.Types.ObjectId, 
        ref: 'Ad'
    }],
    budget: {
        type: Number, 
        required: true 
    },
    dailyBudget: { 
        type: Number, 
        required: true 
    },
    startDate: { 
        type: Date, 
        required: true 
    },
    endDate: { 
        type: Date, 
        required: true 
    },
    active: { 
        type: Boolean, 
        required: true, 
        default: true 
    },
    deleted: { 
        type: Boolean, 
        required: true, 
        default: false 
    },
    created: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    updated: { 
        type: Date, 
        required: true, 
        default: Date.now 
    }
});


const CampaignMongo: Model<Campaign> = mongoose.model<Campaign>('Campaign', CampaignSchema);
export default CampaignMongo;
