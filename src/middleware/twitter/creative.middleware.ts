import {OAuth} from "oauth";
import * as twit from "twit";
import config from "../../config/config";

export class TwitterCreativeMiddleware {

    private apiKey: string = config.twitterAPI.apiKey;
    private apiSecret: string = config.twitterAPI.apiSecret;
    private redirectUri: string = config.twitterAPI.redirectUri;

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

        const t: OAuth = new OAuth(
            "https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token",
            this.apiKey, this.apiSecret, "1.0A", this.redirectUri, "HMAC-SHA1");

        const p = new Promise<String>((resolve, reject) => {
            t.post(
                `https://ads-api.twitter.com/3/accounts/${accountId}/media_library`,
                accessToken,
                accessTokenSecret,
                {
                    account_id: accountId,
                    media_id: mediaId,
                    media_category: mediaCategory,
                },
                (error, data, response) => {
                    if (error) { reject(error); }
                    const mediaKey = JSON.parse(data).data.media_key;
                    resolve(mediaKey);
                },
            );
        });
        return p;
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
        const t: OAuth = new OAuth(
            "https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token",
            this.apiKey, this.apiSecret, "1.0A", this.redirectUri, "HMAC-SHA1");
        const p: Object = new Promise<any>((resolve, reject) => {
            t.post(
                `https://ads-api.twitter.com/3/accounts/${accountId}/cards/website`,
                accessToken,
                accessTokenSecret,
                {
                    name: (name),
                    website_title: (websiteTitle),
                    website_url: (websiteUrl),
                    image_media_key: (imageMediaKey),
                },
                (error, data, response) => {
                    if (error) { reject(error); }
                    resolve(JSON.parse(data));
                },
            );
        });
        return p;
    }

    public async createWebsiteVideoCard(
        accessToken, accessTokenSecret,
        accountId,
        name,
        websiteTitle,
        websiteUrl,
        imageMediaKey,
    ): Promise<any> {
        const t: OAuth = new OAuth(
            "https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token",
            this.apiKey, this.apiSecret, "1.0A", this.redirectUri, "HMAC-SHA1");
        const p: Object = new Promise<any>((resolve, reject) => {
            t.post(
                `https://ads-api.twitter.com/3/accounts/${accountId}/cards/video_website`,
                accessToken,
                accessTokenSecret,
                {
                    name: (name),
                    title: (websiteTitle),
                    website_url: (websiteUrl),
                    video_id: (imageMediaKey),
                },
                (error, data, response) => {
                    if (error) { reject(error); }
                    resolve(JSON.parse(data));
                },
            );
        });
        return p;
    }

    // TODO create app cards
}
