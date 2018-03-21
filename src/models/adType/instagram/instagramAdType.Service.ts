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
        instagramAdTypes.map(async (instagramAdTypes) => {
            const instgaramAdTypeMongo = new this.mongoModel(instagramAdTypes);
            instgaramAdTypeMongo.save();
        });
    }
}
