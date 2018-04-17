import config from "../../config/config";
import {RequestService} from "../../services/request.service";

const requestService = new RequestService();

export class FacebookAdMiddleware {

    public clientId: string = config.facebookAPI.clientId;
    public clientSecret: string = config.facebookAPI.clientSecret;
    public redirectUri: string = config.facebookAPI.redirectUri;
    public apiVersion: string = config.facebookAPI.apiVersion;
    public facebookURL: string = config.facebookAPI.facebookURL;

    /*
        Ad
     */

    public async createAd(
        name: string,
        campaignId: string,
        creativeTitle: string,
        creativeBody: string,
        objectUrl: string,
        imageHash: string,
        adAccountId: string,
        accessToken: string,
    ): Promise<object> {
        const url = `${this.facebookURL}/${this.apiVersion}/act_${adAccountId}/ads`;
        const form = {
            name: (name),
            campaign_id: (campaignId),
            creative: JSON.stringify({
                title: (creativeTitle),
                body: (creativeBody),
                object_url: (objectUrl),
                image_hash: (imageHash),
            }),
            status: "ACTIVE",
            access_token: (accessToken),
        };

        return await requestService.post(url, form);
    }

    /*
        Ad account
     */

    public async getAdAccount(userId: string, accessToken: string): Promise<any> {
        const url =
            `${this.facebookURL}/${this.apiVersion}/${userId}/adaccounts` +
            `?access_token=${accessToken}`;

        return (await requestService.get(url)).data[0];
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

        return await requestService.post(url, form);
    }
}
