import {TwitterAnalyticsMiddleware} from "../../middleware/twitter/analytics.middleware";
import {AdModel} from "../../models/ad/ad.model";
import {AdService} from "../../models/ad/ad.service";
import {TwitterAdModel} from "../../models/ad/twitterAd.model";
import {Statistic} from "../../models/stats/statistic.model";
import {User} from "../../models/user/user.model";

const adService = new AdService();
const twitterAnalyticsMiddleware = new TwitterAnalyticsMiddleware();

export class TwitterStats {
    public async getStats(owner: User, ad: AdModel, interval): Promise<Statistic> {
        const twitterAd: TwitterAdModel = await adService.getTwitterAd(ad._id);
        const statistics = (await twitterAnalyticsMiddleware.getStats(
            owner.twToken, owner.twTokenSecret, owner.twAdAccount,
            "CAMPAIGN", [twitterAd.twitterCampaign],
            interval.before, interval.now,
        )).data[0].id_data[0].metrics;
        return {
            ad: (ad),
            impressions: +statistics.impressions,
            clicks: +statistics.clicks,
            follows: +statistics.follows,
            app_clicks: +statistics.app_clicks,
            retweets: +statistics.retweets,
            likes: +statistics.likes,
            replies: +statistics.replies,
            url_clicks: +statistics.url_clicks,
        };
    }
}
