import * as twit from "twit";
import config from "../../config/config";

export class TwitterCreativeMiddleware {

    private apiKey: string = config.twitterAPI.apiKey;
    private apiSecret: string = config.twitterAPI.apiSecret;
    private redirectUri: string = config.twitterAPI.redirectUri;

    /*
        Media middleware
     */

    public async uploadMedia(accessToken, accessTokenSecret, filePath): Promise<any> {
        var t = new twit({
            consumer_key: this.apiKey,
            consumer_secret: this.apiSecret,
            access_token: accessToken,
            access_token_secret: accessTokenSecret,
        });

        const p = new Promise((resolve, reject) => {
            t.postMediaChunked({file_path: filePath}, (err, data, response) => {
                if (err) { reject(err); }
                resolve(data.media_id_string);
            });
        });
        return p;
    }

    private async initUpload(consumer, fileSize, fileMimetype, accessToken, accessTokenSecret) {
        console.log("init");
        const params = {
            command: "INIT",
            total_bytes: fileSize,
            media_type: fileMimetype,
        };
        const p = new Promise<any>((resolve, reject) => {
            consumer.post(
                "https://upload.twitter.com/1.1/media/upload.json",
                accessToken,
                accessTokenSecret,
                params,
                (error, data, response) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(JSON.parse(data).media_id_string);
                    }
                },
            );
        });
        return p;
    }
}
