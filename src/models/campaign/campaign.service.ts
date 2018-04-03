import {Model} from "mongoose";
import {Ad} from "../ad/ad.model";
import {User} from "../user/user.model";
import {Campaign, default as CampaignMongo} from "./campaign.model";

export class CampaignService {
    private readonly mongoModel: Model<Campaign>;

    constructor(mongoModel?: Model<Campaign>) {
        this.mongoModel = mongoModel || CampaignMongo;
    }

    public async create(name: string, description: string, owner: User, ads: Ad[], dailyBudget: number, startDate: Date, endDate: Date) {
        const campaign = new this.mongoModel({
            name: (name),
            owner: (owner),
            ads: (ads),
            budget: 0,
            dailyBudget: (dailyBudget),
            startDate: (startDate),
            endDate: (endDate),
        });

        if (description.length > 0) { campaign.description = (description); }

        return await campaign.save();
    }
}
