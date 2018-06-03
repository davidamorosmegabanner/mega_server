import {CampaignModel} from "../../models/campaign/campaign.model";
import {NormalizedUniqueStat} from "./normalizedUniqueStat";

export interface NormalizedStats {
    campaign: CampaignModel;
    stats: NormalizedUniqueStat[];
}
