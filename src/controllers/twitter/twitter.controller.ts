import config from "../../config/config";
import {logger} from "../../config/logger";
import {TwitterAuthMiddleware} from "../../middleware/twitter/auth.middleware";
import {UserService} from "../../models/user/user.service";
import {ExpressSignature} from "../Route";
import {User} from "../../models/user/user.model";

const twitterMiddleware = new TwitterAuthMiddleware();
const userService = new UserService();

// This is the request to get the oauth_code and redirect the user to:
// https://twitter.com/oauth/authenticate?oauth_token=[oauth_token]
// When accepting the connection, will be redirected to:
// <API_URL>/twitter/authCode/?code=<CODE_TO_GET>
export let oauthToken: ExpressSignature = async (request, response, next) => {
    try {

        const userId = request.session.userId;
        if (!userId) {
            throw new Error("Unable to find userId in session!");
        }

        const requestTokens = await twitterMiddleware.getRequestToken();
        request.session.requestToken = requestTokens.requestToken;
        request.session.requestTokenSecret = requestTokens.requestTokenSecret;

        response.redirect(`${config.twitterAPI.twitterURL}${requestTokens.requestToken}`);

    } catch (err) {
        logger.error(err);
        response.status(400).send(err.toString());
    }
};

// This is the callback request user will visit when accepting Twitter connection:
// <API_URL>/twitter/authCode/?code=<CODE_TO_GET>
// Public call, we only retrieve accessToken given a code
export let authTokens: ExpressSignature = async (request, response, next) => {
    const params = request.query;
    try {

        const userId = request.session.userId;
        if (!userId) {
            throw new Error("Unable to find userId in session!");
        }

        const user: User = await userService.findById(request.session.userId);
        const accessTokens = await twitterMiddleware.getAccessToken(
            request.session.requestToken,
            request.session.requestTokenSecret,
            params.oauth_verifier,
        );

        await userService.assignTwitterAccessToken(user, accessTokens.accessToken);
        await userService.assignTwitterAccessTokenSecret(user, accessTokens.accessTokenSecret);

        response.redirect(config.redirectURL);

    } catch (err) {
        console.log(err);
        logger.error(err);
        response.status(400).send(err.toString());
    }
};
