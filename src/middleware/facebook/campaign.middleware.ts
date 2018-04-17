import config from "../../config/config";
import {RequestService} from "../../services/request.service";

const requestService = new RequestService();

export class FacebookCampaignMiddleware {

    public apiVersion: string = config.facebookAPI.apiVersion;
    public facebookURL: string = config.facebookAPI.facebookURL;

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
}
