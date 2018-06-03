import {AdModel} from "../../models/ad/ad.model";

export interface NormalizedUniqueStat {
    ad: AdModel;
    CTR: {
        clicks: number,
        impressions: number,
    };
}
