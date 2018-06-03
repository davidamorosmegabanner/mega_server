import {logger} from "../config/logger";
import {Campaign} from "../models/campaign/campaign.model";
import {CampaignService} from "../models/campaign/campaign.service";
import {Stats} from "../models/stats/stats.model";
import {StatsService} from "../models/stats/stats.service";
import {getIntervalDate} from "../tasks/Cron";
import {ComputedStats} from "./models/computedStats";
import {NormalizedStats} from "./models/normalizedStats";
import ComputerService from "./services/computer";
import Normalizer from "./services/normalizer";

/*
 *
 * Main dummy engine class
 * It will run all related tasks in order to:
 * 1 - Collect all data
 * 2 - Normalize this data
 * 3 - Compute distribution of publication of every campaign
 *
 */

const statsService = new StatsService();
const campaignService = new CampaignService();

const normalizer = new Normalizer();
const computer = new ComputerService();

export default class DummyEngine {

    public interval = "1MIN";

    public async start() {
        logger.info("Dummy engine started...");

        // First we create the date interval so it doesn't change during execution
        const INTERVAL = getIntervalDate(this.interval);

        try {
            // 0 - Get all active and non deleted campaigns
            const campaigns: Campaign[] = await campaignService.getAll();

            // 1 - Get stats
            const stats: Stats[] = await statsService.get(INTERVAL.before, INTERVAL.now);

            // 2 - Normalize stats
            const normalizedStats: NormalizedStats[] = await normalizer.normalize(stats);

            // 3 - Do magic
            await Promise.all(campaigns.map(async (campaign) => {
                const campaignStats: NormalizedStats = normalizedStats.find((stat) => stat.campaign === campaign);
                let computedStats: ComputedStats;
                // We don't have stats of the campaign -> First timer
                if (!campaignStats) {
                    computedStats = await computer.firstTimer(campaign);
                }

                // We have stats of the campaign -> Find previous stats and pass to engine
                if (campaignStats) {
                    const oldStats: Stats[] = await statsService.get(campaign.created, INTERVAL.now, campaign);
                    const oldStatsNormalized: NormalizedStats[] = await normalizer.normalize(oldStats);

                    computedStats = await computer.compute(campaignStats, oldStatsNormalized);
                    computedStats = await computer.normalizeWeights(computedStats);
                }

                // Save computed DummyStats (they will or not have past CTR!!!!)
                await computer.save(computedStats, INTERVAL);
            }));

            logger.info("Dummy engine finished");
        } catch (err) {
            logger.info("Dummy engine error:");
            logger.error(err);
            throw new Error(err);
        }
    }

}
