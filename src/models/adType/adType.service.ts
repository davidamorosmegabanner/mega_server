import {Model} from "mongoose";
import {AdType, default as AdTypeMongo} from "./adType.model";

export class AdTypeService {
    private mongoModel: Model<AdType>;

    constructor(mongoModel?: Model<AdType>) {
        this.mongoModel = mongoModel || AdTypeMongo;
    }

    public async findById(id: string): Promise<AdType> {
        return await this.mongoModel.findById(id);
    }

    public async findByKey(key: string): Promise<AdType> {
        return await this.mongoModel.findOne({key: (key)}).populate("platform");
    }

    public async insertBulk(adTypes: AdType[]) {
        adTypes.map(async (adType) => {
            const adTypeMongo = new this.mongoModel(adType);
            await adTypeMongo.save();
        });
    }
}
