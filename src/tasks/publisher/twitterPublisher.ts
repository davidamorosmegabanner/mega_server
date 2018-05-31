import {logger} from "../../config/logger";
import {ComputedUniqueStat} from "../../dummy/models/computedUniqueStat";
import {TwitterCampaignMiddleware} from "../../middleware/twitter/campaign.middleware";
import {TwitterCreativeMiddleware} from "../../middleware/twitter/creative.middleware";
import {Ad} from "../../models/ad/ad.model";
import {AdService} from "../../models/ad/ad.service";
import {TwitterAd} from "../../models/ad/twitterAd.model";
import {AdType} from "../../models/adType/adType";
import {Campaign} from "../../models/campaign/campaign.model";
import {Creativity} from "../../models/creativity/creativity.model";
import {CreativityService} from "../../models/creativity/creativity.service";
import {User} from "../../models/user/user.model";

const adService = new AdService();
const creativityService = new CreativityService();
const twitterCampaignMiddleware = new TwitterCampaignMiddleware();
const twitterCreativeMiddleware = new TwitterCreativeMiddleware();

export default class TwitterPublisher {

    public async publish(
        stat: ComputedUniqueStat,
        campaign: Campaign,
        ad: Ad,
        owner: User,
        adType: AdType,
    ): Promise<string> {
        switch (adType.name) {
            case ("TW_TWEET"): {
                return await this.publishTweet(stat, campaign, ad, owner);
            }
            case ("TW_TWEET_IMAGE"): {
                return await this.publishTweetWithMedia(stat, campaign, ad, owner);
            }
            case ("TW_TWEET_GIF"): {
                return await this.publishTweetWithMedia(stat, campaign, ad, owner);
            }
            case ("TW_TWEET_VIDEO"): {
                return await this.publishTweetWithMedia(stat, campaign, ad, owner);
            }
            case ("TW_APP_IMAGE"): {
                return await this.publishAppWithMedia(stat, campaign, ad, owner, "image");
            }
            case ("TW_APP_VIDEO"): {
                return await this.publishAppWithMedia(stat, campaign, ad, owner, "video");
            }
            default: {
                logger.error("Unknown adType to publish");
                throw new Error("Unknown adType to publish");
            }
        }
    }

    private async publishTweet(
        stat: ComputedUniqueStat,
        campaign: Campaign,
        ad: Ad,
        owner: User,
    ): Promise<string> {
        // Create campaign
        const fundingInstrumentId = await twitterCampaignMiddleware.getFundingInstrument(
            owner.twToken, owner.twTokenSecret, owner.twAdAccount,
        );
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 10); // "Random value"
        const campaignId = (await twitterCampaignMiddleware.createCampaign(
            owner.twToken, owner.twTokenSecret, owner.twAdAccount,
            campaign.dailyBudget * stat.weight, fundingInstrumentId, campaign.name,
            startDate, endDate,
        )).data.id;

        const twitterAd: TwitterAd = await adService.getTwitterAd(ad._id);

        const tweetId = (await twitterCreativeMiddleware.createTweet(
            owner.twToken, owner.twTokenSecret, owner.twAdAccount, twitterAd.text,
        )).data.id_str;
        const lineItem = (await twitterCampaignMiddleware.createLineItem(
            owner.twToken, owner.twTokenSecret, owner.twAdAccount,
            campaignId, "TWEET_ENGAGEMENTS", "ALL_ON_TWITTER", "PROMOTED_TWEETS",
        ));
        await twitterCampaignMiddleware.createPromotedTweets(
            owner.twToken, owner.twTokenSecret, owner.twAdAccount, lineItem.data.id, [tweetId],
        );
        return campaignId;
    }

    private async publishTweetWithMedia(
        stat: ComputedUniqueStat,
        campaign: Campaign,
        ad: Ad,
        owner: User,
    ): Promise<string> {
        // Create campaign
        const fundingInstrumentId = await twitterCampaignMiddleware.getFundingInstrument(
            owner.twToken, owner.twTokenSecret, owner.twAdAccount,
        );
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 10); // "Random value"
        const campaignId = (await twitterCampaignMiddleware.createCampaign(
            owner.twToken, owner.twTokenSecret, owner.twAdAccount,
            campaign.dailyBudget * stat.weight, fundingInstrumentId, campaign.name,
            startDate, endDate,
        )).data.id;

        const twitterAd: TwitterAd = await adService.getTwitterAd(ad._id);

        // Uploading images to twitter
        const creativities: Creativity[] = await creativityService.find(twitterAd.creativities);
        const creativitiesPaths = creativities.map((creativity) => creativity.path);
        const twitterImages: string[] = [];
        await Promise.all(creativitiesPaths.map(async (creativityPath) => {
            const image = await twitterCreativeMiddleware.uploadMedia(
                owner.twToken, owner.twTokenSecret, creativityPath,
            );
            twitterImages.push(image);
        }));

        // Creating tweet with images and all elements
        const tweetId = (await twitterCreativeMiddleware.createTweet(
            owner.twToken, owner.twTokenSecret, owner.twAdAccount, twitterAd.text,
            undefined, twitterImages,
        )).data.id_str;
        const lineItem = (await twitterCampaignMiddleware.createLineItem(
            owner.twToken, owner.twTokenSecret, owner.twAdAccount,
            campaignId, "TWEET_ENGAGEMENTS", "ALL_ON_TWITTER", "PROMOTED_TWEETS",
        ));
        await twitterCampaignMiddleware.createPromotedTweets(
            owner.twToken, owner.twTokenSecret, owner.twAdAccount, lineItem.data.id, [tweetId],
        );
        return campaignId;
    }

    private async publishAppWithMedia(
        stat: ComputedUniqueStat,
        campaign: Campaign,
        ad: Ad,
        owner: User,
        mediaType: string,
    ): Promise<string> {
        // Create campaign
        const fundingInstrumentId = await twitterCampaignMiddleware.getFundingInstrument(
            owner.twToken, owner.twTokenSecret, owner.twAdAccount,
        );
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 10); // "Random value"
        const campaignId = (await twitterCampaignMiddleware.createCampaign(
            owner.twToken, owner.twTokenSecret, owner.twAdAccount,
            campaign.dailyBudget * stat.weight, fundingInstrumentId, campaign.name,
            startDate, endDate,
        )).data.id;

        const twitterAd: TwitterAd = await adService.getTwitterAd(ad._id);

        // Uploading images to twitter
        const creativities: Creativity[] = await creativityService.find(twitterAd.creativities);
        const creativitiesPaths = creativities.map((creativity) => creativity.path);
        const twitterImages: string[] = [];
        const twitterImage = await twitterCreativeMiddleware.uploadMedia(
            owner.twToken, owner.twTokenSecret, creativitiesPaths[0],
        );

        // Creating media card
        const mediaKey = await twitterCreativeMiddleware.getMediaKey(
            owner.twToken, owner.twTokenSecret, owner.twAdAccount, twitterImage, creativities[0].mimetype,
        );
        let websiteMediaCard;
        if (mediaType === "image") {
            websiteMediaCard = await twitterCreativeMiddleware.createAppImageCard(
                owner.twToken, owner.twTokenSecret, owner.twAdAccount,
                twitterAd.text, mediaKey, "ES",
                twitterAd.iPhoneAppId, twitterAd.iPhoneAppDeepLink,
                twitterAd.androidAppId, twitterAd.androidAppDeepLink,
                twitterAd.iPadAppId, twitterAd.iPadAppDeepLink,
                "INSTALL",
            );
        } else {
            websiteMediaCard = await twitterCreativeMiddleware.createAppVideoCard(
                owner.twToken, owner.twTokenSecret, owner.twAdAccount,
                twitterAd.text, mediaKey, "ES",
                twitterAd.iPhoneAppId, twitterAd.iPhoneAppDeepLink,
                twitterAd.androidAppId, twitterAd.androidAppDeepLink,
                twitterAd.iPadAppId, twitterAd.iPadAppDeepLink,
                "INSTALL",
            );
        }

        // Creating tweet with images and all elements
        const tweetId = (await twitterCreativeMiddleware.createTweet(
            owner.twToken, owner.twTokenSecret, owner.twAdAccount, twitterAd.text,
            websiteMediaCard, undefined,
        )).data.id_str;
        const lineItem = (await twitterCampaignMiddleware.createLineItem(
            owner.twToken, owner.twTokenSecret, owner.twAdAccount,
            campaignId, "TWEET_ENGAGEMENTS", "ALL_ON_TWITTER", "PROMOTED_TWEETS",
        ));
        await twitterCampaignMiddleware.createPromotedTweets(
            owner.twToken, owner.twTokenSecret, owner.twAdAccount, lineItem.data.id, [tweetId],
        );
        return campaignId;
    }
}
