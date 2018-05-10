import {AdType} from "./adType";
import {default as InstagramAdTypes} from "./instagramAdType";
import {default as TwitterAdTypes} from "./twitterAdType";

export class AdTypeService {

    public adTypes: AdType[] = [];

    constructor() {

        // Twitter
        for (const pushing of TwitterAdTypes) { this.adTypes.push(pushing); }
        // Instagram
        for (const pushing of InstagramAdTypes) { this.adTypes.push(pushing); }

    }

    public async assignByKey(adTypeKey): Promise<AdType> {

        const assigned: AdType = this.adTypes.find((adType) => {
            return adType.key === adTypeKey;
        });

        if (assigned && typeof assigned === "object") {
            return assigned;
        } else {
            throw new Error("No adType found matching the one specified!");
        }
    }

    public assignTwitterParams(params) {
        return {
            text: params.text,
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
