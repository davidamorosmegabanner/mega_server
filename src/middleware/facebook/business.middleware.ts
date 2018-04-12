import axios from "axios";

import config from "../../config/config";
import {logger} from "../../config/logger";

export class FacebookBusinessMiddleware {

    private apiVersion: string = config.facebookAPI.apiVersion;
    private facebookURL: string = config.facebookAPI.facebookURL;

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

            const response = await axios(url);
            return response.data.data;
        } catch (err) {
            logger.error(err);
            throw new Error(err);
        }
    }

    public async updateBusinessInfo(businessId: string, accessToken: string,
                                    name: string, vertical: string, primaryPage: string,
    ): Promise<any> {

        const businessName = (name);
        const businessVertical = (vertical);
        const businessPrimaryPage = (primaryPage);

        const url = `${this.facebookURL}/${this.apiVersion}/${businessId}/`;
        const form = {
            name: (businessName),
            vertical: (businessVertical),
            // primary_page: (businessPrimaryPage),
            access_token: (accessToken),
        };
        await axios.post(url, form)
            .then((response: any) => {
                logger.info(response.data.id);
                return(response.data);
            })
            .catch((error: any) => {
                logger.error(error.response.data);
                throw new Error(error.response.data);
            });

    }

    // NOT WORKING!!!!!
    public async createBusiness(
        userId: string, name: string, vertical: string, primaryPage: string, accessToken: string,
    ): Promise<any> {

        const url = `${this.facebookURL}/${this.apiVersion}/${userId}/businesses`;
        const data = {
            name: (name),
            vertical: (vertical),
            primary_page: (primaryPage),
            access_token: (accessToken),
        };

        axios.post(url, data)
            .then((response: any) => {
                logger.info(response.data);
                return(response.data);
            })
            .catch((error: any) => {
                logger.error(error.response.data);
                throw new Error(error.response.data);
            });
    }
}
