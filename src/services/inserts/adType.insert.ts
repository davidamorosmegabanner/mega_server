import {InstagramAdType} from "../../models/adType/instagram/instagram.adType.model";
import {InstagramAdTypeService} from "../../models/adType/instagram/instagram.adType.service";
import {PlatformService} from "../../models/platform/platform.service";

const platformService = new PlatformService();
const instagramAdTypeService = new InstagramAdTypeService();

export default class InsertAdTypes {
    public async insert() {

        await instagramAdTypeService.drop();

        const instagramImage: InstagramAdType = {
            name: "Instagram feed image",
            key: "IG_IMAGE",
            description: "Instagram image that appears in the feed",
            platform: await platformService.getPlatformByKey("IG"),
            mimetypes: ["image/jpg", "image/png"],
            actions: ["ACTION1", "ACTION2", "ACTION3"],
            objectives: ["OBJECTIVE1", "OBJECTIVE2", "OBJECTIVE3"],
            numCreativities: {
                min: 1,
                max: 1,
            },
            allowedSize: {
                min: {
                    width: 1200,
                    height: 1200,
                },
                max: {
                    width: 2400,
                    height: 2400,
                },
            },
            allowedRatio: {
                min: {
                    width: 4,
                    height: 5,
                },
                max: {
                    width: 1.91,
                    height: 1,
                },
            },
        };

        const instagramVideo: InstagramAdType = {
            name: "Instagram feed video",
            key: "IG_VIDEO",
            description: "Instagram video that appears in the feed",
            platform: await platformService.getPlatformByKey("IG"),
            mimetypes: ["video/mp4", "video/mov"],
            actions: ["ACTION1", "ACTION2", "ACTION3"],
            objectives: ["OBJECTIVE1", "OBJECTIVE2", "OBJECTIVE3"],
            numCreativities: {
                min: 1,
                max: 1,
            },
            allowedSize: {
                min: {
                    width: 1080,
                    height: 1920,
                },
                max: {
                    width: 2400,
                    height: 2400,
                },
            },
            allowedRatio: {
                min: {
                    width: 4,
                    height: 5,
                },
                max: {
                    width: 1.91,
                    height: 1,
                },
            },
            duration: {
                min: 1 * 1000,
                max: 60 * 1000,
            },
        };

        const instagramStory: InstagramAdType = {
            name: "Instagram story",
            key: "IG_STORY",
            description: "Instagram image that appears while viewing stories",
            platform: await platformService.getPlatformByKey("IG"),
            mimetypes: ["image/jpg", "image/png", "video/mp4", "video/mov"],
            actions: ["ACTION1", "ACTION2", "ACTION3"],
            objectives: ["OBJECTIVE1", "OBJECTIVE2", "OBJECTIVE3"],
            numCreativities: {
                min: 1,
                max: 1,
            },
            allowedSize: {
                min: {
                    width: 1080,
                    height: 1920,
                },
                max: {
                    width: 1080,
                    height: 1920,
                },
            },
            allowedRatio: {
                min: {
                    width: 9,
                    height: 16,
                },
                max: {
                    width: 9,
                    height: 16,
                },
            },
            duration: {
                min: 1 * 1000,
                max: 15 * 1000,
            },
        };

        const instagramCarousel: InstagramAdType = {
            name: "Instagram carousel of images",
            key: "IG_CAROUSEL",
            description: "Instagram set of images that appear in the feed",
            platform: await platformService.getPlatformByKey("IG"),
            mimetypes: ["image/jpg", "image/png", "video/mp4", "video/mov"],
            actions: ["ACTION1", "ACTION2", "ACTION3"],
            objectives: ["OBJECTIVE1", "OBJECTIVE2", "OBJECTIVE3"],
            numCreativities: {
                min: 1,
                max: 10,
            },
            allowedSize: {
                min: {
                    width: 1200,
                    height: 1200,
                },
                max: {
                    width: 2400,
                    height: 2400,
                },
            },
            allowedRatio: {
                min: {
                    width: 4,
                    height: 5,
                },
                max: {
                    width: 1.91,
                    height: 1,
                },
            },
        };

        const instagramAdTypes: InstagramAdType[] = [
            instagramImage,
            instagramVideo,
            instagramStory,
            instagramCarousel,
        ];

        await instagramAdTypeService.insertBulk(instagramAdTypes);
    }

}
