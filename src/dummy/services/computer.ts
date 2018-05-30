import * as path from "path";
import * as PythonShell from "python-shell";

import {Ad} from "../../models/ad/ad.model";
import {AdService} from "../../models/ad/ad.service";
import {Campaign} from "../../models/campaign/campaign.model";
import {ComputedStats} from "../models/computedStats";
import {NormalizedStats} from "../models/normalizedStats";
import {NormalizedUniqueStat} from "../models/normalizedUniqueStat";
import {ComputedUniqueStat} from "../models/computedUniqueStat";

const adService = new AdService();

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
        const oldStatsCTR: ComputedUniqueStat[] = [];
        oldStats.forEach((oldStat) => {
            oldStat.stats.forEach((oldStatsStat) => {
                // oldStatsCTR.push(( oldStatsStat.CTR.clicks / oldStatsStat.CTR.impressions ));
                oldStatsCTR.push({
                    ad: oldStatsStat.ad,
                    weight: oldStatsStat.CTR.clicks / oldStatsStat.CTR.impressions,
                });
            });
        });

        const computedArray: ComputedStats = {
            campaign: (newStats.campaign),
            stats: [],
        };
        await Promise.all(newStatsArray.map(async (newStat) => {
            const ad = newStat.ad;
            const oldCTRs: number[] = oldStatsCTR.map((oldStat) => {
                if (oldStat.ad === ad) { return oldStat.weight; }
            });

            // Call python script to get most plausible CTR
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
                // received a message sent from the Python script (a simple "print" statement)
                messageReceived = message;
            });
            pyshell.end(() => {
                resolve(parseFloat(messageReceived));
            });
        });
    }
}
