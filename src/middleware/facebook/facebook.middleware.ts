import FB, {FacebookApiException} from "fb";
import * as request from "request-promise";

import config from "../../config/config";
import {logger} from "../../config/logger";

export class FacebookMiddleware {

    public async getAccessToken(code: string): Promise<any> {

        const clientId = config.facebookAPI.clientId;
        const clientSecret = config.facebookAPI.clientSecret;
        const redirectUri = config.facebookAPI.redirectUri;

        try {

            const accessToken = await FB.api("oauth/access_token", {
                client_id: (clientId),
                client_secret: (clientSecret),
                redirect_uri: (redirectUri),
                code: (code),
            });

            // TODO extend expiration date with a task!
            // // Extend access_token expiration
            // accessToken = await FB.api("oauth/access_token", {
            //     client_id: (clientId),
            //     client_secret: (clientSecret),
            //     grant_type: "fb_exchange_token",
            //     fb_exchange_token: (accessToken.access_token),
            // });

            return accessToken;

        } catch (err) {
            logger.error(err);
            throw new Error(err);
        }
    }

    public async getFacebookInfo(accessToken: string): Promise<any> {
        return await FB.api("me", {fields: "id, name, email", access_token: (accessToken)});
    }

    public async makeSimpleRequest(): Promise<string> {
        try {
            const options = {
                uri: "http://api.fuelbanner.com:80/listAvailablePromos",
                headers: {
                    "cache-control": "no-cache",
                    "postman-token": "512fe870-7985-28aa-e8fe-d0f663c5f36e",
                },
            };

            const response = await request.get(options);
            return (response);

        } catch (err) {
            logger.error(err);
            throw new Error(err);
        }
    }
}
