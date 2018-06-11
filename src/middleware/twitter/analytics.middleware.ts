import moment = require("moment");

import {RequestTwitterService} from "../request.twitter.service";

const requestTwitterService = new RequestTwitterService();

export class TwitterAnalyticsMiddleware {
    private env = (process.env.NODE_ENV || "development");
    private sandbox = (this.env !== "production" && this.env !== "test") ? "-sandbox" : "";

    public async getStats(accessToken, accessTokenSecret, accountId,
                          entity, entityIds: string[], startTime: Date, endTime: Date): Promise<any> {
        const startTimeForm = moment(startTime).toISOString();
        const endTimeForm = moment(endTime).toISOString();
        const url = `https://ads-api${this.sandbox}.twitter.com/3/stats/accounts/${accountId}`
                    + `?entity=${entity}&entity_ids=${entityIds.join(",")}`
                    + `&start_time=${startTimeForm}&end_time=${endTimeForm}`
                    + `&granularity=HOUR&metric_groups=BILLING,ENGAGEMENT&placement=ALL_ON_TWITTER`;
        return await requestTwitterService.get(accessToken, accessTokenSecret, url);
    }
}
