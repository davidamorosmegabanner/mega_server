import {Ad} from "../../models/ad/ad.model";
import {Campaign} from "../../models/campaign/campaign.model";

export interface ComputedStats {
    campaign: Campaign;
    stats: Array<{
        ad: Ad;
        weight: number;
    }>;
}
