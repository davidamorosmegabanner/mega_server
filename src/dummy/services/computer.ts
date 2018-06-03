import * as path from "path";
import * as PythonShell from "python-shell";

import {AdService} from "../../models/ad/ad.service";
import {Campaign} from "../../models/campaign/campaign.model";
import {ComputedStats} from "../models/computedStats";
import {ComputedUniqueStat} from "../models/computedUniqueStat";
import {NormalizedStats} from "../models/normalizedStats";
import {NormalizedUniqueStat} from "../models/normalizedUniqueStat";
import {DummyStats} from "../models/stats.model";
import {DummyStatsService} from "../models/stats.service";

const adService = new AdService();
const statsService = new DummyStatsService();

export default class ComputerService {

    public async firstTimer(campaign: Campaign): Promise<ComputedStats> {

        const ads = await adService.getCampaignAds(campaign);

        const NUMBER_ADS = ads.length;
        const computed = ads.map((ad) => {
            return {
                ad: (ad),
                weight: 1 / NUMBER_ADS,
            };
        });

        return {
            campaign: (campaign),
            stats: computed,
        };
    }

    public async compute(newStats: NormalizedStats, oldStats: NormalizedStats[]): Promise<ComputedStats> {
        // Make array for new stats
        const newStatsArray: NormalizedUniqueStat[] = [];
        newStats.stats.forEach((newStatsStat) => {
            newStatsArray.push({
                ad: newStatsStat.ad,
                CTR: newStatsStat.CTR,
            });
        });

        // Make array for old stats
        const oldStatsCTR: NormalizedUniqueStat[] = [];
        oldStats.forEach((oldStat) => {
            oldStat.stats.forEach((oldStatsStat) => {
                oldStatsCTR.push({
                    ad: oldStatsStat.ad,
                    CTR: {
                        clicks: oldStatsStat.CTR.clicks,
                        impressions: oldStatsStat.CTR.impressions,
                    },
                });
            });
        });

        // Make array for computed stats
        // And then iterate over every array (ad) to get its posterior CTR
        const computedArray: ComputedStats = {
            campaign: (newStats.campaign),
            stats: [],
        };
        await Promise.all(newStatsArray.map(async (newStat) => {
            const ad = newStat.ad;
            const oldCTRs: number[] = oldStatsCTR.map((oldStat) => {
                if (oldStat.ad === ad) { return oldStat.CTR.clicks / oldStat.CTR.impressions; }
            });

            // Call python script to getUserAds most plausible CTR
            const mostPlausibleCTR: number = await this.runPythonScript(
                newStat.CTR.clicks, newStat.CTR.impressions, oldCTRs,
            );

            computedArray.stats.push({
                ad: (ad),
                weight: mostPlausibleCTR,
            });
        }));

        return computedArray;
    }

    public normalizeWeights(computedStats: ComputedStats): ComputedStats {
        let totalWeight: number = 0;
        computedStats.stats.forEach((computedStat) => {
            totalWeight += computedStat.weight;
        });

        const weighted: ComputedUniqueStat[] = computedStats.stats.map((computedStat) => {
            return {
                ad: computedStat.ad,
                weight: computedStat.weight / totalWeight,
            };
        });

        return {
            campaign: computedStats.campaign,
            stats: weighted,
        };
    }

    public async save(computedStats: ComputedStats, interval): Promise<void> {
        const dummyStat: DummyStats = {
            date: interval.now,
            campaign: computedStats.campaign,
            stats: computedStats.stats.map((adStat: ComputedUniqueStat) => {
                return {
                    ad: adStat.ad,
                    weight: adStat.weight,
                };
            }),
            published: false,
        };
        await statsService.create(dummyStat);
    }

    // Auxiliary (but public to test it)
    public runPythonScript(clicks, impressions, CTRArray): Promise<number> {
        return new Promise((resolve, reject) => {
            const pythonPath = path.join(__dirname, "..", "..", "..", "scripts");
            const pyshell = new PythonShell("engine.py", {
                scriptPath: pythonPath,
                mode: "text",
            });

            let messageReceived: string;
            const toSend = `${clicks.toString()}
                            ${impressions.toString()}
                            ${CTRArray.join(" ").toString()}`;

            pyshell.send(toSend);
            pyshell.on("message", (message) => {
                messageReceived = message;
                console.log(message)
            });
            pyshell.end(() => {
                // Get last message emitted as the correct one
                // This is done to avoid getting error messages and other prints as ok messages
                resolve(parseFloat(messageReceived));
            });
        });
    }
}
