import {logger} from "../../config/logger";
import {FacebookMiddleware} from "../../middleware/facebook/facebook.middleware";
import {ExpressSignature} from "../Route";

const facebookMiddleware = new FacebookMiddleware();

// This is the callback request user will visit when accepting Facebook connection:
// http://<API_URL>/facebook/authCode/?code=<CODE_TO_GET>
// Public call, we only retrieve accessToken given a code
export let authCode: ExpressSignature = async (request, response, next) => {
    try {

        const code = request.query.code;
        const accessToken = await facebookMiddleware.getAccessToken(code);

        response.status(200).send({access_token: accessToken.access_token});

    } catch (err) {
        logger.error(err);
        response.status(400).send(err.toString());
    }
};
