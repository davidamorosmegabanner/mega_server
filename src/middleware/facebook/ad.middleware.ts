import axios from "axios";
import config from "../../config/config";
import {logger} from "../../config/logger";

export class FacebookAdMiddleware {

    public clientId: string = config.facebookAPI.clientId;
    public clientSecret: string = config.facebookAPI.clientSecret;
    public redirectUri: string = config.facebookAPI.redirectUri;
    public apiVersion: string = config.facebookAPI.apiVersion;
    public facebookURL: string = config.facebookAPI.facebookURL;

    /*
        Ad account
     */

    public async getAdAccount(userId: string, accessToken: string): Promise<any> {
        const url =
            `${this.facebookURL}/${this.apiVersion}/${userId}/adaccounts` +
            `?access_token=${accessToken}`;

        return (await axios(url)).data.data[0];
    }

    // TODO when app is not in development mode
    public async createAdAccount(
        name: string, currency: string, timezoneId: string, endAdvertiser: string,
        mediaAgency: string, businessId: string, accessToken: string,
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

    public async createCampaignSimple(
        name: string, objective: string, adAccountId: string, accessToken: string, status?: string,
    ): Promise<object> {
        const p: object = new Promise<string>((resolve, reject) => {

            let outStatus = "PAUSED";
            if (status && status.length) {outStatus = (status); }

            const url = `${this.facebookURL}/${this.apiVersion}/act_${adAccountId}/campaigns`;
            const form = {
                name: (name),
                objective: (objective),
                status: (outStatus),
                access_token: (accessToken),
            };
            axios.post(url, form)
                .then((response: any) => {
                    logger.info(response.data);
                    resolve(response.data);
                })
                .catch((error: any) => {
                    logger.error(error.response.data);
                    reject(error.response.data);
                });

        });
        return p;
    }
}
