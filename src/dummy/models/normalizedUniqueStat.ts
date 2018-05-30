import {Ad} from "../../models/ad/ad.model";
import {Campaign} from "../../models/campaign/campaign.model";

export interface NormalizedUniqueStat {
    ad: Ad;
    CTR: {
        clicks: number,
        impressions: number,
    };
}
