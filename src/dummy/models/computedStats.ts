import {CampaignModel} from "../../models/campaign/campaign.model";
import {ComputedUniqueStat} from "./computedUniqueStat";

export interface ComputedStats {
    campaign: CampaignModel;
    stats: ComputedUniqueStat[];
}
