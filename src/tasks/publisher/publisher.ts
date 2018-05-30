import {logger} from "../../config/logger";
import {DummyStats} from "../../dummy/models/stats.model";
import {DummyStatsService} from "../../dummy/models/stats.service";
import {Ad} from "../../models/ad/ad.model";
import {AdService} from "../../models/ad/ad.service";
import {AdTypeService} from "../../models/adType/adType.service";
import {AdType} from "../../models/adType/adType";
import {Twitter} from "../../models/platform/platform";

const dummyStatsService = new DummyStatsService();
const adService = new AdService();
const adTypeService = new AdTypeService();

export class PublisherCron {

    public interval = "1MIN";

    public async start() {
        logger.info("Publisher cron started...");

        try {
            const unpublishedStatsArray: DummyStats[] = await dummyStatsService.getUnpublished();
            await Promise.all(unpublishedStatsArray.map(async (unpublishedStats) => {
                const published: boolean = await this.publishStat(unpublishedStats);
                if (published) {
                    await dummyStatsService.changeToPublished(unpublishedStats);
                }
            }));
            // Get all active campaigns
            // Get all ads
            // Get statistics
            // Dummy
            // Publish

            logger.info("StatsModel cron finished");
        } catch (err) {
            logger.info("StatsModel cron error:");
            logger.error(err);
            throw new Error(err);
        }
    }

    private async publishStat(unpublishedStats: DummyStats): Promise<boolean> {
        await Promise.all(unpublishedStats.stats.map(async (unpublishedStat) => {
            const ad: Ad = await adService.getWithId(unpublishedStat.ad._id);
            const adType: AdType = await adTypeService.assignByKey(ad.adTypeKey);
            await this.deletePublishedAd(ad, adType);
            // TODO
        }));
    }

    private async deletePublishedAd(ad: Ad, adType: AdType): Promise<Ad> {
        switch (adType.platform) {
            case (Twitter): {
                // TODO
            }
        }
    }
}
