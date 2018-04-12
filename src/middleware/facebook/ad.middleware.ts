import axios from "axios";
import config from "../../config/config";
import {logger} from "../../config/logger";

export class FacebookAdMiddleware {

    private clientId: string = config.facebookAPI.clientId;
    private clientSecret: string = config.facebookAPI.clientSecret;
    private redirectUri: string = config.facebookAPI.redirectUri;
    private apiVersion: string = config.facebookAPI.apiVersion;
    private facebookURL: string = config.facebookAPI.facebookURL;

    /*
        Ad account
     */

    public async getAdAccounts(userId: string, accessToken: string): Promise<any> {
        const url =
            `${this.facebookURL}/${this.apiVersion}/${userId}/adaccounts` +
            `?access_token=${accessToken}`;

        return (await axios(url)).data.data;
    }

    // TODO test
    public async createAdAccount(
        name: string, currency: string, timezoneId: string, endAdvertiser: string,
        mediaAgency: string, accessToken: string, businessId: string,
    ): Promise<any> {
        const url = `${this.facebookURL}/${this.apiVersion}/${businessId}/adaccount`;
        const form = {
            name: (name),
            currency: (currency),
            timezone_id: (timezoneId),
            end_advertiser: (endAdvertiser),
            media_agency: (mediaAgency),
            partner: "NONE",
            access_token: (accessToken),
        };
        await axios.post(url, form)
            .then((response: any) => {
                logger.info(response.data);
                return(response.data);
            })
            .catch((error: any) => {
                logger.error(error.response.data);
                throw new Error(error.response.data);
            });
    }

    /*
        Campaign
     */

    public async createCampaign(name: string, objective: string, accessToken: string, status?: string) {
        if (!status) {const status = "PAUSED"; }

        return null;
    }

}
