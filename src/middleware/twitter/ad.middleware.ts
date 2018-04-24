import {OAuth} from "oauth";
import config from "../../config/config";

export class TwitterAdMiddleware {

    private apiKey: string = config.twitterAPI.apiKey;
    private apiSecret: string = config.twitterAPI.apiSecret;
    private redirectUri: string = config.twitterAPI.redirectUri;

    /*
        Ad middleware
     */

    // Returns first ad account owned by user
    public async getAdAccount(accessToken, accessTokenSecret): Promise<any> {
        const consumer: OAuth = new OAuth(
            "https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token",
            this.apiKey, this.apiSecret, "1.0A", this.redirectUri, "HMAC-SHA1");

        const p: Object = new Promise<any>((resolve, reject) => {
            consumer.get(
                "https://ads-api.twitter.com/3/accounts",
                accessToken,
                accessTokenSecret,
                (error, data, response) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(JSON.parse(data).data[0]);
                    }
                },
            );
        });
        return p;
    }

    // TODO test after image & video upload
    public async createWebsiteCard(
        accessToken, accessTokenSecret,
        accoundId,
        name,
        websiteTitle,
        websiteUrl,
        imageMediaId,
    ): Promise<any> {
        const consumer: OAuth = new OAuth(
            "https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token",
            this.apiKey, this.apiSecret, "1.0A", this.redirectUri, "HMAC-SHA1");

        const p: Object = new Promise<any>((resolve, reject) => {
            consumer.post(
                `https://ads-api.twitter.com/3/accounts/` +
                `${accoundId}/cards/website` +
                `?name=${name}` +
                `?website_title=${websiteTitle}` +
                `?website_url=${websiteUrl}` +
                `?image_media_id=${imageMediaId}`,
                accessToken,
                accessTokenSecret,
                (error, data, response) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(JSON.parse(data).data[0]);
                    }
                },
            );
        })
    }
}
