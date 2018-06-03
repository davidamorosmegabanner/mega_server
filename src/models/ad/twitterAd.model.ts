import {Model, Schema} from "mongoose";
import {AdModel, default as AdMongo} from "./ad.model";

export interface TwitterAdModel extends AdModel {
    twitterCampaign: string;
    text?: string;
    url?: string;
    androidAppId?: string;
    androidAppDeepLink?: string;
    iPhoneAppId?: string;
    iPhoneAppDeepLink?: string;
    iPadAppId?: string;
    iPadAppDeepLink?: string;
}

const TwitterAdSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
    androidAppId: {
        type: String,
    },
    androidAppDeepLink: {
        type: String,
    },
    iPhoneAppId: {
        type: String,
    },
    iPhoneAppDeepLink: {
        type: String,
    },
    iPadAppId: {
        type: String,
    },
    iPadAppDeepLink: {
        type: String,
    },
});

const TwitterAdMongo: Model<TwitterAdModel> =
    AdMongo.discriminator("TwitterAdModel", TwitterAdSchema);
export default TwitterAdMongo;
