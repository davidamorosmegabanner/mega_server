import * as twitterAPI from "node-twitter-api";
import * as oauth from "oauth";
import config from "../../config/config";

// IMPORTANT!
// node-twiter-api only used with triple factor auth
// For other uses twitter library is used

export class TwitterAuthMiddleware {

    private apiKey: string = config.twitterAPI.apiKey;
    private apiSecret: string = config.twitterAPI.apiSecret;
    private redirectUri: string = config.twitterAPI.redirectUri;

    /*
        Auth middleware
     */

    // To make URL request for user
    // https://twitter.com/oauth/authenticate?oauth_token=[requestToken]
    public async getRequestToken(): Promise<any> {
        const p: object = new Promise<any>((resolve, reject) => {
            const twitter = new twitterAPI({
                consumerKey: this.apiKey,
                consumerSecret: this.apiSecret,
                callback: this.redirectUri,
            });
            twitter.getRequestToken((error, requestToken, requestTokenSecret) => {
                if (error) { reject(error); }
                resolve({
                    requestToken: (requestToken),
                    requestTokenSecret: (requestTokenSecret),
                });
            });
        });
        return p;
    }

    // Coming from url authorization of the user
    public async getAccessToken(requestToken, requestTokenSecret, oauth_verifier): Promise<any> {
        const p: object = new Promise<any>((resolve, reject) => {
            const twitter = new twitterAPI({
                consumerKey: this.apiKey,
                consumerSecret: this.apiSecret,
                callback: this.redirectUri,
            });
            twitter.getAccessToken(
                requestToken, requestTokenSecret, oauth_verifier,
                (error, accessToken, accessTokenSecret) => {
                    if (error) { reject(error); }
                    resolve({
                        accessToken: (accessToken),
                        accessTokenSecret: (accessTokenSecret),
                    });
                },
            );
        });
        return p;
    }

    public async getAccount(accessToken, accessTokenSecret): Promise<any> {
        const t = new oauth.OAuth(
            "https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token",
            this.apiKey, this.apiSecret, "1.0A", this.redirectUri, "HMAC-SHA1");

        const p: Object = new Promise<any>((resolve, reject) => {
            t.get(
                "https://api.twitter.com/1.1/account/verify_credentials.json",
                accessToken,
                accessTokenSecret,
                (error, data, response) => {
                    if (error) { reject(error); }
                    resolve(JSON.parse(data));
                },
            );
        });
        return p;
    }
}
