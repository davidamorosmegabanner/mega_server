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

    public async insert(adType: AdType) {
        let insert = new this.mongoModel(adType);
        insert.save().then((err) => {
            console.log(err);
        }).catch((err) => console.error(err));
    }
}
