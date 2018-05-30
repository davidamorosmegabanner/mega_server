import {logger} from "../../config/logger";
import {DummyStats} from "../../dummy/models/stats.model";
import {DummyStatsService} from "../../dummy/models/stats.service";
import {TwitterCampaignMiddleware} from "../../middleware/twitter/campaign.middleware";
import {Ad} from "../../models/ad/ad.model";
import {AdService} from "../../models/ad/ad.service";
import {AdType} from "../../models/adType/adType";
import {AdTypeService} from "../../models/adType/adType.service";
import {Campaign} from "../../models/campaign/campaign.model";
import {CampaignService} from "../../models/campaign/campaign.service";
import {UserService} from "../../models/user/user.service";
import {ComputedUniqueStat} from "../../dummy/models/computedUniqueStat";
import {TwitterAd} from "../../models/ad/twitterAd.model";
import {User} from "../../models/user/user.model";

const dummyStatsService = new DummyStatsService();
const campaignService = new CampaignService();
const adService = new AdService();
const adTypeService = new AdTypeService();
const userService = new UserService();

const twitterCampaignMiddleware = new TwitterCampaignMiddleware();

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
            const campaign: Campaign = unpublishedStats.campaign;
            const ad: Ad = unpublishedStat.ad;
            const adType: AdType = await adTypeService.assignByKey(ad.adTypeKey);
            // Just to make sure we have all userand campaign data
            const owner = await userService.findById(ad.owner._id);

            await this.deletePublishedAd(ad, adType, owner);

            const stat: ComputedUniqueStat = {
                ad: (ad),
                weight: unpublishedStat.weight,
            };
            await this.publishAd(stat, campaign, ad, adType, owner);
        }));
    }

    private async deletePublishedAd(ad: Ad, adType: AdType, owner: User): Promise<void> {
        switch (adType.platform.key) {
            case ("TW"): {
                const twitterAd: TwitterAd = await adService.getTwitterAd(ad._id);
                if (twitterAd.twitterCampaign !== undefined) {
                    await twitterCampaignMiddleware.deleteCampaign(
                        owner.twToken, owner.twTokenSecret, owner.twAdAccount, twitterAd.twitterCampaign
                    );
                }
                break;
            }
        }
    }

    private async publishAd(
        stat: ComputedUniqueStat, campaign: Campaign, ad: Ad, adType: AdType, owner: User
    ): Promise<Campaign> {

        switch (adType.platform.key) {
            case ("TW"): {
                // Create campaign
                const fundingInstrumentId = await twitterCampaignMiddleware.getFundingInstrument(
                    owner.twToken, owner.twTokenSecret, owner.twAdAccount,
                );
                const startDate = new Date();
                const endDate = new Date(); endDate.setDate(startDate.getDate() + 10); // "Random value"
                const campaignId = (await twitterCampaignMiddleware.createCampaign(
                    owner.twToken, owner.twTokenSecret, owner.twAdAccount,
                    campaign.dailyBudget * stat.weight, fundingInstrumentId, campaign.name,
                    startDate, endDate,
                )).data.id;

                return await adService.assignSocialId(campaign, campaignId);

                // TODO publish everything


                break;
            }
        }

    }
}
