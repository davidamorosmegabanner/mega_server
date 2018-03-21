import {Model} from "mongoose";
import {default as InstagramAdTypeMongo, InstagramAdType} from "./instagramAdType.model";

export class InstagramAdTypeService {
    private mongoModel: Model<InstagramAdType>;

    constructor(mongoModel?: Model<InstagramAdType>) {
        this.mongoModel = mongoModel || InstagramAdTypeMongo;
    }

    public async drop(): Promise<InstagramAdType[]> {
        return await this.mongoModel.remove({});
    }

    public async insertBulk(instagramAdTypes: InstagramAdType[]) {
        instagramAdTypes.map(async (instagramAdType) => {
            const instagramAdTypeMongo = new this.mongoModel(instagramAdType);
            instagramAdTypeMongo.save();
        });
    }
}
