import {OAuth} from "oauth";

import config from "../../config/config";

export class TwitterCampaignMiddleware {

    private apiKey: string = config.twitterAPI.apiKey;
    private apiSecret: string = config.twitterAPI.apiSecret;
    private redirectUri: string = config.twitterAPI.redirectUri;

    private env = (process.env.NODE_ENV || "development");

    private sandbox = (this.env !== "production") ? "-sandbox" : "";

    /*
        Funding instruments middleware
     */

    public async createFundingInstrument(accessToken, accessTokenSecret, accountId) {
        const NOW = new Date();

        const error = (this.env === "production") ? "Cannot create a fund. instrument in production" : null;
        if (error) { throw new Error(error); }

        const t: OAuth = new OAuth(
            "https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token",
            this.apiKey, this.apiSecret, "1.0A", this.redirectUri, "HMAC-SHA1");

        const p = new Promise<String>((resolve, reject) => {
            t.get(
                `https://ads-api${this.sandbox}.twitter.com/3/accounts/${accountId}/funding_instruments`,
                accessToken,
                accessTokenSecret,
                (error, data, response) => {
                    if (error) { reject(error); }
                    if (data.data.length === 0) {
                        t.post(
                            `https://ads-api${this.sandbox}.twitter.com/3/accounts/${accountId}/funding_instruments`,
                            accessToken,
                            accessTokenSecret,
                            {
                                currency: "EUR",
                                start_time: "2018-04-26T17:52:02Z",
                                type: "CREDIT_CARD",
                            },
                            (error, data, response) => {
                                if (error) { reject(error); }
                                resolve(JSON.parse(data));
                            },
                        );
                    }
                    resolve(JSON.parse(data));
                },
            );
        });
        return p;
    }


}
