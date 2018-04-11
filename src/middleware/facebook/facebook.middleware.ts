import axios from "axios";
import FB, {FacebookApiException} from "fb";

import config from "../../config/config";
import {logger} from "../../config/logger";

export class FacebookMiddleware {

    private clientId: string = config.facebookAPI.clientId;
    private clientSecret: string = config.facebookAPI.clientSecret;
    private apiVersion: string = config.facebookAPI.apiVersion;
    private redirectUri: string = config.facebookAPI.redirectUri;
    private facebookURL: string = config.facebookAPI.facebookURL;

    /*
        Basic middleware
     */

    public async getAccessToken(code: string): Promise<any> {

        try {

            const accessToken = await FB.api("oauth/access_token", {
                client_id: (this.clientId),
                client_secret: (this.clientSecret),
                redirect_uri: (this.redirectUri),
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
        try {

            const url =
                `${this.facebookURL}//me` +
                `?fields=id,name,email` +
                `&access_token=${accessToken}`;

            return (await axios(url)).data;

        } catch (err) {
            logger.error(err);
            throw new Error(err);
        }
    }

    /*
        Business Manager middleware
     */

    public async getBusinessInfo(businessId: string, accessToken: string): Promise<any> {
        try {

            const url = `${this.facebookURL}/${businessId}` +
                `?access_token=${accessToken}` +
                `&fields=id,name,primary_page,vertical,timezone_id,created_by`;

            return (await axios(url)).data;

        } catch (err) {
            logger.error(err);
            throw new Error(err);
        }
    }

    public async getBusinesses(accessToken: string): Promise<any> {
        try {

            const url = `${this.facebookURL}/me/businesses` +
                `?access_token=${accessToken}`;

            return (await axios(url)).data;

        } catch (err) {
            logger.error(err);
            throw new Error(err);
        }
    }

    public async createBusiness(
        name: string, vertical: string, primaryPage: string, accessToken: string,
    ): Promise<any> {

        const url = `${this.facebookURL}/${this.apiVersion}/me/businesses`;
        const data = {
            name: (name),
            vertical: (vertical),
            primary_page: (primaryPage),
            access_token: (accessToken),
        };

        axios.post(url, data)
            .then((response: any) => {
                console.log(response.data);
                return(response.data);
            })
            .catch((error: any) => {
                console.error(error.response.data);
                throw new Error(error.response.data);
            });


    }

    public async updateBusinessInfo(businessId: string, accessToken: string,
                                    name: string, vertical: string, primaryPage: string,
    ): Promise<any> {

        const businessName = (name);
        const businessVertical = (vertical);
        const businessPrimaryPage = (primaryPage);

        const url = `${this.facebookURL}/${this.apiVersion}/me/businesses/`;
        const form = {
            name: (businessName),
            vertical: (businessVertical),
            primary_page: (businessPrimaryPage),
            access_token: (accessToken),
        };
        await axios.post(url, form)
            .then((response: any) => {
                console.log(response.data);
                return(response.data);
            })
            .catch((error: any) => {
                console.error(error.response.data);
                throw new Error(error.response.data);
            });

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
