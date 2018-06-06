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

    public interval = "10MIN";

    public async start() {
        logger.info("Dummy engine started...");

        // First we create the date interval so it doesn't change during execution
        const INTERVAL = getIntervalDate(this.interval);

        try {
            // 0 - Get all active and non deleted campaigns
            const campaigns: Campaign[] = await campaignService.getAllValid();

            // 1 - Get statistics
            const stats: Stats[] = await statsService.get(INTERVAL.before, INTERVAL.now);

            // 2 - Normalize statistics
            const normalizedStats: NormalizedStats[] = await normalizer.normalize(stats);

            // 3 - Do magic
            await Promise.all(campaigns.map(async (campaign) => {
                const campaignStats: NormalizedStats = normalizedStats.find((stat) => stat.campaign === campaign);
                let computedStats: ComputedStats;

                // We have statistics of the campaign -> Find previous statistics and pass to engine
                if (campaignStats) {
                    const oldStats: Stats[] = await statsService.get(campaign.created, INTERVAL.before, campaign);
                    const oldStatsNormalized: NormalizedStats[] = await normalizer.normalize(oldStats);

                    computedStats = await computer.compute(campaignStats, oldStatsNormalized);
                    computedStats = await computer.normalizeWeights(computedStats);

                    // Save computed DummyStats
                    await computer.save(computedStats, INTERVAL);
                    // Turn statistics into computed
                    await statsService.changeToComputed(stats);
                }
            }));

            logger.info("Dummy engine finished");
        } catch (err) {
            logger.info("Dummy engine error:");
            logger.error(err);
            throw new Error(err);
        }
    }

}
