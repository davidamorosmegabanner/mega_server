import {OAuth} from "oauth";
import {RequestTwitterService} from "../../services/request.twitter.service";

const requestTwitterService = new RequestTwitterService();

export class TwitterAdMiddleware {

    private env = (process.env.NODE_ENV || "development");

    /*
        Ad middleware
     */

    // Returns first ad account owned by user
    public async getAdAccount(accessToken, accessTokenSecret): Promise<any> {
        const url = "https://ads-api.twitter.com/3/accounts";
        const data = await requestTwitterService.get(accessToken, accessTokenSecret, url);

        return data.data[0];
    }

    // Gets a sandbox account, if not creates an account in sandbox mode
    public async makeSandboxAccount(accessToken, accessTokenSecret): Promise<any> {
        if (this.env === "production") { throw new Error("Cannot create a funding instrument in production"); }

        const url = "https://ads-api-sandbox.twitter.com/3/accounts";
        let data = await requestTwitterService.get(accessToken, accessTokenSecret, url);

        if (data.data.length === 0) {
            const params = {};
            data = await requestTwitterService.post(accessToken, accessTokenSecret, url, params);
        }

        return data;
    }

}
