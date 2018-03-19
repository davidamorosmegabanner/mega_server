import {Model} from "mongoose";
import {AdType, default as AdTypeMongo} from "./adType.model";
import {Platform} from "../platform/platform.model";

export class AdTypeService {
    private mongoModel: Model<AdType>;

    constructor(mongoModel?: Model<AdType>) {
        this.mongoModel = mongoModel || AdTypeMongo;
    }

    public async drop(): Promise<AdType[]> {
        return await this.mongoModel.remove({});
    }

    public async insertBulk(adTypes: AdType[]) {
        adTypes.map(async (adType) => {
            const adTypeMongo = new this.mongoModel(adType);
            adTypeMongo.save();
        });
    }

    public async list(): Promise<Platform[]> {
        return await this.mongoModel.find();
    }
}