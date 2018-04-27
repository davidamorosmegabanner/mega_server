import * as moment from "moment";
import {OAuth} from "oauth";
import * as twit from "twit";
import config from "../../config/config";
import {RequestTwitterService} from "../../services/request.twitter.service";

const requestTwitterService = new RequestTwitterService();

export class TwitterCreativeMiddleware {

    private apiKey: string = config.twitterAPI.apiKey;
    private apiSecret: string = config.twitterAPI.apiSecret;

    private env = (process.env.NODE_ENV || "development");

    private sandbox = (this.env !== "production") ? "-sandbox" : "";

    /*
        Tweet middleware
     */

    public async getTweets(accessToken, accessTokenSecret, accountId): Promise<any> {
        const url = `https://ads-api${this.sandbox}.twitter.com/3/accounts/${accountId}/scoped_timeline`;

        return await requestTwitterService.get(accessToken, accessTokenSecret, url);
    }

    // TODO add video compatibility
    // https://developer.twitter.com/en/docs/ads/creatives/api-reference/tweets
    public async createTweet(accessToken, accessTokenSecret, accountId,
                             text?: string, cardUri?: string, mediaIds?: string[], nullcast?: string): Promise<any> {

        // Check all params are ok
        if (text && text.length > 240) { throw new Error("Max text length of 240 chars exceeded"); }
        if (!text && !mediaIds) { throw new Error("Please specify a text or a media"); }
        if (nullcast && nullcast !== "true" && nullcast !== "false") {
            throw new Error("nullcast must be true or false"); }

        // Create a string separated comma of mediaIds
        let mediaIdsForm;
        if (mediaIds) { mediaIdsForm = mediaIds.join(","); }

        // Create request params
        const url = `https://ads-api${this.sandbox}.twitter.com/3/accounts/${accountId}/tweet`;
        const params: any = {};
        if (text) { params.text = text; }
        if (cardUri) { params.card_uri = cardUri; }
        if (mediaIds.length) { params.media_ids = mediaIdsForm; }
        if (nullcast) { params.nullcast = nullcast; }

        // Go
        return await requestTwitterService.post(accessToken, accessTokenSecret, url, params);
    }

    public async createScheduledTweet(
        accessToken, accessTokenSecret, accountId, scheduledAt: Date,
        text?: string, cardUri?: string, mediaIds?: string[], nullcast?: string): Promise<any> {

        // Check all params are ok
        if (text && text.length > 240) { throw new Error("Max text length of 240 chars exceeded"); }
        if (!text && !mediaIds) { throw new Error("Please specify a text or a media"); }
        if (nullcast && nullcast !== "true" && nullcast !== "false") {
            throw new Error("nullcast must be true or false"); }

        // Create a string separated comma of mediaIds
        let mediaIdsForm;
        if (mediaIds) { mediaIdsForm = mediaIds.join(","); }

        // Create request params
        const url = `https://ads-api${this.sandbox}.twitter.com/3/accounts/${accountId}/scheduled_tweets`;
        const params: any = {
            scheduled_at: moment(scheduledAt).format("YYYY-MM-DDTHH:mm:ss[Z]"),
        };
        if (text) { params.text = text; }
        if (cardUri) { params.card_uri = cardUri; }
        if (mediaIds) { params.media_ids = mediaIdsForm; }
        if (nullcast) { params.nullcast = nullcast; }

        // Go
        return await requestTwitterService.post(accessToken, accessTokenSecret, url, params);
    }

    /*
        Creative middleware
     */

    public async createWebsiteImageCard(
        accessToken, accessTokenSecret,
        accountId,
        name,
        websiteTitle,
        websiteUrl,
        imageMediaKey,
    ): Promise<any> {
        const url = `https://ads-api${this.sandbox}.twitter.com/3/accounts/${accountId}/cards/website`;
        const params = {
            name: (name),
            website_title: (websiteTitle),
            website_url: (websiteUrl),
            image_media_key: (imageMediaKey),
        };

        const data = await requestTwitterService.post(accessToken, accessTokenSecret, url, params);

        return data;
    }

    public async createWebsiteVideoCard(
        accessToken, accessTokenSecret,
        accountId,
        name,
        websiteTitle,
        websiteUrl,
        imageMediaKey,
    ): Promise<any> {
        const url = `https://ads-api${this.sandbox}.twitter.com/3/accounts/${accountId}/cards/video_website`;
        const params = {
            name: (name),
            title: (websiteTitle),
            website_url: (websiteUrl),
            video_id: (imageMediaKey),
        };

        const data = await requestTwitterService.post(accessToken, accessTokenSecret, url, params);

        return data;
    }

    public async createAppImageCard(
        accessToken, accessTokenSecret,
        accountId,
        name,
        imageMediaKey,
        countryCode,
        iPhoneAppId?, iPhoneDeepLink?,
        AndroidAppId?, AndroidDeepLink?,
        iPadAppId?, iPadDeepLink?,
        appCTA?,
    ): Promise<any> {
        // Check params
        if (iPhoneDeepLink && !iPhoneAppId) { throw new Error("Provide an iPhone app id if providing a deep link"); }
        if (AndroidDeepLink && !AndroidAppId) { throw new Error("Provide an Android app id if providing a deep link"); }
        if (iPadDeepLink && !iPadAppId) { throw new Error("Provide an iPad app id if providing a deep link"); }
        if (appCTA) {
            const validCTAValues = ["BOOK", "CONNECT", "INSTALL", "OPEN", "ORDER", "PLAY", "SHOP"];
            if (validCTAValues.indexOf(appCTA) === -1) {
                throw new Error(`${appCTA} is not a valid value. CTA valid values: ${ validCTAValues.join(",") }`);
            }
        }
        if (!iPhoneAppId && !AndroidAppId && iPadAppId) { throw new Error("Please provide at least one app Id"); }

        // Create request params
        const url = `https://ads-api${this.sandbox}.twitter.com/3/accounts/${accountId}/cards/image_app_download`;
        const params: any = {
            name: (name),
            app_country_code: countryCode,
            wide_app_image_media_key: imageMediaKey,
        };
        if (iPhoneAppId) { params.iphone_app_id = iPhoneAppId; }
        if (iPhoneDeepLink) { params.iphone_deep_link = iPhoneDeepLink; }
        if (AndroidAppId) { params.googleplay_app_id = AndroidAppId; }
        if (AndroidDeepLink) { params.googleplay_deep_link = AndroidDeepLink; }
        if (iPadAppId) { params.ipad_app_id = iPadAppId; }
        if (iPadDeepLink) { params.ipad_deep_link = iPadDeepLink; }
        if (appCTA) { params.app_cta = appCTA; }

        return await requestTwitterService.post(accessToken, accessTokenSecret, url, params);
    }

    public async createAppVideoCard(
        accessToken, accessTokenSecret,
        accountId,
        name,
        videoMediaKey,
        countryCode,
        iPhoneAppId?, iPhoneDeepLink?,
        AndroidAppId?, AndroidDeepLink?,
        iPadAppId?, iPadDeepLink?,
        appCTA?,
    ): Promise<any> {
        // Check params
        if (iPhoneDeepLink && !iPhoneAppId) { throw new Error("Provide an iPhone app id if providing a deep link"); }
        if (AndroidDeepLink && !AndroidAppId) { throw new Error("Provide an Android app id if providing a deep link"); }
        if (iPadDeepLink && !iPadAppId) { throw new Error("Provide an iPad app id if providing a deep link"); }
        if (appCTA) {
            const validCTAValues = ["BOOK", "CONNECT", "INSTALL", "OPEN", "ORDER", "PLAY", "SHOP"];
            if (validCTAValues.indexOf(appCTA) === -1) {
                throw new Error(`${appCTA} is not a valid value. CTA valid values: ${ validCTAValues.join(",") }`);
            }
        }
        if (!iPhoneAppId && !AndroidAppId && iPadAppId) { throw new Error("Please provide at least one app Id"); }

        // Create request params
        const url = `https://ads-api${this.sandbox}.twitter.com/3/accounts/${accountId}/cards/video_app_download`;
        const params: any = {
            name: (name),
            app_country_code: countryCode,
            video_id: videoMediaKey,
        };
        if (iPhoneAppId) { params.iphone_app_id = iPhoneAppId; }
        if (iPhoneDeepLink) { params.iphone_deep_link = iPhoneDeepLink; }
        if (AndroidAppId) { params.googleplay_app_id = AndroidAppId; }
        if (AndroidDeepLink) { params.googleplay_deep_link = AndroidDeepLink; }
        if (iPadAppId) { params.ipad_app_id = iPadAppId; }
        if (iPadDeepLink) { params.ipad_deep_link = iPadDeepLink; }
        if (appCTA) { params.app_cta = appCTA; }

        console.log(params)

        return await requestTwitterService.post(accessToken, accessTokenSecret, url, params);
    }

    /*
        Media middleware
     */

    public async uploadMedia(accessToken, accessTokenSecret, filePath): Promise<any> {
        const t = new twit({
            consumer_key: this.apiKey,
            consumer_secret: this.apiSecret,
            access_token: accessToken,
            access_token_secret: accessTokenSecret,
        });
        const p = new Promise((resolve, reject) => {
            t.postMediaChunked({file_path: filePath}, (error, data, response) => {
                if (error) { reject(error); }
                resolve(data.media_id_string);
            });
        });
        return p;
    }

    public async getMediaKey(accessToken, accessTokenSecret, accountId, mediaId, fileMimetype) {
        let mediaCategory: string;
        mediaCategory = fileMimetype.indexOf("gif") !== -1 ? "TWEET_GIF" :
            mediaCategory = fileMimetype.indexOf("image") !== -1 ? "TWEET_IMAGE" : "TWEET_VIDEO";

        const url = `https://ads-api.twitter.com/3/accounts/${accountId}/media_library`;
        const params = {
            account_id: accountId,
            media_id: mediaId,
            media_category: mediaCategory,
        };

        const data = await requestTwitterService.post(accessToken, accessTokenSecret, url, params);

        return data.data.media_key;
    }
}
