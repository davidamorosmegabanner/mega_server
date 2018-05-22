import {ComputedStats} from "../models/computedStats";
import {NormalizedStats} from "../models/normalizedStats";

export default class Computer {

    public async firstTimer(normalizedStats: NormalizedStats): Promise<ComputedStats> {
        const NUMBER_ADS = normalizedStats.stats.length;
        const computedStats = normalizedStats.stats.map((stat) => {
            return {
                ad: stat.ad,
                weight: 1 / NUMBER_ADS,
            };
        });

        return {
            campaign: normalizedStats.campaign,
            stats: computedStats,
        };
    }
}