import InstagramConfiguration from "../../config/seeds/instagramAdType.seed";
import TwitterConfiguration from "../../config/seeds/twitterAdType.seed";
import {AdType} from "../../models/adType/adType.model";
import {InstagramAdType} from "../../models/adType/instagramAdType.model";
import {InstagramAdTypeService} from "../../models/adType/instagramAdType.service";
import {TwitterAdType} from "../../models/adType/twitterAdType.model";
import {TwitterAdTypeService} from "../../models/adType/twitterAdType.service";
import {PlatformService} from "../../models/platform/platform.service";

const instagramAdTypeService = new InstagramAdTypeService();
const twitterAdTypeService = new TwitterAdTypeService();
const platformService = new PlatformService();

export default class InsertAdTypes {
    public async insert(): Promise<boolean> {

        try {

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
            await instagramAdTypeService.insertBulk(instagramAdTypes);

            // ******** TWITTER ********
            const twitterImage: TwitterAdType = TwitterConfiguration.TwitterImages;

            // Getting seeds param in mongo
            twitterImage.platform = await platformService.getPlatformByKey(twitterImage.platform.key);

            const twitterAdTypes: TwitterAdType[] = [
                twitterImage,
            ];
            await twitterAdTypeService.insertBulk(twitterAdTypes);

            return true;

        } catch (err) {
            throw new Error(err);
        }

    }
}
