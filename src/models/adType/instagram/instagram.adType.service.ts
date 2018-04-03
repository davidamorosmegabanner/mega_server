import {Model} from "mongoose";
import {AdType} from "../adType.model";
import {default as InstagramAdTypeMongo, InstagramAdType} from "./instagram.adType.model";
import {Platform} from "../../platform/platform.model";

export class InstagramAdTypeService {
    private mongoModel: Model<InstagramAdType>;

    constructor(mongoModel?: Model<InstagramAdType>) {
        this.mongoModel = mongoModel || InstagramAdTypeMongo;
    }

    public async drop(): Promise<InstagramAdType[]> {
        return await this.mongoModel.remove({});
    }

    public async insertBulk(instagramAdTypes: InstagramAdType[]): Promise<any> {
        const instagramAdTypesInserted: Array< Promise<Platform> > = instagramAdTypes.map(async (platform) => {
            const platformMongo = new this.mongoModel(platform);
            return await platformMongo.save();
        });
        Promise.all(instagramAdTypesInserted).then((instagramAdTypesPromise) =>{
            return instagramAdTypesPromise;
        });
    }

    public async findByAdType(id: AdType): Promise<InstagramAdType> {
        return await this.mongoModel.findById(id);
    }
}
