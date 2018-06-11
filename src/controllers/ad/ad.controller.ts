import {logger} from "../../config/logger";

import {AdService} from "../../models/ad/ad.service";
import {AdType} from "../../models/adType/adType.model";
import {AdTypeService} from "../../models/adType/adType.service";
import {Campaign} from "../../models/campaign/campaign.model";
import {CampaignService} from "../../models/campaign/campaign.service";
import {Creativity} from "../../models/creativity/creativity.model";
import {CreativityService} from "../../models/creativity/creativity.service";
import {User} from "../../models/user/user.model";
import {UserService} from "../../models/user/user.service";
import {AuthService} from "../user/auth.service";
import {ValidatorService} from "./validator.service";
import {ExpressSignature} from "../Route";
import {Ad} from "../../models/ad/ad.model";

const authService = new AuthService();
const userService = new UserService();
const adService = new AdService();
const creativityService = new CreativityService();
const campaignService = new CampaignService();
const validatorService = new ValidatorService();
const adTypeService = new AdTypeService();

export let create: ExpressSignature = async (request, response, next) => {
    const params = request.body;
    const allowedRoles = ["admin"];

    if (!await authService.isAllowed(allowedRoles, request)) {
        response.status(401).send("Unauthorized");
    }

    const xAccessToken = request.headers["x-access-token"].toString();
    try {
        const name: string = params.name;
        const owner: User = await userService.findByToken(xAccessToken);
        const adType: AdType = await adTypeService.assignByKey(params.adType);
        const creativities: Creativity[] = await creativityService.findById(params.creativities);
        const campaign: Campaign = await campaignService.findByOwnerAndId(owner, params.campaign);

        // Validators
        await validatorService.validateParams(adType, params);
        await validatorService.validateCreativities(adType, creativities);

        // Ad creation
        // + Optional params
        let twitterParams: any = {};
        if (adType.platform.key === "TW") {
            twitterParams = adTypeService.assignTwitterParams(params);
        }

        const ad: any = await adService.create(name, owner, adType, creativities, campaign,
            twitterParams);

        response.status(200).send(ad);

    } catch (err) {
        logger.error(err);
        response.status(400).send(err.toString());
    }
};

export let list: ExpressSignature = async (request, response, next) => {
    const allowedRoles = ["admin"];

    if (!await authService.isAllowed(allowedRoles, request)) {
        response.status(401).send("Unauthorized");
    }

    const xAccessToken = request.headers["x-access-token"].toString();
    try {
        const user: User = await userService.findByToken(xAccessToken);
        let ads: Ad[];
        if (request.query.id) {
            ads = await adService.getUserAds(user, request.query.id);
        } else {
            ads = await adService.list(user);
        }
        response.status(200).send(
            ads,
        );
    } catch (err) {
        logger.error(err);
        response.status(400).send(err.toString());
    }
};

export let remove: ExpressSignature = async (request, response, next) => {
    const params = request.body;
    const allowedRoles = ["admin"];

    if (!await authService.isAllowed(allowedRoles, request)) {
        response.status(401).send("Unauthorized");
    }

    try {
        await adService.remove(params.id);
        response.status(200).send({
            executed: true,
        });
    } catch (err) {
        logger.error(err);
        response.status(400).send(err.toString());
    }
};
