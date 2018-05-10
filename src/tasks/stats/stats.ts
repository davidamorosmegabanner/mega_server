import {Ad} from "../../models/ad/ad.model";
import {AdService} from "../../models/ad/ad.service";
import {AdTypeService} from "../../models/adType/adType.service";
import {Campaign} from "../../models/campaign/campaign.model";
import {Platform} from "../../models/platform/platform";
import {CampaignService} from "../../models/campaign/campaign.service";

const campaignService = new CampaignService();
const adService = new AdService();
const adTypeService = new AdTypeService();

export class StatsCron {

    public interval = "* 0 * * * * *"; // Every hour

    public start() {
        
    }

    private async getCampaigns(): Promise<Campaign[]> {
        return await campaignService.getAll();
    }

    private async getAds(campaigns: Campaign[]): Promise<Ad[]> {
        let ads: Ad[];

        campaigns.map(async (campaign) => {
            ads.push(...(await adService.getCampaignAds(campaign)));
        });

        return ads;
    }
}
