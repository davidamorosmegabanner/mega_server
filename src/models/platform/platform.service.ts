import {Model} from "mongoose";
import {default as PlatformMongo, Platform} from "./platform.model";

export class PlatformService {
    private mongoModel: Model<Platform>;

    constructor(mongoModel?: Model<Platform>) {
        this.mongoModel = mongoModel || PlatformMongo;
    }

    public async insertBulk(platforms: Platform[]) {
        platforms.map(async (platform) => {
            const platformMongo = new this.mongoModel(platform);
            platformMongo.save();
        });
    }

    public async drop() {
        await this.mongoModel.remove({});
    }

    public async list(): Promise<Platform[]> {
        return await this.mongoModel.find();
    }

    public async getPlatformByKey(platformKey: string): Promise<Platform> {
        return await this.mongoModel.findOne({ key: platformKey });
    }

}
