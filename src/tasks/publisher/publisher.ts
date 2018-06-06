import {logger} from "../../config/logger";
import {ComputedUniqueStat} from "../../dummy/models/computedUniqueStat";
import {DummyStats} from "../../dummy/models/dummyStats.model";
import {DummyStatsService} from "../../dummy/models/dummyStats.service";
import ComputerService from "../../dummy/services/computer";
import {TwitterCampaignMiddleware} from "../../middleware/twitter/campaign.middleware";
import {Ad} from "../../models/ad/ad.model";
import {AdService} from "../../models/ad/ad.service";
import {TwitterAd} from "../../models/ad/twitterAd.model";
import {AdType} from "../../models/adType/adType.model";
import {AdTypeService} from "../../models/adType/adType.service";
import {Campaign} from "../../models/campaign/campaign.model";
import {CampaignService} from "../../models/campaign/campaign.service";
import {User} from "../../models/user/user.model";
import {UserService} from "../../models/user/user.service";
import TwitterPublisher from "./twitterPublisher";

const dummyStatsService = new DummyStatsService();
const campaignService = new CampaignService();
const adService = new AdService();
const adTypeService = new AdTypeService();
const userService = new UserService();

const dummyComputerService = new ComputerService();

const twitterCampaignMiddleware = new TwitterCampaignMiddleware();

const twitterPublisher = new TwitterPublisher();

export class PublisherCron {

    public interval = "5MIN";

    public async start() {
        logger.info("Publisher cron started...");

        try {
            // First we publish unpublished ads
            const unpublishedAdsArray: Ad[] = await adService.getUnpublished();
            console.log(unpublishedAdsArray);

            await Promise.all(unpublishedAdsArray.map(async (unpublishedAd) => {
                const published: boolean = await this.publishUnpublishedAd(unpublishedAd);
                if (published) {
                    await adService.changeToPublished(unpublishedAd);
                }
            }));

            // Then we look for stats and publish those ads that have new stats
            const unpublishedStatsArray: DummyStats[] = await dummyStatsService.getUnpublished();
            console.log(unpublishedStatsArray);

            await Promise.all(unpublishedStatsArray.map(async (unpublishedStats) => {
                const published: boolean = await this.publishStat(unpublishedStats);
                if (published) {
                    await dummyStatsService.changeToPublished(unpublishedStats);
                }
            }));

            // Finally we look for those ads with non valid or deleted campaigns and unpublish them
            const notValidAds: Ad[] = await adService.getPublishedAndNotValid();
            console.log(notValidAds);

            await Promise.all(notValidAds.map(async (notValidAd) => {
                const adType: AdType = await adTypeService.assignByKey(notValidAd.adTypeKey);
                await this.deletePublishedAd(notValidAd, adType, notValidAd.owner);
                await adService.changeToUnpublished(notValidAd);
            }));

            logger.info("Publisher cron finished");
        } catch (err) {
            logger.info("Publisher cron error:");
            logger.error(err);
            throw new Error(err);
        }
    }

    private async publishUnpublishedAd(unpublishedAd: Ad): Promise<boolean> {
        const campaign = await campaignService.findById(unpublishedAd.owner, unpublishedAd.campaign._id);
        const adType: AdType = await adTypeService.assignByKey(unpublishedAd.adTypeKey);
        // Just to make sure we have all user data
        const owner = await userService.findById(unpublishedAd.owner.toString());

        // Get ad weight using dummy's computer
        const stats = await dummyComputerService.firstTimer(campaign);
        const weight = stats.stats[0].weight;

        const stat: ComputedUniqueStat = {
            ad: unpublishedAd,
            weight: (weight),
        };

        return await this.publishAd(stat, campaign, unpublishedAd, adType, owner);
    }

    private async publishStat(unpublishedStats: DummyStats): Promise<boolean> {
        let published: boolean = true;
        await Promise.all(unpublishedStats.statistics.map(async (unpublishedStat) => {
            const campaign: Campaign = unpublishedStats.campaign; //
            const ad: Ad = await adService.getWithId(unpublishedStat.ad.toString());
            const adType: AdType = await adTypeService.assignByKey(ad.adTypeKey);
            // Just to make sure we have all user data
            const owner = await userService.findById(ad.owner.toString());

            await this.deletePublishedAd(ad, adType, owner);

            const stat: ComputedUniqueStat = {
                ad: (ad),
                weight: unpublishedStat.weight,
            };
            const isAdPublished = await this.publishAd(stat, campaign, ad, adType, owner);
            if (!isAdPublished) { published = false; }
        }));
        return published;
    }

    private async publishAd(
        stat: ComputedUniqueStat, campaign: Campaign, ad: Ad, adType: AdType, owner: User,
    ): Promise<boolean> {
        let published = true;
        try {
            switch (adType.platform.key) {
                case ("TW"): {
                    const campaignId: string = await twitterPublisher.publish(stat, campaign, ad, owner, adType);
                    if (!campaignId) {
                        published = false;
                        logger.error(`Campaign with id ${campaign._id} was not published on twitter`);
                        break;
                    }
                    await adService.assignTwitterCampaign(ad, campaignId);
                    console.log("published campaign with id: " + campaignId);
                    break;
                }
                default: {
                    logger.error("Unrecognized twitter adType");
                    published = false;
                }
            }

            return published;

        } catch (error) {
            throw new Error(error);
        }
    }

    private async deletePublishedAd(ad: Ad, adType: AdType, owner: User): Promise<void> {
        switch (adType.platform.key) {
            case ("TW"): {
                const twitterAd: TwitterAd = await adService.getTwitterAd(ad._id);
                if (twitterAd.twitterCampaign !== undefined) {
                    await twitterCampaignMiddleware.deleteCampaign(
                        owner.twToken, owner.twTokenSecret, owner.twAdAccount, twitterAd.twitterCampaign,
                    );
                }
                break;
            }
            default: {
                logger.error("Unsupported platform to delete campaign");
                throw new Error("Unsupported platform to delete campaign");
            }
        }
    }
}
