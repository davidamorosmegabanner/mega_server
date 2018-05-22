import {Model} from "mongoose";
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

    public async get(startDate: Date, endDate: Date): Promise<Stats[]> {
        return await this.mongoModel
            .find({date: {$gte: startDate, $lt: endDate}});
    }
}
