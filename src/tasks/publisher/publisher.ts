import {logger} from "../../config/logger";
import {ComputedUniqueStat} from "../../dummy/models/computedUniqueStat";
import {DummyStats} from "../../dummy/models/stats.model";
import {DummyStatsService} from "../../dummy/models/stats.service";
import {TwitterCampaignMiddleware} from "../../middleware/twitter/campaign.middleware";
import {Ad} from "../../models/ad/ad.model";
import {AdService} from "../../models/ad/ad.service";
import {TwitterAd} from "../../models/ad/twitterAd.model";
import {AdType} from "../../models/adType/adType";
import {AdTypeService} from "../../models/adType/adType.service";
import {Campaign} from "../../models/campaign/campaign.model";
import {User} from "../../models/user/user.model";
import {UserService} from "../../models/user/user.service";
import TwitterPublisher from "./twitterPublisher";

const dummyStatsService = new DummyStatsService();
const adService = new AdService();
const adTypeService = new AdTypeService();
const userService = new UserService();

const twitterCampaignMiddleware = new TwitterCampaignMiddleware();

const twitterPublisher = new TwitterPublisher();

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

            // TODO unpublish deleted and inactive campaigns

            logger.info("Publisher cron finished");
        } catch (err) {
            logger.info("Publisher cron error:");
            logger.error(err);
            throw new Error(err);
        }
    }

    private async publishStat(unpublishedStats: DummyStats): Promise<boolean> {
        let published: boolean = true;
        await Promise.all(unpublishedStats.stats.map(async (unpublishedStat) => {
            const campaign: Campaign = unpublishedStats.campaign; //
            const ad: Ad = unpublishedStat.ad;
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
                    await adService.assignSocialId(campaign, campaignId);
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
