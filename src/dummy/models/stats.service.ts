import {Model} from "mongoose";
import {default as DummyStatsMongo, DummyStats} from "./stats.model";

export class StatsService {
    private readonly mongoModel: Model<DummyStats>;

    constructor(mongoModel?: Model<DummyStats>) {
        this.mongoModel = mongoModel || DummyStatsMongo;
    }

    public async create(stats: DummyStats): Promise<DummyStats> {
        const statsMongo = new this.mongoModel(stats);
        return await statsMongo.save();
    }

    public async get(startDate: Date, endDate: Date): Promise<DummyStats[]> {
        return await this.mongoModel
            .find({date: {$gte: startDate, $lt: endDate}});
    }
}
