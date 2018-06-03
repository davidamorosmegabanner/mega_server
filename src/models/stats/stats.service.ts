import {Model} from "mongoose";
import {CampaignModel} from "../campaign/campaign.model";
import {default as StatsMongo, Stats} from "./stats.model";

export class StatsService {
    private readonly mongoModel: Model<Stats>;

    constructor(mongoModel?: Model<Stats>) {
        this.mongoModel = mongoModel || StatsMongo;
    }

    public async create(stats): Promise<Stats> {
        const statsMongo = new this.mongoModel(stats);
        return await statsMongo.save();
    }

    public async get(startDate: Date, endDate: Date, campaign?: CampaignModel): Promise<Stats[]> {
        const find: any = {
            date: {
                $gte: startDate,
                $lt: endDate,
            },
        };
        if (campaign) { find.campaign = campaign; }

        return await this.mongoModel
            .find(find);
    }
}
