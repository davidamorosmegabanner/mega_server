import {Platform} from "../platform/platform";
import {NumCreativities} from "./numCreativities";

export abstract class AdType {
    public readonly name: string;
    public readonly key: string;
    public readonly description: string;
    public readonly platform: Platform;
    public readonly numCreativities: NumCreativities;
    public readonly maxCreativitySize?: number;
    protected constructor(
        name: string,
        key: string,
        description: string,
        platform: Platform,
        numCreativities: NumCreativities,
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
