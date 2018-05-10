import {logger} from "../../config/logger";

import {Campaign} from "../../models/campaign/campaign.model";
import {CampaignService} from "../../models/campaign/campaign.service";
import {User} from "../../models/user/user.model";
import {UserService} from "../../models/user/user.service";
import {AuthService} from "../../services/auth.service";
import {ExpressSignature} from "../Route";

const authService = new AuthService();
const campaignService = new CampaignService();
const userService = new UserService();

export let create: ExpressSignature = async (request, response, next) => {
    const params = request.body;
    const allowedRoles = ["admin"];

    if (!await authService.isAllowed(allowedRoles, request)) {
        response.status(401).send("Unauthorized");
    }

    const xAccessToken = request.headers["x-access-token"].toString();
    try {
        const name = params.name.toString();
        const description = params.description;
        const owner = await userService.findByToken(xAccessToken);
        const dailyBudget = Number(params.dailyBudget);
        const startDate = new Date(params.startDate);
        const endDate = new Date(params.endDate);

        const campaign: Campaign = await campaignService.create(
            name, description, owner, dailyBudget, startDate, endDate,
        );

        response.status(200).send({
            _id: (campaign._id),
            name: (campaign.name),
            description: (campaign.description),
            budget: (campaign.budget),
            dailyBudget: (campaign.dailyBudget),
            startDate: (campaign.startDate),
            endDate: (campaign.endDate),
        });
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
        await campaignService.remove(params.id);
        response.status(200).send({
            executed: true,
        });
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
        let creativities: any;
        if (request.query.id) {
            creativities = await campaignService.get(user, request.query.id);
        } else {
            creativities = await campaignService.list(user);
        }
        response.status(200).send(
            creativities,
        );
    } catch (err) {
        logger.error(err);
        response.status(400).send(err.toString());
    }
};
