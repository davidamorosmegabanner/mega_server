import config from "../../config/config";
import {FileService} from "../../services/file.service";
import {RequestService} from "../../services/request.service";

const fileService = new FileService();
const requestService = new RequestService();

export class FacebookAdCreativeMiddleware {

    public apiVersion: string = config.facebookAPI.apiVersion;
    public facebookURL: string = config.facebookAPI.facebookURL;

    /*
        Ad Image
     */

    public async uploadImage(file: string, adAccountId: string, accessToken: string) {
        const url = `${this.facebookURL}/${this.apiVersion}/act_${adAccountId}/adimages`;

        const data = {
            bytes: await fileService.encodeBase64(file),
            access_token: (accessToken),
        };

        return (await requestService.post(url, data)).images.bytes; // returns object with props "hash" and "url"
    }

    /*
        Creative
     */

    public async createLink(
        name: string,
        campaignId: string,
        actionType: string,
        actionValue: any,
        link: string,
        message: string,
        pageId: string,
        adAccountId: string,
        accessToken: string,
    ): Promise<any> {

        const url = `${this.facebookURL}/${this.apiVersion}/act_${adAccountId}/adcreatives`;

        const form = {
            access_token: (accessToken),
            name: (name),
            object_story_spec: {
                link_data: {
                    call_to_action: {
                        type: (actionType),
                        value: (actionValue),
                    },
                    link: (link),
                    message: (message),
                },
                page_id: (pageId),
            },
        };

        await requestService.post(url, form);

    }
}
