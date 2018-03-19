import {Model} from "mongoose";
import {default as PlatformMongo, Platform} from "./platform.model";

export class PlatformService {
    private mongoModel: Model<Platform>;

    constructor(mongoModel?: Model<Platform>) {
        this.mongoModel = mongoModel || PlatformMongo;
    }

    public async insert(platforms: Platform[]) {
        platforms.map(async (platform) => {
            const platformMongo = new this.mongoModel({
                name: (platform.name),
                key: (platform.key),
                description: (platform.description),
            });
            platformMongo.save();
        });
    }

    public async drop() {
        await this.mongoModel.remove({});
    }
}
