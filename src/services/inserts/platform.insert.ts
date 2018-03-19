import {Platform} from "../../models/platform/platform.model";
import {PlatformService} from "../../models/platform/platform.service";

const platformService = new PlatformService();

export default class InsertPlatforms {

    public async insert() {
        await platformService.drop();

        const facebook: Platform = {
            name: "Facebook",
            key: "FB",
            description: "Facebook social network",
        };
        const instagram: Platform = {
            name: "Instagram",
            key: "IG",
            description: "Instagram social network",
        };
        const youtube: Platform = {
            name: "Youtube",
            key: "YT",
            description: "Youtube social network",
        };
        const platforms = [facebook, instagram, youtube];

        await platformService.insertBulk(platforms);
    }

}
