import {DimensionsModel} from "./dimensions.model";

export class AllowedDimensions {
    public readonly min: DimensionsModel;
    public readonly max: DimensionsModel;
    constructor(
        min: DimensionsModel,
        max: DimensionsModel,
    ) {
        this.min = (min);
        this.max = (max);
    }
}
