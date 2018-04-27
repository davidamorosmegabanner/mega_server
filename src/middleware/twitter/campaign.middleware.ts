import * as moment from "moment";
import {OAuth} from "oauth";

import {RequestTwitterService} from "../../services/request.twitter.service";

const twitterRequestService = new RequestTwitterService();

export class TwitterCampaignMiddleware {

    private env = (process.env.NODE_ENV || "development");

    private sandbox = (this.env !== "production") ? "-sandbox" : "";

    /*
        Funding instruments middleware
     */

    public async createFundingInstrument(accessToken, accessTokenSecret, accountId) {
        const NOW = new Date();

        if (this.env === "production") { throw new Error("Cannot create a funding instrument in production"); }

        const url = `https://ads-api${this.sandbox}.twitter.com/3/accounts/${accountId}/funding_instruments`;

        let data = await twitterRequestService.get(accessToken, accessTokenSecret, url);

        if (data.data.length === 0) {
            const params = {
                currency: "EUR",
                start_time: moment().format("YYYY-MM-DDTHH:mm:ss[Z]"),
                type: "CREDIT_CARD",
            };
            data = await twitterRequestService.post(accessToken, accessTokenSecret, url, params);
        }
        return data;
    }
}
