import * as twitterAPI from "node-twitter-api";
import * as oauth from "oauth";
import config from "../../config/config";
import {RequestTwitterService} from "../request.twitter.service";

const twitterRequestService = new RequestTwitterService();

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
        return new Promise<any>((resolve, reject) => {
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
    }

    // Coming from url authorization of the user
    public async getAccessToken(requestToken, requestTokenSecret, oauth_verifier): Promise<any> {
        return new Promise<any>((resolve, reject) => {
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
    }

    public async getAccount(accessToken, accessTokenSecret): Promise<any> {
        const url = "https://api.twitter.com/1.1/account/verify_credentials.json";
        return await twitterRequestService.get(accessToken, accessTokenSecret, url);
    }
}
