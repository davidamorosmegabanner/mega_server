import {AdType} from "../../models/adType/adType.model";
import {AdTypeService} from "../../models/adType/adType.service";
import {PlatformService} from "../../models/platform/platform.service";

const platformService = new PlatformService();
const adTypeService = new AdTypeService();

export default class insertAdTypes {
    public async insert() {

        await adTypeService.drop();

        const instagramImage: AdType = {
            name: "Instagram feed image",
            key: "IG_feed",
            description: "Instgaram image that appears in the feed",
            platform: await platformService.getPlatformByKey("IG"),
            creativities: {
                min: 1,
                max: 1,
                size: {
                    width: 1200,
                    height: 1200,
                },
                type: "image",
            },
        };

        const instagramVideo: AdType = {
            name: "Instagram feed video",
            key: "IG_feed",
            description: "Instagram video that appears in the feed",
            platform: await platformService.getPlatformByKey("IG"),
            creativities: {
                min: 1,
                max: 1,
                size: {
                    width: 1200,
                    height: 1200,
                },
                type: "image",
            },
        };

        const instagramStory: AdType = {
            name: "Instagram story",
            key: "IG_story",
            description: "Instagram image that appears while viewing stories",
            platform: await platformService.getPlatformByKey("IG"),
            creativities: {
                min: 1,
                max: 1,
                size: {
                    width: 628,
                    height: 1200,
                },
                type: "image",
            },
        };

        const instagramSetOfImages: AdType = {
            name: "Instagram set of images",
            key: "IG_set",
            description: "Instagram set of images that appear in the feed",
            platform: await platformService.getPlatformByKey("IG"),
            creativities: {
                min: 1,
                max: 10,
                size: {
                    width: 628,
                    height: 1200,
                },
                type: "image",
            },
        };

        const adTypes: AdType[] = [
            instagramImage,
            instagramVideo,
            instagramStory,
            instagramSetOfImages,
        ];

        await adTypeService.insertBulk(adTypes);
    }

}
