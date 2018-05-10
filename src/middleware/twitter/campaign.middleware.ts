import * as moment from "moment";
import {OAuth} from "oauth";

import {RequestTwitterService} from "../../services/request.twitter.service";

const twitterRequestService = new RequestTwitterService();

export class TwitterCampaignMiddleware {
    private env = (process.env.NODE_ENV || "development");
    private sandbox = (this.env !== "production" && this.env !== "test") ? "-sandbox" : "";

    /*
        Funding instrument
     */

    public async makeFundingInstrument(accessToken, accessTokenSecret, accountId) {
        const NOW = new Date();

        if (this.env === "production") { throw new Error("Cannot make a funding instrument in production"); }

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

    public async getFundingInstrument(accessToken, accessTokenSecret, accountId) {
        const url = `https://ads-api${this.sandbox}.twitter.com/3/accounts/${accountId}/funding_instruments`;
        return await twitterRequestService.get(accessToken, accessTokenSecret, url);
    }

    /*
        Line item
     */

    public async getLineItems(accessToken, accessTokenSecret, accountId): Promise<any> {
        const url = `https://ads-api${this.sandbox}.twitter.com/3/accounts/${accountId}/line_items`;
        return await twitterRequestService.get(accessToken, accessTokenSecret, url);
    }

    public async createLineItem(
        accessToken, accessTokenSecret, accountId,
        campaignId, objective, placements, productType,
        advertiserDomain?, lineItemStatus?, lookalikeExpansion?, optimization?,
    ): Promise<any> {
        // Check params are ok
        if (objective !== "APP_ENGAGEMENTS" && objective !== "APP_INSTALLS" && objective !== "AWARENESS"
            && objective !== "FOLLOWERS" && objective !== "TWEET_ENGAGEMENTS" && objective !== "VIDEO_VIEWS"
            && objective !== "VIDEO_VIEWS_PREROLL" && objective !== "WEBSITE_CLICKS") {
            throw new Error("Invalid objective. Accepted objectives:APP_ENGAGEMENTS, APP_INSTALLS," +
                "AWARENESS, FOLLOWERS, TWEET_ENGAGEMENTS, VIDEO_VIEWS, VIDEO_VIEWS_PREROLL, WEBSITE_CLICKS");
        }
        if (placements !== "ALL_ON_TWITTER" && placements !== "PUBLISHER_NETWORK" && placements !== "TWITTER_PROFILE"
            && placements !== "TWITTER_SEARCH" && placements !== "TWITTER_TIMELINE") {
            throw new Error("Invalid placement. Accepted placements:" +
                "ALL_ON_TWITTER, PUBLISHER_NETWORK, TWITTER_PROFILE, TWITTER_SEARCH, TWITTER_TIMELINE");
        }
        if (productType !== "MEDIA" && productType !== "PROMOTED_ACCOUNT" && productType !== "PROMOTED_TWEETS") {
            throw new Error("Invalid product type. Accepted product types: MEDIA, PROMOTED_ACCOUNT, PROMOTED_TWEETS");
        }
        if (productType === "PUBLISHER_NETWORK" && !advertiserDomain) {
            throw new Error("You must specify an advertiser domain for a PUBLISHER_NETWORK ad");
        }
        if (lineItemStatus
            && lineItemStatus !== "ACTIVE" && lineItemStatus !== "DRAFT" && lineItemStatus !== "PAUSED") {
            throw new Error("Invalid Line Item Status. Accepted line item statuses are: ACTIVE, DRAFT, PAUSED");
        }
        if (lookalikeExpansion
            && lookalikeExpansion !== "BALANCED" && lookalikeExpansion !== "BROAD" && lookalikeExpansion !== "NARROW") {
            throw new Error("Invalid Line Item Status. Accepted line item statuses are: BALANCED, BROAD, NARROW");
        }
        if (optimization
            && optimization !== "DEFAULT" && optimization !== "ENGAGEMENTS" && optimization !== "WEBSITE_CONVERSIONS") {
            throw new Error("Invalid Optimization. Accepted are: DEFAULT, ENGAGEMENTS, WEBSITE_CONVERSIONS");
        }

        // Create request params
        const url = `https://ads-api${this.sandbox}.twitter.com/3/accounts/${accountId}/line_items`;
        const params: any = {
            campaign_id: campaignId,
            objective: (objective),
            placements: (placements),
            product_type: productType,
            automatically_select_bid: "true",
        };
        if (advertiserDomain) { params.advertiser_domain = advertiserDomain; }
        if (lineItemStatus) { params.entity_status = lineItemStatus; } else { params.entity_status = "PAUSED"; }
        if (lookalikeExpansion) { params.lookalike_expansion = lookalikeExpansion; }
        if (optimization) { params.optimization = optimization; }

        // Go
        return await twitterRequestService.post(accessToken, accessTokenSecret, url, params);
    }

    /*
        Promoted tweet
     */

    public async createPromotedTweets(accessToken, accessTokenSecret, accountId,
                                     lineItemId: string, tweetsId: string[]): Promise<any> {
        const url = `https://ads-api${this.sandbox}.twitter.com/3/accounts/${accountId}/promoted_tweets`;
        const params = {
            line_item_id: lineItemId,
            tweet_ids: tweetsId.join("'"),
        };
        return await twitterRequestService.post(accessToken, accessTokenSecret, url, params);
    }
    /*
        Promoted account
     */

    public async createPromotedAccount(accessToken, accessTokenSecret, accountId,
                                      lineItemId: string, userId: string[]): Promise<any> {
        const url = `https://ads-api${this.sandbox}.twitter.com/3/accounts/${accountId}/promoted_accounts`;
        const params = {
            line_item_id: lineItemId,
            user_id: userId,
        };
        return await twitterRequestService.post(accessToken, accessTokenSecret, url, params);
    }

    /*
        Campaign
     */

    public async getCampaigns(accessToken, accessTokenSecret, accountId): Promise<any> {
        const url = `https://ads-api${this.sandbox}.twitter.com/3/accounts/${accountId}/campaigns`;
        return await twitterRequestService.get(accessToken, accessTokenSecret, url);
    }

    public async getCampaignWithId(accessToken, accessTokenSecret, accountId, campaignId): Promise<any> {
        const url = `https://ads-api${this.sandbox}.twitter.com/3/accounts/${accountId}/campaigns/${campaignId}`;
        return await twitterRequestService.get(accessToken, accessTokenSecret, url);
    }

    public async createCampaign(accessToken, accessTokenSecret, accountId,
                                dailyBudget: number, fundingInstrumentId: string,
                                name: string, startDate: Date, endDate: Date,
                                campaignStatus?: string, standardDelivery?: boolean, totalBudget?: number,
                                ): Promise<any> {
        // Check some params are ok
        if (campaignStatus
            && campaignStatus !== "ACTIVE" && campaignStatus !== "DRAFT" && campaignStatus !== "PAUSED") {
            throw new Error("Accepted values for campaign status are ACTIVE, DRAFT, PAUSED");
        }

        // Create request params
        const url = `https://ads-api${this.sandbox}.twitter.com/3/accounts/${accountId}/campaigns`;
        const params: any = {
            daily_budget_amount_local_micro: dailyBudget * 1000 * 1000,
            funding_instrument_id: fundingInstrumentId,
            name: (name),
            start_time: moment(startDate).format("YYYY-MM-DDTHH:mm:ss[Z]"),
            end_time: moment(endDate).format("YYYY-MM-DDTHH:mm:ss[Z]"),
        };
        // + optional params
        if (campaignStatus) { params.entity_status = campaignStatus; } else { params.entity_status = "PAUSED"; }
        if (typeof standardDelivery === "boolean") { params.standard_delivery = standardDelivery; }
        if (totalBudget) { params.total_budget_amount_local_micro = totalBudget * 1000 * 1000; }

        // Go
        return await twitterRequestService.post(accessToken, accessTokenSecret, url, params);
    }
}
