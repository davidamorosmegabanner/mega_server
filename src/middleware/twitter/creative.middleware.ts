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
        if (text) {if (text.length > 240) { throw new Error("Max text length of 240 chars exceeded"); }}
        if (!text && !mediaIds) { throw new Error("Please specify a text or a media"); }

        // Create a string separated comma of mediaIds
        const mediaIdsForm = mediaIds.join(",");
        console.log(mediaIdsForm)

        const url = `https://ads-api${this.sandbox}.twitter.com/3/accounts/${accountId}/tweet`;
        const params: any = {};
        if (text) { params.text = text; }
        if (cardUri) { params.card_uri = cardUri; }
        if (mediaIdsForm.length) { params.media_ids = mediaIdsForm; }
        if (nullcast) { params.nullcast = nullcast; }

        console.log(params);

        const data = await requestTwitterService.post(accessToken, accessTokenSecret, url, params);
        console.log(data);
        return(data);
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
        let p = new Promise((resolve, reject) => {
            t.postMediaChunked({file_path: filePath}, (error, data, response) => {
                if (error) { reject(error); }
                console.log(data);
                resolve(data.media_id_string);
            });
        });
        return p;
    }

    public async getMediaKey(accessToken, accessTokenSecret, accountId, mediaId, fileMimetype) {
        let mediaCategory: string;
        if (fileMimetype.indexOf("gif") !== -1) { mediaCategory = "TWEET_GIF"; }
        else if (fileMimetype.indexOf("image") !== -1) { mediaCategory = "TWEET_IMAGE"; }
        else { mediaCategory = "TWEET_VIDEO"; }

        const url = `https://ads-api.twitter.com/3/accounts/${accountId}/media_library`;
        const params = {
            account_id: accountId,
            media_id: mediaId,
            media_category: mediaCategory,
        };

        const data = await requestTwitterService.post(accessToken, accessTokenSecret, url, params);

        return data.data.media_key;
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
        const url = `https://ads-api.twitter.com/3/accounts/${accountId}/cards/website`;
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
        const url = `https://ads-api.twitter.com/3/accounts/${accountId}/cards/video_website`;
        const params = {
            name: (name),
            title: (websiteTitle),
            website_url: (websiteUrl),
            video_id: (imageMediaKey),
        };

        const data = await requestTwitterService.post(accessToken, accessTokenSecret, url, params);

        return data;
    }

    // TODO create app cards
}
