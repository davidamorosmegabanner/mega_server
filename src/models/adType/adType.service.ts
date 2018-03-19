import {Model} from "mongoose";
import {AdType, default as AdTypeMongo, Size} from "./adType.model";

export class CreativityService {
    private mongoModel: Model<AdType>;

    constructor(mongoModel?: Model<AdType>) {
        this.mongoModel = mongoModel || AdTypeMongo;
    }

    public async drop(): Promise<AdType[]> {
        return await this.mongoModel.drop();
    }

    public async insert(adTypes: AdType[]): Promise<void> {
        await adTypes.map(async (adType) => {
            const adTypeInsert = this.mongoModel.insert(adType);
        });
    }
}