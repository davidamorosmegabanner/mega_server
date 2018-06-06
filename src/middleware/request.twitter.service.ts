import {OAuth} from "oauth";
import config from "../config/config";

export class RequestTwitterService {

    private apiKey: string = config.twitterAPI.apiKey;
    private apiSecret: string = config.twitterAPI.apiSecret;
    private redirectUri: string = config.twitterAPI.redirectUri;

    // Twitter GET request
    public async get(accessToken: string, accessTokenSecret: string, url: string): Promise<any> {
        const r: OAuth = new OAuth(
            "https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token",
            this.apiKey, this.apiSecret, "1.0A", this.redirectUri, "HMAC-SHA1");

        return new Promise<string>((resolve, reject) => {
            r.get(
                url,
                accessToken,
                accessTokenSecret,
                (error, data, response) => {
                    if (error) { reject(error); }
                    const formattedData = JSON.parse(data);
                    resolve(formattedData);
                },
            );
        });
    }

    // OAuth POST Request
    public async post(accessToken: string, accessTokenSecret: string, url: string, params: object): Promise<any> {
        const r: OAuth = new OAuth(
            "https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token",
            this.apiKey, this.apiSecret, "1.0A", this.redirectUri, "HMAC-SHA1");
        return new Promise<string>((resolve, reject) => {
            r.post(
                url,
                accessToken,
                accessTokenSecret,
                params,
                (error, data, response) => {
                    if (error) { reject(error); }
                    const formattedData = JSON.parse(data);
                    resolve(formattedData);
                },
            );
        });
    }

    // OAuth PUT Request
    public async put(accessToken: string, accessTokenSecret: string, url: string, params: object): Promise<any> {
        const r: OAuth = new OAuth(
            "https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token",
            this.apiKey, this.apiSecret, "1.0A", this.redirectUri, "HMAC-SHA1");
        return new Promise<string>((resolve, reject) => {
            r.put(
                url,
                accessToken,
                accessTokenSecret,
                params,
                (error, data, response) => {
                    if (error) { reject(error); }
                    const formattedData = JSON.parse(data);
                    resolve(formattedData);
                },
            );
        });
    }

    // OAuth DELETE Request
    public async delete(accessToken: string, accessTokenSecret: string, url: string): Promise<any> {
        const r: OAuth = new OAuth(
            "https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token",
            this.apiKey, this.apiSecret, "1.0A", this.redirectUri, "HMAC-SHA1");
        return new Promise<string>((resolve, reject) => {
            r.delete(
                url,
                accessToken,
                accessTokenSecret,
                (error, data, response) => {
                    if (error) { reject(error); }
                    const formattedData = JSON.parse(data);
                    resolve(formattedData);
                },
            );
        });
    }
}
