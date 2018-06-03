import {Model} from "mongoose";
import {default as DummyStatsMongo, DummyStats} from "./stats.model";

export class DummyStatsService {
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

    public async getUnpublished(): Promise<DummyStats[]> {
        return await this.mongoModel
            .find({published: false})
            .populate("campaign", "ad")
            .lean();
    }

    public async changeToPublished(stat: DummyStats): Promise<DummyStats> {
        return await this.mongoModel.findOneAndUpdate({
            date: stat.date,
            published: stat.published,
        }, {
            $set: { published: true },
        });
    }
}
