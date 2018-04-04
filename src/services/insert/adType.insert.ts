import InstagramConfiguration from "../../config/seeds/instagram";
import {AdType} from "../../models/adType/adType.model";
import {InstagramAdType} from "../../models/adType/instagram/instagram.adType.model";
import {InstagramAdTypeService} from "../../models/adType/instagram/instagram.adType.service";
import {PlatformService} from "../../models/platform/platform.service";

const instagramAdTypeService = new InstagramAdTypeService();
const platformService = new PlatformService();

export default class InsertAdTypes {
    public async insert(): Promise<AdType[]> {

        // ******** INSTAGRAM ********
        const instagramImage: InstagramAdType = InstagramConfiguration.InstagramImage;
        const instagramVideo: InstagramAdType = InstagramConfiguration.InstagramVideo;
        const instagramStory: InstagramAdType = InstagramConfiguration.InstagramStory;
        const instagramCarousel: InstagramAdType = InstagramConfiguration.InstagramCarousel;

        // Getting seeds param in mongo
        instagramImage.platform = await platformService.getPlatformByKey(instagramImage.platform.key);
        instagramVideo.platform = await platformService.getPlatformByKey(instagramVideo.platform.key);
        instagramStory.platform = await platformService.getPlatformByKey(instagramStory.platform.key);
        instagramCarousel.platform = await platformService.getPlatformByKey(instagramCarousel.platform.key);

        const instagramAdTypes: InstagramAdType[] = [
            instagramImage,
            instagramVideo,
            instagramStory,
            instagramCarousel,
        ];

        return await instagramAdTypeService.insertBulk(instagramAdTypes);
    }
}
