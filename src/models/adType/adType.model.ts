import {PlatformModel} from "../platform/platform.model";
import {NumCreativitiesModel} from "./numCreativities.model";

export abstract class AdTypeModel {
    public readonly name: string;
    public readonly key: string;
    public readonly description: string;
    public readonly platform: PlatformModel;
    public readonly numCreativities: NumCreativitiesModel;
    public readonly maxCreativitySize?: number;
    protected constructor(
        name: string,
        key: string,
        description: string,
        platform: PlatformModel,
        numCreativities: NumCreativitiesModel,
        maxCreativitySize?: number,
    ) {
        this.name = (name);
        this.key = (key);
        this.description = (description);
        this.platform = (platform);
        this.numCreativities = (numCreativities);
        this.maxCreativitySize = (maxCreativitySize);
    }
}
