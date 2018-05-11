import {Model, Schema} from "mongoose";
import {Ad, default as AdMongo} from "./ad.model";

export interface TwitterAd extends Ad {
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

const TwitterAdMongo: Model<TwitterAd> =
    AdMongo.discriminator("TwitterAd", TwitterAdSchema);
export default TwitterAdMongo;
