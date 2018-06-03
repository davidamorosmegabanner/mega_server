import {Campaign} from "../../models/campaign/campaign.model";
import {ComputedUniqueStat} from "./computedUniqueStat";

export interface ComputedStats {
    campaign: Campaign;
    stats: ComputedUniqueStat[];
}
