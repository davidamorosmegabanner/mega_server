import config from "../../config/config";
import {RequestTwitterService} from "../../services/request.twitter.service";
import twitter from "../../config/seeds/twitter";

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
        let cursor: number = undefined;

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

    public async getPlatforms(accessToken, accessTokenSecret, g?: string, lang?: string): Promise<any> {
        let url = `https://ads-api.twitter.com/3/targeting_criteria/platforms?count=1000`;
        if (lang) { url += `&country_code=${lang}`; }

        return await requestTwitterService.get(accessToken, accessTokenSecret, url);
    }
}