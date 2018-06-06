import {logger} from "../../config/logger";
import {Campaign} from "../../models/campaign/campaign.model";
import {CampaignService} from "../../models/campaign/campaign.service";

const campaignService = new CampaignService();
export class UpdaterCron {

    public interval = "1MIN";
    public campaignThreshold = 2;
    public async start() {
        logger.info("Updater cron started...");

        try {
            // 1 - Get all active and non deleted campaigns
            const allCampaigns: Campaign[] = await campaignService.getAll();
            Promise.all(allCampaigns.map(async (campaign) => {
                // A - Campaign has no budget but is active -> Change to not active
                if (campaign.budget < this.campaignThreshold && campaign.valid) {
                    await campaignService.changeToNotValid(campaign);
                // B - Campaign has budget and is not valid -> Change to active
                } else if (campaign.budget > this.campaignThreshold && !campaign.valid) {
                    await campaignService.changeToValid(campaign);
                }
            }));
            logger.info("Updater cron finished");
        } catch (err) {
            logger.info("Updater cron error:");
            logger.error(err);
            throw new Error(err);
        }
    }
}
