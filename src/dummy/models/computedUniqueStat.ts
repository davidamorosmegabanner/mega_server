import {AdModel} from "../../models/ad/ad.model";
import {CampaignModel} from "../../models/campaign/campaign.model";

export interface ComputedUniqueStat {
    ad: AdModel;
    // CTR: number;
    weight: number;
}
