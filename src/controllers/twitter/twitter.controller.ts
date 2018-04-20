import {logger} from "../../config/logger";
import {TwitterAuthMiddleware} from "../../middleware/twitter/auth.middleware";
import {ExpressSignature} from "../Route";
import {UserService} from "../../models/user/user.service";

const twitterMiddleware = new TwitterAuthMiddleware();
const userService = new UserService();

// This is the request to get the oauth_code and redirect the user to:
// https://twitter.com/oauth/authenticate?oauth_token=[oauth_token]
// When accepting the connection, will be redirected to:
// <API_URL>/twitter/authCode/?code=<CODE_TO_GET>
export let oauthToken: ExpressSignature = async (request, response, next) => {
    try {

        const userId = request.params.user_id;
        if (!userId) { throw new Error("Param user_id is mandatory"); }

        const requestTokens = await twitterMiddleware.getRequestToken();
        // const user = await userService.
        response.status(200).send({requestTokens});

    } catch (err) {
        logger.error(err);
        response.status(400).send(err.toString());
    }
};

// This is the callback request user will visit when accepting Twitter connection:
// <API_URL>/twitter/authCode/?code=<CODE_TO_GET>
// Public call, we only retrieve accessToken given a code
export let authTokens: ExpressSignature = async (request, response, next) => {
    try {

        const code = request.query.code;
        const accessToken = await twitterMiddleware.getRequestToken();

        response.status(200).send({access_token: accessToken.access_token});

    } catch (err) {
        logger.error(err);
        response.status(400).send(err.toString());
    }
};
