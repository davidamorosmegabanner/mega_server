import {logger} from "../../config/logger";
import {ComputedUniqueStat} from "../../dummy/models/computedUniqueStat";
import {DummyStats} from "../../dummy/models/stats.model";
import {DummyStatsService} from "../../dummy/models/stats.service";
import {TwitterCampaignMiddleware} from "../../middleware/twitter/campaign.middleware";
import {AdModel} from "../../models/ad/ad.model";
import {AdService} from "../../models/ad/ad.service";
import {TwitterAdModel} from "../../models/ad/twitterAd.model";
import {AdType} from "../../models/adType/adType.model";
import {AdTypeService} from "../../models/adType/adType.service";
import {Campaign} from "../../models/campaign/campaign.model";
import {User} from "../../models/user/user.model";
import {UserService} from "../../models/user/user.service";
import TwitterPublisher from "./twitterPublisher";
import {CampaignService} from "../../models/campaign/campaign.service";
import ComputerService from "../../dummy/services/computer";

const dummyStatsService = new DummyStatsService();
const campaignService = new CampaignService();
const adService = new AdService();
const adTypeService = new AdTypeService();
const userService = new UserService();

const dummyComputerService = new ComputerService();

const twitterCampaignMiddleware = new TwitterCampaignMiddleware();

const twitterPublisher = new TwitterPublisher();

export class PublisherCron {

    public interval = "1MIN";

    public async start() {
        logger.info("Publisher cron started...");

        try {
            // First we publish unpublished ads
            const unpublishedAdsArray: AdModel[] = await adService.getUnpublished();
            await Promise.all(unpublishedAdsArray.map(async (unpublishedAd) => {
                const published: boolean = await this.publishUnpublishedAd(unpublishedAd);
                if (published) {
                    await adService.changeToPublished(unpublishedAd);
                }
            }));
            console.log(unpublishedAdsArray)

            // Then we look for stats and publish those ads that have new stats
            const unpublishedStatsArray: DummyStats[] = await dummyStatsService.getUnpublished();
            await Promise.all(unpublishedStatsArray.map(async (unpublishedStats) => {
                const published: boolean = await this.publishStat(unpublishedStats);
                if (published) {
                    await dummyStatsService.changeToPublished(unpublishedStats);
                }
            }));
            console.log(unpublishedStatsArray)

            // Finally we look for those ads width non valid or deleted campaigns and unpublish them
            const notValidAds: AdModel[] = await adService.getPublishedAndNotValid();
            await Promise.all(notValidAds.map(async (notValidAd) => {
                const adType: AdType = await adTypeService.assignByKey(notValidAd.adTypeKey);
                await this.deletePublishedAd(notValidAd, adType, notValidAd.owner);
                await adService.changeToUnpublished(notValidAd);
            }));
            console.log(notValidAds)

            logger.info("Publisher cron finished");
        } catch (err) {
            logger.info("Publisher cron error:");
            logger.error(err);
            throw new Error(err);
        }
    }

    private async publishUnpublishedAd(unpublishedAd: AdModel): Promise<boolean> {
        let published: boolean = true;
        const campaign = await campaignService.findById(unpublishedAd.owner, unpublishedAd.campaign._id);
        const adType: AdType = await adTypeService.assignByKey(unpublishedAd.adTypeKey);
        // Just to make sure we have all user data
        const owner = await userService.findById(unpublishedAd.owner._id);

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
        await Promise.all(unpublishedStats.stats.map(async (unpublishedStat) => {
            const campaign: Campaign = unpublishedStats.campaign; //
            const ad: AdModel = unpublishedStat.ad;
            const adType: AdType = await adTypeService.assignByKey(ad.adTypeKey);
            // Just to make sure we have all user data
            const owner = await userService.findById(ad.owner._id);

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

    private async deletePublishedAd(ad: AdModel, adType: AdType, owner: User): Promise<void> {
        switch (adType.platform.key) {
            case ("TW"): {
                const twitterAd: TwitterAdModel = await adService.getTwitterAd(ad._id);
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

    private async publishAd(
        stat: ComputedUniqueStat, campaign: Campaign, ad: AdModel, adType: AdType, owner: User,
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
                    await adService.assignTwitterCampaign(campaign, campaignId);
                    console.log("published campaign with id: " + campaignId)
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
}
