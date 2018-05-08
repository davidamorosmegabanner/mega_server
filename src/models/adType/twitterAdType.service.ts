import {Model} from "mongoose";
import {Platform} from "../platform/platform.model";
import {AdType} from "./adType.model";
import {default as TwitterAdTypeMongo, TwitterAdType} from "./twitterAdType.model";

export class TwitterAdTypeService {
    private mongoModel: Model<TwitterAdType>;

    constructor(mongoModel?: Model<TwitterAdType>) {
        this.mongoModel = mongoModel || TwitterAdTypeMongo;
    }

    public async drop(): Promise<TwitterAdType[]> {
        return await this.mongoModel.remove({});
    }

    public async insertBulk(twitterAdTypes: TwitterAdType[]): Promise<any> {
        const twitterAdTypesInserted: Array< Promise<Platform> > = twitterAdTypes.map(async (adType) => {
            return await this.mongoModel.findOneAndUpdate({key: adType.key}, {$set: adType}, {upsert: true});
        });
        Promise.all(twitterAdTypesInserted).then((twitterAdTypesPromise) => {
            return twitterAdTypesPromise;
        });
    }

    public async findByAdType(id: AdType): Promise<TwitterAdType> {
        return await this.mongoModel.findById(id);
    }

    public async assignTwitterParams(params) {
        return {
            tweet: params.tweet,
            webpage: params.webpage,
            androidAppId: params.androidAppId,
            androidDeepLink: params.androidDeepLink,
            iPhoneAppId: params.iPhoneAppId,
            iPhoneDeepLink: params.iPhoneDeepLink,
            iPadAppId: params.iPadAppId,
            iPadDeepLink: params.iPadDeepLink,
        };
    }
}
