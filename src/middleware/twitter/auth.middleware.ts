import * as twitterAPI from "node-twitter-api";
import {OAuth2} from "oauth";
import config from "../../config/config";

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
                if (error) {
                    reject(error);
                } else {
                    resolve({
                        requestToken: (requestToken),
                        requestTokenSecret: (requestTokenSecret),
                    });
                }
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
            twitter.getAccessToken(requestToken, requestTokenSecret, oauth_verifier, (error, accessToken, accessTokenSecret) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({
                        accessToken: (accessToken),
                        accessTokenSecret: (accessTokenSecret),
                    });
                }
            });
        });
        return p;
    }

}
