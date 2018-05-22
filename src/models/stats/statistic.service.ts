import {Model} from "mongoose";
import {default as StatisticMongo, Statistic} from "./statistic.model";

export class StatisticService {
    private readonly mongoModel: Model<Statistic>;

    constructor(mongoModel?: Model<Statistic>) {
        this.mongoModel = mongoModel || StatisticMongo;
    }

    public async create(statistic): Promise<Statistic> {
        const statisticMongo = new this.mongoModel(statistic);
        return await statisticMongo.save();
    }
}
