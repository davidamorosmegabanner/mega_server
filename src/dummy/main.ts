import {privateDecrypt} from "crypto";
import {logger} from "../config/logger";
import {Stats} from "../models/stats/stats.model";
import {StatsService} from "../models/stats/stats.service";
import {getIntervalDate} from "../tasks/Cron";
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
const normalizer = new Normalizer();

export default class DummyEngine {

    public interval = "1DAY";

    public async start() {
        logger.info("Dummy engine started...");

        // First we create the date interval so it doesn't change during execution
        const INTERVAL = getIntervalDate(this.interval);

        try {
            const stats: Stats[] = await collectData(INTERVAL.before, INTERVAL.now);

            const normalizedStats = await normalizer.normalize(stats);

            logger.info("Dummy engine finished");
        } catch (err) {
            logger.info("Dummy engine error:");
            logger.error(err);
            throw new Error(err);
        }
    }

}

// Collecting all data and create statistics for every ad in every campaign
async function collectData(startDate: Date, endDate: Date): Promise<Stats[]> {
    return await statsService.get(startDate, endDate);
}
