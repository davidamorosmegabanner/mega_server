import {logger} from "../../config/logger";
import {FacebookAuthMiddleware} from "../../middleware/facebook/auth.middleware";
import {ExpressSignature} from "../Route";
import {User} from "../../models/user/user.model";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../models/user/user.service";
import {FacebookAdMiddleware} from "../../middleware/facebook/ad.middleware";
import config from "../../config/config";

const facebookAuthMiddleware = new FacebookAuthMiddleware();
const authService = new AuthService();
const userService = new UserService();
const facebookAdMiddleware = new FacebookAdMiddleware();

// This is the callback request user will visit when accepting Facebook connection at
//
//      https://www.facebook.com/v2.13/dialog/oauth
//      ?client_id=172396770149832
//      &redirect_uri=http://localhost:3000/facebook/authCode/
//      &scope=business_management,manage_pages,ads_management
//
// We will get the user Id by user id we have stored in session
// PUBLIC CALL!
export let authCode: ExpressSignature = async (request, response, next) => {
    try {
        if (!request.query.code) { response.status(400).send("Please provide a code"); }

        const code = request.query.code;
        const accessToken = (await facebookAuthMiddleware.getAccessToken(code)).access_token;
        let user: User = await userService.findById(request.session.userId);

        // Check to assure we have user localized
        if (!user || !user._id) {
            throw new Error("Unable to find userId in session!");
        }

        user = await userService.assignFacebookAccessToken(user, accessToken);
        const fbAccount = await facebookAuthMiddleware.getFacebookInfo(accessToken);
        const fbAdAccount = await facebookAdMiddleware.getAdAccount(fbAccount.id, accessToken);
        user = await userService.assignFacebookAdAccount(user, fbAdAccount.account_id);

        // More checking to verify everything has worked
        if (!user || !user._id) {
            throw new Error("Unable to find userId in session!");
        }

        response.redirect(config.redirectURL);

    } catch (err) {
        logger.error(err);
        response.status(400).send(err.toString());
    }
};

// export let token: ExpressSignature = async (request, response, next) => {
//     const params = request.body;
//     const xAccessToken = request.headers["x-access-token"].toString();
//     const allowedRoles = ["admin"];
//
//     if (!await authService.isAllowed(allowedRoles, request)) {
//         response.status(401).send("Unauthorized");
//     }
//
//     if (!params.access_token) {
//         response.status(404).send("Please provide an access_token");
//     }
//
//     try {
//
//         let user: User = await userService.findByToken(xAccessToken);
//         user = await userService.assignFacebookAccessToken(user, params.access_token);
//         const fbAccount = await facebookAuthMiddleware.getFacebookInfo(params.access_token);
//         const fbAdAccount = await facebookAdMiddleware.getAdAccount(fbAccount.id, params.access_token);
//         user = await userService.assignFacebookAdAccount(user, fbAdAccount.account_id);
//
//         console.log(fbAccount);
//         console.log(fbAdAccount);
//         console.log(user);
//
//         response.status(200).send({
//             email: user.email,
//             _id: user._id,
//             name: user.name,
//             phone: user.phone,
//         });
//
//     } catch (err) {
//         logger.error(err);
//         response.status(400).send(err.toString());
//     }
// };