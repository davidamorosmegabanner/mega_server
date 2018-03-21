import {Model} from "mongoose";
import {AdType, default as AdTypeMongo} from "./adType.model";
import {Creativity} from "../creativity/creativity.model";

export class AdTypeService {
    private mongoModel: Model<AdType>;

    constructor(mongoModel?: Model<AdType>) {
        this.mongoModel = mongoModel || AdTypeMongo;
    }

    public async findById(id: string): Promise<AdType> {
        return await this.mongoModel.findById(id);
    }

    public async findByKey(key: string): Promise<AdType> {
        return await this.mongoModel.findOne({key: key});
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
}
