import config from "../../config/config";
import twitter from "../../config/seeds/twitter";
import {RequestTwitterService} from "../../services/request.twitter.service";

const requestTwitterService = new RequestTwitterService();

export class TwitterTargetingMiddleware {

    private apiKey: string = config.twitterAPI.apiKey;
    private apiSecret: string = config.twitterAPI.apiSecret;

    private env = (process.env.NODE_ENV || "development");

    private sandbox = (this.env !== "production") ? "-sandbox" : "";

    public async getAppStoreCaregories(accessToken, accessTokenSecret, q?: string, store?: string) {
        let url = `https://ads-api.twitter.com/3/targeting_criteria/app_store_categories`;
        if (q && !store) { url += `?q=${q}`; }
        if (!q && store) { url += `?store=${store}`; }
        if (q && store) { url += `?q=${q}&store=${store}`; }

        return await requestTwitterService.get(accessToken, accessTokenSecret, url);
    }

    public async getDevices(accessToken, accessTokenSecret, q?: string): Promise<any> {
        let url = `https://ads-api.twitter.com/3/targeting_criteria/devices?count=1000`;
        if (q) { url += `&q=${q}`; }

        return await requestTwitterService.get(accessToken, accessTokenSecret, url);
    }

    public async getInterests(accessToken, accessTokenSecret, q?: string): Promise<any> {
        let url = `https://ads-api.twitter.com/3/targeting_criteria/interests?count=1000`;
        if (q) { url += `&q=${q}`; }

        return await requestTwitterService.get(accessToken, accessTokenSecret, url);
    }

    public async getLanguages(accessToken, accessTokenSecret, q?: string): Promise<any> {
        let url = `https://ads-api.twitter.com/3/targeting_criteria/languages?count=1000`;
        if (q) { url += `&q=${q}`; }

        return await requestTwitterService.get(accessToken, accessTokenSecret, url);
    }

    public async getLocations(accessToken, accessTokenSecret,
                              countryCode?: string, locationType?: string, q?: string): Promise<any> {
        // Check if location type is ok
        if (locationType && locationType !== "COUNTRIES" && locationType !== " REGIONS"
            && locationType !== "METROS" && locationType !== "CITIES" && locationType !== "POSTAL_CODES") {
            throw new Error("Location Type can only be COUNTRIES, REGIONS, METROS, CITIES, POSTAL_CODES");
        }

        const data: any = [];
        let cursor: number;

        // Iterate over all possible cursors
        while (true) {
            // Make url
            let url = `https://ads-api.twitter.com/3/targeting_criteria/locations?count=1000`;
            if (countryCode) { url += `&country_code=${countryCode}`; }
            if (locationType) { url += `&location_type=${locationType}`; }
            if (q) { url += `&q=${q}`; }

            // Do request
            const locationsPart = await requestTwitterService.get(accessToken, accessTokenSecret, url);

            // Add request data to all data accumulated
            data.push(locationsPart.data);

            // Break if there's no more data
            if (locationsPart.next_cursor && locationsPart.next_cursor.length) {
                cursor = locationsPart.next_cursor;
            } else {
                break;
            }
        }

        return data;
    }

    public async getNetworkOperators(accessToken, accessTokenSecret,
                                     countryCode?: string, q?: string): Promise<any> {
        let url = `https://ads-api.twitter.com/3/targeting_criteria/network_operators?count=1000`;
        if (countryCode) { url += `&country_code=${countryCode}`; }
        if (q) { url += `&q=${q}`; }

        return await requestTwitterService.get(accessToken, accessTokenSecret, url);
    }

    public async getPlatforms(accToken, accTokenSecret, g?: string, lang?: string): Promise<any> {
        let url = `https://ads-api.twitter.com/3/targeting_criteria/platforms?count=1000`;
        if (lang) { url += `&country_code=${lang}`; }

        return await requestTwitterService.get(accToken, accTokenSecret, url);
    }

    // Implemented in individual functions
    public async doTargeting(accToken, accTokenSecret, accountId,
                             lineItemId, targetingType, targetingValue): Promise<any> {
        switch (targetingType) {
            case "AGE": {
                return await this.targetAge(accToken, accTokenSecret, accountId, lineItemId, targetingValue);
            }
            case "DEVICE": {
                return await this.targetDevice(accToken, accTokenSecret, accountId, lineItemId, targetingValue);
            }
            case "GENDER": {
                return await this.targetGender(accToken, accTokenSecret, accountId, lineItemId, targetingValue);
            }
            case "INTEREST": {
                return await this.targetInterest(accToken, accTokenSecret, accountId, lineItemId, targetingValue);
            }
            case "LANGUAGE": {
                return await this.targetLanguage(accToken, accTokenSecret, accountId, lineItemId, targetingValue);
            }
            case "LOCATION": {
                return await this.targetLocation(accToken, accTokenSecret, accountId, lineItemId, targetingValue);
            }
            case "NETWORK_OPERATOR": {
                return await this.targetOperator(accToken, accTokenSecret, accountId, lineItemId, targetingValue);
            }
            case "PLATFORM": {
                return await this.targetPlatform(accToken, accTokenSecret, accountId, lineItemId, targetingValue);
            }
            case "WIFI_ONLY": {
                return await this.targetWifiOnly(accToken, accTokenSecret, accountId, lineItemId, targetingValue);
            }
            default: {
                throw new Error("Unknown or unsupported targeting option");
            }
        }
    }

    // Individual functions for targeting
    private async targetAge(accessToken, accessTokenSecret, accountId, lineItemId, targetingValue): Promise<any> {
        // Check targeting value is ok
        const acceptedValues = [
            "AGE_13_TO_24",
            "AGE_13_TO_34",
            "AGE_13_TO_49",
            "AGE_13_TO_54",
            "AGE_OVER_13",
            "AGE_18_TO_24",
            "AGE_18_TO_34",
            "AGE_18_TO_49",
            "AGE_18_TO_54",
            "AGE_OVER_18",
            "AGE_21_TO_34",
            "AGE_21_TO_49",
            "AGE_21_TO_54",
            "AGE_OVER_21",
            "AGE_25_TO_49",
            "AGE_25_TO_54",
            "AGE_OVER_25",
            "AGE_35_TO_49",
            "AGE_35_TO_54",
            "AGE_OVER_35",
            "AGE_OVER_50",
        ];
        if (acceptedValues.indexOf(targetingValue) === -1) {
            const url = `https://ads-api${this.sandbox}.twitter.com/3/accounts/${accountId}/targeting_criteria`;
            const params = {
                line_item_id: lineItemId,
                targeting_type: "AGE",
                targeting_value: targetingValue,
            };
            return await requestTwitterService.post(accessToken, accessTokenSecret, url, params);
        } else {
            throw new Error(`Unaccepted age targeting value. Accepted values are ${acceptedValues.join(",")}`);
        }
    }
    private async targetDevice(accessToken, accessTokenSecret, accountId, lineItemId, targetingValue): Promise<any> {
        const url = `https://ads-api${this.sandbox}.twitter.com/3/accounts/${accountId}/targeting_criteria`;
        const params = {
            line_item_id: lineItemId,
            targeting_type: "DEVICE",
            targeting_value: targetingValue,
        };
        return await requestTwitterService.post(accessToken, accessTokenSecret, url, params);
    }
    private async targetGender(accessToken, accessTokenSecret, accountId, lineItemId, targetingValue): Promise<any> {
        // Check targeting value is ok
        const acceptedValues = ["1","2"];
        if (acceptedValues.indexOf(targetingValue) === -1) {
            const url = `https://ads-api${this.sandbox}.twitter.com/3/accounts/${accountId}/targeting_criteria`;
            const params = {
                line_item_id: lineItemId,
                targeting_type: "GENDER",
                targeting_value: targetingValue,
            };
            return await requestTwitterService.post(accessToken, accessTokenSecret, url, params);
        } else {
            throw new Error(`Unaccepted gender targeting value. Accepted values are 1 (MALE) 2 (FEMALE)`);
        }
    }
    private async targetInterest(accessToken, accessTokenSecret, accountId, lineItemId, targetingValue): Promise<any> {
        const url = `https://ads-api${this.sandbox}.twitter.com/3/accounts/${accountId}/targeting_criteria`;
        const params = {
            line_item_id: lineItemId,
            targeting_type: "INTEREST",
            targeting_value: targetingValue,
        };
        return await requestTwitterService.post(accessToken, accessTokenSecret, url, params);
    }
    private async targetLanguage(accessToken, accessTokenSecret, accountId, lineItemId, targetingValue): Promise<any> {
        const url = `https://ads-api${this.sandbox}.twitter.com/3/accounts/${accountId}/targeting_criteria`;
        const params = {
            line_item_id: lineItemId,
            targeting_type: "LANGUAGE",
            targeting_value: targetingValue,
        };
        return await requestTwitterService.post(accessToken, accessTokenSecret, url, params);
    }
    private async targetLocation(accessToken, accessTokenSecret, accountId, lineItemId, targetingValue): Promise<any> {
        const url = `https://ads-api${this.sandbox}.twitter.com/3/accounts/${accountId}/targeting_criteria`;
        const params = {
            line_item_id: lineItemId,
            targeting_type: "LOCATION",
            targeting_value: targetingValue,
        };
        return await requestTwitterService.post(accessToken, accessTokenSecret, url, params);
    }
    private async targetOperator(accessToken, accessTokenSecret, accountId, lineItemId, targetingValue): Promise<any> {
        const url = `https://ads-api${this.sandbox}.twitter.com/3/accounts/${accountId}/targeting_criteria`;
        const params = {
            line_item_id: lineItemId,
            targeting_type: "NETWORK_OPERATOR",
            targeting_value: targetingValue,
        };
        return await requestTwitterService.post(accessToken, accessTokenSecret, url, params);
    }
    private async targetPlatform(accessToken, accessTokenSecret, accountId, lineItemId, targetingValue): Promise<any> {
        const url = `https://ads-api${this.sandbox}.twitter.com/3/accounts/${accountId}/targeting_criteria`;
        const params = {
            line_item_id: lineItemId,
            targeting_type: "PLATFORM",
            targeting_value: targetingValue,
        };
        return await requestTwitterService.post(accessToken, accessTokenSecret, url, params);
    }
    private async targetWifiOnly(accessToken, accessTokenSecret, accountId, lineItemId, targetingValue): Promise<any> {
        // Check targeting value is ok
        const acceptedValues = ["TRUE", "FALSE"];
        if (acceptedValues.indexOf(targetingValue) === -1) {
            const url = `https://ads-api${this.sandbox}.twitter.com/3/accounts/${accountId}/targeting_criteria`;
            const params = {
                line_item_id: lineItemId,
                targeting_type: "WIFI_ONLY",
                targeting_value: targetingValue,
            };
            return await requestTwitterService.post(accessToken, accessTokenSecret, url, params);
        } else {
            throw new Error(`Unaccepted wifi only value. Accepted values are ${acceptedValues.join(",")}`);
        }
    }
}
