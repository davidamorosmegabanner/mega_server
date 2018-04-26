import config from "../../config/config";
import {logger} from "../../config/logger";
import {TwitterAdMiddleware} from "../../middleware/twitter/ad.middleware";
import {TwitterAuthMiddleware} from "../../middleware/twitter/auth.middleware";
import {User} from "../../models/user/user.model";
import {UserService} from "../../models/user/user.service";
import {ExpressSignature} from "../Route";

const twitterAuthMiddleware = new TwitterAuthMiddleware();
const twitterAdMiddleware = new TwitterAdMiddleware();
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

        const requestTokens = await twitterAuthMiddleware.getRequestToken();
        request.session.requestToken = requestTokens.requestToken;
        request.session.requestTokenSecret = requestTokens.requestTokenSecret;

        response.redirect(`${config.twitterAPI.redirectURL}${requestTokens.requestToken}`);

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
        const accessTokens = await twitterAuthMiddleware.getAccessToken(
            request.session.requestToken,
            request.session.requestTokenSecret,
            params.oauth_verifier,
        );

        const adAccount = await twitterAdMiddleware.getAdAccount(
            accessTokens.accessToken, accessTokens.accessTokenSecret
        );
        if (!adAccount || !adAccount.id) {
            throw new Error("Cannot find an Ad Account associated with user");
        }

        await userService.assignTwitterAccessToken(user, accessTokens.accessToken);
        await userService.assignTwitterAccessTokenSecret(user, accessTokens.accessTokenSecret);
        await userService.assignTwitterAdAccount(user, adAccount.id);

        response.redirect(config.redirectURL);

    } catch (err) {
        console.log(err);
        logger.error(err);
        response.status(400).send(err.toString());
    }
};
