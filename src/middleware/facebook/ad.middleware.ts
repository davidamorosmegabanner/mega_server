import * as adsSdk from "facebook-nodejs-ads-sdk";
import * as FormData from "form-data";
import * as zip from "node-zip";

import config from "../../config/config";
import {FileService} from "../../services/file.service";
import {RequestService} from "../../services/request.service";

const fileService = new FileService();
const requestService = new RequestService();

export class FacebookAdMiddleware {

    public clientId: string = config.facebookAPI.clientId;
    public clientSecret: string = config.facebookAPI.clientSecret;
    public redirectUri: string = config.facebookAPI.redirectUri;
    public apiVersion: string = config.facebookAPI.apiVersion;
    public facebookURL: string = config.facebookAPI.facebookURL;


    /*
        Ad Image
     */

    public async uploadImage(file: string, adAccountId: string, accessToken: string) {
        const url = `${this.facebookURL}/${this.apiVersion}/act_${adAccountId}/adimages`;

        const data = {
            bytes: await fileService.encodeBase64(file),
            access_token: (accessToken),
        };

        return (await requestService.post(url, data)).images.bytes; // returns object with props "hash" and "url"
    }

    /*
        Creative
     */

    public async createCreative(
        name: string,
        campaignId: string,
        creativeTitle: string,
        creativeBody: string,
        objectUrl: string,
        imageHash: string,
        adAccountId: string,
        accessToken: string,
    ) {
        return null;
    }

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
        Campaign
     */

    public async listCampaigns(adAccountId: string, accessToken: string): Promise<any> {
        const url =
            `${this.facebookURL}/${this.apiVersion}/act_${adAccountId}/campaigns` +
            `?access_token=${accessToken}&fields=id,name`;

        return await requestService.get(url);
    }

    public async createCampaign(
        name: string, objective: string, adAccountId: string, accessToken: string, status?: string,
    ): Promise<object> {

            let outStatus = "PAUSED";
            if (status && status.length) {outStatus = (status); }

            const url = `${this.facebookURL}/${this.apiVersion}/act_${adAccountId}/campaigns`;
            const form = {
                name: (name),
                objective: (objective),
                status: (outStatus),
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
