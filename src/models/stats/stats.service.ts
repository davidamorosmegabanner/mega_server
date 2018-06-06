import {Model} from "mongoose";
import {Campaign} from "../campaign/campaign.model";
import {default as StatsMongo, Stats} from "./stats.model";
import {DummyStats} from "../../dummy/models/dummyStats.model";

export class StatsService {
    private readonly mongoModel: Model<Stats>;

    constructor(mongoModel?: Model<Stats>) {
        this.mongoModel = mongoModel || StatsMongo;
    }

    public async create(stats): Promise<Stats> {
        const statsMongo = new this.mongoModel(stats);
        return await statsMongo.save();
    }

    public async get(startDate: Date, endDate: Date, campaign?: Campaign): Promise<Stats[]> {
        const find: any = {
            date: {
                $gte: startDate,
                $lt: endDate,
            },
            computed: false,
        };
        if (campaign) { find.campaign = campaign; }

        return await this.mongoModel
            .find(find);
    }

    public async changeToComputed(statsArray: Stats[]): Promise<any> {
        const changed = statsArray.map(async (stats) => {
            return await this.mongoModel.findOneAndUpdate({
                campaign: stats.campaign,
                computed: stats.computed,
                date: stats.date,
            }, {
                $set: { computed: true },
            });
        });
        return Promise.all(changed).then((stats) => stats);
    }
}
