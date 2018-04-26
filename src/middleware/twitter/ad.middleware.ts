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
        const t: OAuth = new OAuth(
            "https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token",
            this.apiKey, this.apiSecret, "1.0A", this.redirectUri, "HMAC-SHA1");

        const p: Object = new Promise<any>((resolve, reject) => {
            t.get(
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

}
