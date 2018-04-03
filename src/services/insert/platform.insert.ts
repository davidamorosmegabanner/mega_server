import {Platform} from "../../models/platform/platform.model";
import {PlatformService} from "../../models/platform/platform.service";
import PlatformsConfiguration from "../../config/plt/platforms";

const platformService = new PlatformService();

export default class InsertPlatforms {

    public async insert(): Promise<Platform[]> {
        await platformService.drop();

        const facebook: Platform = PlatformsConfiguration.Facebook;
        const instagram: Platform = PlatformsConfiguration.Instagram;
        const youtube: Platform = PlatformsConfiguration.Youtube;
        const linkedin: Platform = PlatformsConfiguration.LinkedIn;
        const twitter: Platform = PlatformsConfiguration.Twitter;


        const platforms: Platform[] = [
            facebook,
            instagram,
            youtube,
            linkedin,
            twitter,
        ];

        return await platformService.insertBulk(platforms);
    }

}
