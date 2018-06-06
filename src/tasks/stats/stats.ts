import {logger} from "../../config/logger";
import {Ad} from "../../models/ad/ad.model";
import {AdService} from "../../models/ad/ad.service";
import {AdType} from "../../models/adType/adType.model";
import {AdTypeService} from "../../models/adType/adType.service";
import {Campaign} from "../../models/campaign/campaign.model";
import {CampaignService} from "../../models/campaign/campaign.service";
import {Statistic} from "../../models/stats/statistic.model";
import {StatisticService} from "../../models/stats/statistic.service";
import {Stats} from "../../models/stats/stats.model";
import {StatsService} from "../../models/stats/stats.service";
import {User} from "../../models/user/user.model";
import {UserService} from "../../models/user/user.service";
import {getIntervalDate} from "../Cron";
import {TwitterStats} from "./twitterStats";

const campaignService = new CampaignService();
const adService = new AdService();
const adTypeService = new AdTypeService();
const userService = new UserService();
const statisticService = new StatisticService();
const statsService = new StatsService();

const twitterStats = new TwitterStats();

export class StatsCron {

    public interval = "2HOUR";

    public async start() {
        logger.info("Stats cron started...");

        try {
            // First we create the date interval so it doesn't change during execution
            const INTERVAL = getIntervalDate(this.interval);

            // Get all campaigns
            const campaigns = await this.getCampaigns();

            // For every single campaign...
            await Promise.all(campaigns.map(async (campaign) => {

                const owner = await userService.findById(campaign.owner._id);
                const ads = await this.getAds(campaign);

                const statistics: Statistic[] = [];
                // Get all ads
                await Promise.all(ads.map(async (ad) => {

                    // Check if ad is published...
                    if (ad.published) {
                        // Then get its statistics / analytics calling the API
                        const adType: AdType = await adTypeService.assignByKey(ad.adTypeKey);
                        const statistic: Statistic = await this.getAnalytics(owner, ad, adType, INTERVAL);

                        // Save statistic into database
                        const mongoStatistic: Statistic = await statisticService.create(statistic);

                        // Push actual statistic into statistics array
                        statistics.push(mongoStatistic);
                    }
                }));

                // Finally we create the statistics object and save it
                const stats: Stats = {
                    date: INTERVAL.now,
                    campaign: (campaign),
                    statistics: (statistics),
                    computed: false,
                };
                await statsService.create(stats);

            }));
            logger.info("Stats cron finished");
        } catch (err) {
            logger.info("Stats cron error:");
            logger.error(err);
            throw new Error(err);
        }
    }

    private async getCampaigns(): Promise<Campaign[]> {
        return await campaignService.getAllValid();
    }

    private async getAds(campaign: Campaign): Promise<Ad[]> {
        return await adService.getCampaignAds(campaign);
    }

    private async getAnalytics(owner: User, ad: Ad, adType: AdType, interval): Promise<Statistic> {
        switch (adType.platform.key) {
            case "TW": {
                return await twitterStats.getStats(owner, ad, interval);
            }
            default: {
                throw new Error("Unknown adType " + adType.name);
            }
        }
    }
}
