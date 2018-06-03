import {Campaign} from "../../models/campaign/campaign.model";
import {NormalizedUniqueStat} from "./normalizedUniqueStat";

export interface NormalizedStats {
    campaign: Campaign;
    stats: NormalizedUniqueStat[];
}
