import {Instagram, Platform} from "../platform/platform";
import {AdType} from "./adType";
import {AllowedDimensions} from "./allowedDimensions";
import {AllowedRatio} from "./allowedRatio";
import {Dimensions} from "./dimensions";
import {Duration} from "./duration";
import {NumCreativities} from "./numCreativities";

export class InstagramAdType extends AdType {
    public readonly mimetypes: string[];
    public readonly allowedSize: AllowedDimensions;
    public readonly allowedRatio: AllowedRatio;
    public readonly actions: string[];
    public readonly objectives: string[];
    public readonly duration?: Duration;
    public constructor(
        name: string,
        key: string,
        description: string,
        platform: Platform,
        numCreativities: NumCreativities,
        mimetypes: string[],
        allowedSize: AllowedDimensions,
        allowedRatio: AllowedRatio,
        actions: string[],
        objectives: string[],
        duration?: Duration,
    ) {
        super(name, key, description, platform, numCreativities);
        this.mimetypes = (mimetypes);
        this.allowedSize = allowedSize;
        this.allowedRatio = allowedRatio;
        this.actions = actions;
        this.objectives = objectives;
        this.duration = duration;
    }
}

const InstagramAdTypes: AdType[] = [];

InstagramAdTypes.push(new InstagramAdType(
    "Instagram feed image",
    "IG_IMAGE",
    "Instagram image that appears in the feed",
    Instagram,
    new NumCreativities(1, 1),
    ["image/jpg", "image/png"],
    new AllowedDimensions(new Dimensions(1200, 1200), new Dimensions(2400, 2400)),
    new AllowedRatio(new Dimensions(4, 5), new Dimensions(1.91, 1)),
    ["ACTION1", "ACTION2", "ACTION3"],
    ["OBJECTIVE1", "OBJECTIVE2", "OBJECTIVE3"],
));

InstagramAdTypes.push(new InstagramAdType(
    "Instagram feed video",
    "IG_VIDEO",
    "Instagram video that appears in the feed",
    Instagram,
    new NumCreativities(1, 1),
    ["image/jpg", "image/png"],
    new AllowedDimensions(new Dimensions(1080, 1920), new Dimensions(2400, 2400)),
    new AllowedRatio(new Dimensions(4, 5), new Dimensions(1.91, 1)),
    ["ACTION1", "ACTION2", "ACTION3"],
    ["OBJECTIVE1", "OBJECTIVE2", "OBJECTIVE3"],
    new Duration(1 * 1000, 60 * 1000),
));

InstagramAdTypes.push(new InstagramAdType(
    "Instagram story",
    "IG_STORY",
    "Instagram image or video that appears while viewing stories",
    Instagram,
    new NumCreativities(1, 1),
    ["image/jpg", "image/png", "video/mp4", "video/mov"],
    new AllowedDimensions(new Dimensions(1080, 1920), new Dimensions(1080, 1920)),
    new AllowedRatio(new Dimensions(9, 16), new Dimensions(9, 16)),
    ["ACTION1", "ACTION2", "ACTION3"],
    ["OBJECTIVE1", "OBJECTIVE2", "OBJECTIVE3"],
    new Duration(1 * 1000, 15 * 1000),
));

InstagramAdTypes.push(new InstagramAdType(
    "Instagram carousel of images",
    "IG_CAROUSEL",
    "Instagram set of images or videos that appear in the feed",
    Instagram,
    new NumCreativities(1, 10),
    ["image/jpg", "image/png", "video/mp4", "video/mov"],
    new AllowedDimensions(new Dimensions(1200, 1200), new Dimensions(2400, 2400)),
    new AllowedRatio(new Dimensions(4, 5), new Dimensions(1.91, 1)),
    ["ACTION1", "ACTION2", "ACTION3"],
    ["OBJECTIVE1", "OBJECTIVE2", "OBJECTIVE3"],
    new Duration(1 * 1000, 15 * 1000),
));

export default InstagramAdTypes;
