import {Ad} from "../../models/ad/ad.model";
import {Campaign} from "../../models/campaign/campaign.model";

export interface ComputedUniqueStat {
    ad: Ad;
    weight: number;
}
