import {Ad} from "../../models/ad/ad.model";

export interface NormalizedUniqueStat {
    ad: Ad;
    CTR: {
        clicks: number,
        impressions: number,
    };
}
