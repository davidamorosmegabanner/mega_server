import {Instagram, PlatformModel} from "../platform/platform.model";
import {AdType} from "./adType.model";
import {AllowedDimensionsModel} from "./allowedDimensions.model";
import {AllowedRatioModel} from "./allowedRatio.model";
import {DimensionsModel} from "./dimensions.model";
import {AllowedDurationModel} from "./allowedDuration.model";
import {NumCreativitiesModel} from "./numCreativities.model";

export class InstagramAdTypeModel extends AdType {
    public readonly mimetypes: string[];
    public readonly allowedDimensions: AllowedDimensionsModel;
    public readonly allowedRatio: AllowedRatioModel;
    public readonly actions: string[];
    public readonly objectives: string[];
    public readonly allowedDuration?: AllowedDurationModel;
    public constructor(
        name: string,
        key: string,
        description: string,
        platform: PlatformModel,
        numCreativities: NumCreativitiesModel,
        mimetypes: string[],
        allowedDimensions: AllowedDimensionsModel,
        allowedRatio: AllowedRatioModel,
        actions: string[],
        objectives: string[],
        allowedDuration?: AllowedDurationModel,
    ) {
        super(name, key, description, platform, numCreativities);
        this.mimetypes = (mimetypes);
        this.allowedDimensions = allowedDimensions;
        this.allowedRatio = allowedRatio;
        this.actions = actions;
        this.objectives = objectives;
        this.allowedDuration = allowedDuration;
    }
}

const InstagramAdTypes: AdType[] = [];

InstagramAdTypes.push(new InstagramAdTypeModel(
    "Instagram feed image",
    "IG_IMAGE",
    "Instagram image that appears in the feed",
    Instagram,
    new NumCreativitiesModel(1, 1),
    ["image/jpg", "image/png"],
    new AllowedDimensionsModel(new DimensionsModel(1200, 1200), new DimensionsModel(2400, 2400)),
    new AllowedRatioModel(new DimensionsModel(4, 5), new DimensionsModel(1.91, 1)),
    ["ACTION1", "ACTION2", "ACTION3"],
    ["OBJECTIVE1", "OBJECTIVE2", "OBJECTIVE3"],
));

InstagramAdTypes.push(new InstagramAdTypeModel(
    "Instagram feed video",
    "IG_VIDEO",
    "Instagram video that appears in the feed",
    Instagram,
    new NumCreativitiesModel(1, 1),
    ["image/jpg", "image/png"],
    new AllowedDimensionsModel(new DimensionsModel(1080, 1920), new DimensionsModel(2400, 2400)),
    new AllowedRatioModel(new DimensionsModel(4, 5), new DimensionsModel(1.91, 1)),
    ["ACTION1", "ACTION2", "ACTION3"],
    ["OBJECTIVE1", "OBJECTIVE2", "OBJECTIVE3"],
    new AllowedDurationModel(1 * 1000, 60 * 1000),
));

InstagramAdTypes.push(new InstagramAdTypeModel(
    "Instagram story",
    "IG_STORY",
    "Instagram image or video that appears while viewing stories",
    Instagram,
    new NumCreativitiesModel(1, 1),
    ["image/jpg", "image/png", "video/mp4", "video/mov"],
    new AllowedDimensionsModel(new DimensionsModel(1080, 1920), new DimensionsModel(1080, 1920)),
    new AllowedRatioModel(new DimensionsModel(9, 16), new DimensionsModel(9, 16)),
    ["ACTION1", "ACTION2", "ACTION3"],
    ["OBJECTIVE1", "OBJECTIVE2", "OBJECTIVE3"],
    new AllowedDurationModel(1 * 1000, 15 * 1000),
));

InstagramAdTypes.push(new InstagramAdTypeModel(
    "Instagram carousel of images",
    "IG_CAROUSEL",
    "Instagram set of images or videos that appear in the feed",
    Instagram,
    new NumCreativitiesModel(1, 10),
    ["image/jpg", "image/png", "video/mp4", "video/mov"],
    new AllowedDimensionsModel(new DimensionsModel(1200, 1200), new DimensionsModel(2400, 2400)),
    new AllowedRatioModel(new DimensionsModel(4, 5), new DimensionsModel(1.91, 1)),
    ["ACTION1", "ACTION2", "ACTION3"],
    ["OBJECTIVE1", "OBJECTIVE2", "OBJECTIVE3"],
    new AllowedDurationModel(1 * 1000, 15 * 1000),
));

export default InstagramAdTypes;
