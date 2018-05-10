import {Dimensions} from "./dimensions";

export class AllowedDimensions {
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
