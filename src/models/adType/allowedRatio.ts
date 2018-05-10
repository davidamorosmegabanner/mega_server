import {Dimensions} from "./dimensions";

export class AllowedRatio {
    public readonly min: Dimensions;
    public readonly max: Dimensions;
    constructor(
        min: Dimensions,
        max: Dimensions,
    ) {
        this.min = (min);
        this.max = (max);
    }
}
