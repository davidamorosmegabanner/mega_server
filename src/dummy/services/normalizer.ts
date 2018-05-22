import {Stats} from "../../models/stats/stats.model";
import {NormalizedStats} from "../models/normalizedStats";

export default class Normalizer {

    public async normalize(stats: Stats[]): Promise<NormalizedStats[]> {

        const normalizedStats: NormalizedStats[] = [];

        await Promise.all(stats.map(async (stat) => {
            await Promise.all(stat.statistics.map(async (statistic) => {
                let CTR = {
                    clicks: statistic.clicks,
                    impressions: statistic.impressions,
                };

                // Other properties to be interpreted as clicks
                if (statistic.app_clicks) { CTR = {clicks: statistic.app_clicks, impressions: statistic.impressions}; }

                // Find if normalizedStat already exist
                const NORMALIZED = normalizedStats.find((normalized) => normalized.campaign === stat.campaign);

                // Exists
                if (NORMALIZED && NORMALIZED !== undefined) {
                    normalizedStats.find((normalized) => normalized.campaign === stat.campaign).CTR = {
                        clicks: NORMALIZED.CTR.clicks + CTR.clicks,
                        impressions: NORMALIZED.CTR.impressions + CTR.impressions,
                    };
                // Doesn't exists, create new
                } else {
                    normalizedStats.push({
                        campaign: stat.campaign,
                        ad: statistic.ad,
                        CTR: {
                            clicks: CTR.clicks,
                            impressions: CTR.impressions,
                        },
                    });
                }
            }));
        }));

        return normalizedStats;
    }
}
