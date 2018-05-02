import axios from "axios";
import FB, {FacebookApiException} from "fb";

import config from "../../config/config";
import {logger} from "../../config/logger";

export class FacebookAuthMiddleware {

    private clientId: string = config.facebookAPI.clientId;
    private clientSecret: string = config.facebookAPI.clientSecret;
    private redirectUri: string = config.facebookAPI.redirectUri;
    private facebookURL: string = config.facebookAPI.facebookURL;

    /*
        Basic middleware
     */

    public async getAccessToken(code: string): Promise<any> {

        try {

            return await FB.api("oauth/access_token", {
                client_id: (this.clientId),
                client_secret: (this.clientSecret),
                redirect_uri: (this.redirectUri),
                code: (code),
            });

        } catch (err) {
            logger.error(err);
            throw new Error(err);
        }
    }

    public async getFacebookInfo(accessToken: string): Promise<any> {
        try {

            const url =
                `${this.facebookURL}/me` +
                `?fields=id,name,email` +
                `&access_token=${accessToken}`;

            return (await axios(url)).data;

        } catch (err) {
            logger.error(err);
            throw new Error(err);
        }
    }

    public async getPermissions(userId: string, accessToken: string): Promise<any> {
        try {

            const url =
                `${this.facebookURL}/` +
                `${userId}/` +
                `permissions/` +
                `?access_token=${accessToken}`;

            return (await axios(url)).data;

        } catch (err) {
            logger.error(err);
            throw new Error(err);
        }
    }

    /*
        Other middleware
     */

    public async makeSimpleRequest(): Promise<string> {
        try {
            const uri = "http://api.fuelbanner.com:80/listAvailablePromos";
            const options = {
                headers: {
                    "cache-control": "no-cache",
                },
            };

            return (await axios(uri, options)).data;

        } catch (err) {
            logger.error(err);
            throw new Error(err);
        }
    }
}
