import * as twitterAPI from "node-twitter-api";
import * as oauth from "oauth";
import config from "../../config/config";

import {FileService} from "../../services/file.service";

const fileService = new FileService();

export class TwitterCreativeMiddleware {

    private apiKey: string = config.twitterAPI.apiKey;
    private apiSecret: string = config.twitterAPI.apiSecret;
    private redirectUri: string = config.twitterAPI.redirectUri;

    /*
        Creative middleware
     */

    public async uploadImage(accessToken, accessTokenSecret, filePath): Promise<any> {
        const params = {
            "media_data": await fileService.encodeBase64(filePath),
        };
        const consumer = new oauth.OAuth(
            "https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token",
            this.apiKey, this.apiSecret, "1.0A", this.redirectUri, "HMAC-SHA1");

        const p: Object = new Promise<any>((resolve, reject) => {
            consumer.post(
                "https://upload.twitter.com/1.1/media/upload.json",
                accessToken,
                accessTokenSecret,
                (params),
                (error, data, response) => {
                    if (error) {
                        reject(error);
                        // res.send("Error getting twitter screen name : " + util.inspect(error), 500);
                    } else {
                        resolve(JSON.parse(data));
                    }
                },
            );
        });
        return p;
    }

}