import axios from "axios";
import FB, {FacebookApiException} from "fb";

import config from "../../config/config";
import {logger} from "../../config/logger";

export class FacebookPageMiddleware {

    private clientId: string = config.facebookAPI.clientId;
    private clientSecret: string = config.facebookAPI.clientSecret;
    private redirectUri: string = config.facebookAPI.redirectUri;
    private facebookURL: string = config.facebookAPI.facebookURL;

    /*
        Page middleware
     */

    public async getOwnedPages(accessToken: string): Promise<any> {

        const url =
            `${this.facebookURL}/me/accounts` +
            `?access_token=${accessToken}`;

        return (await axios(url)).data.data;
    }

}