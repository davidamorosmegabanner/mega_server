import {AdTypeService} from "../../models/adType/adType.service";
import {PlatformService} from "../../models/platform/platform.service";
import {InstagramAdType} from "../../models/adType/instagram/instagramAdType.model";
import {NumCreativities} from "../../models/adType/adType.model";
import {InstagramAdTypeService} from "../../models/adType/instagram/instagramAdType.Service";

const platformService = new PlatformService();
const instgramAdTypeService = new InstagramAdTypeService();

export default class insertAdTypes {
    public async insert() {

        await instgramAdTypeService.drop();

        const instagramImage: InstagramAdType = {
            name: "Instagram feed image",
            key: "IG_feed",
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
            allowedRelation: {
                min: {
                    width: 1,
                    height: 1,
                },
                max: {
                    width: 1,
                    height: 1,
                },
            },
        };

        const instagramVideo: InstagramAdType = {
            name: "Instagram feed video",
            key: "IG_feed",
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
                    width: 1200,
                    height: 1200,
                },
                max: {
                    width: 2400,
                    height: 2400,
                },
            },
            allowedRelation: {
                min: {
                    width: 1,
                    height: 1,
                },
                max: {
                    width: 1,
                    height: 1,
                },
            },
        };

        const instagramStory: InstagramAdType = {
            name: "Instagram story",
            key: "IG_story",
            description: "Instagram image that appears while viewing stories",
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
            allowedRelation: {
                min: {
                    width: 1,
                    height: 1,
                },
                max: {
                    width: 1,
                    height: 1,
                },
            },
        };

        const instagramSetOfImages: InstagramAdType = {
            name: "Instagram set of images",
            key: "IG_set",
            description: "Instagram set of images that appear in the feed",
            platform: await platformService.getPlatformByKey("IG"),
            mimetypes: ["image/jpg", "image/png"],
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
            allowedRelation: {
                min: {
                    width: 1,
                    height: 1,
                },
                max: {
                    width: 1,
                    height: 1,
                },
            },
        };

        const instagramAdTypes: InstagramAdType[] = [
            instagramImage,
            instagramVideo,
            instagramStory,
            instagramSetOfImages,
        ];

        await instgramAdTypeService.insertBulk(instagramAdTypes);
    }

}
