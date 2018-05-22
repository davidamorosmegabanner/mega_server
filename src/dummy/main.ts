import {logger} from "../config/logger";
import {Campaign} from "../models/campaign/campaign.model";
import {CampaignService} from "../models/campaign/campaign.service";
import {Stats} from "../models/stats/stats.model";
import {StatsService} from "../models/stats/stats.service";
import {getIntervalDate} from "../tasks/Cron";
import {NormalizedStats} from "./models/normalizedStats";
import Computer from "./services/computer";
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
const computer = new Computer();

export default class DummyEngine {

    public interval = "1DAY";

    public async start() {
        logger.info("Dummy engine started...");

        // First we create the date interval so it doesn't change during execution
        const INTERVAL = getIntervalDate(this.interval);

        try {
            // 0 - Get all campaigns
            const campaigns: Campaign[] = await campaignService.getAll();

            // 1 - Get stats
            const stats: Stats[] = await statsService.get(INTERVAL.before, INTERVAL.now);

            // 2 - Normalize stats
            const normalizedStats: NormalizedStats[] = await normalizer.normalize(stats, INTERVAL);

            // 3 - Do magic
            await Promise.all(campaigns.map(async (campaign) => {
                const campaignStats: NormalizedStats = normalizedStats.find((stat) => stat.campaign === campaign);

                // We don't have stats of the campaign -> First timer
                // if (!campaignStats) {
                //     const campaignStats = await computer.firstTimer(campaignStats);
                // }
            }));

            logger.info("Dummy engine finished");
        } catch (err) {
            logger.info("Dummy engine error:");
            logger.error(err);
            throw new Error(err);
        }
    }

}
