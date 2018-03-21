import {Ad} from "../../models/ad/ad.model";
import {AdService} from "../../models/ad/ad.service";
import {AdType} from "../../models/adType/adType.model";
import {AdTypeService} from "../../models/adType/adType.service";
import {Creativity} from "../../models/creativity/creativity.model";
import {CreativityService} from "../../models/creativity/creativity.service";
import {User} from "../../models/user/user.model";
import {UserService} from "../../models/user/user.service";
import {AuthService} from "../../services/auth.service";
import {ExpressSignature} from "../Route";

const authService = new AuthService();
const userService = new UserService();
const adTypeService = new AdTypeService();
const adService = new AdService();
const creativityService = new CreativityService();

export let create: ExpressSignature = async (request, response, next) => {
    const params = request.body;
    const xAccessToken = request.headers["x-access-token"].toString();
    const allowedRoles = ["admin"];

    if (!xAccessToken || await !authService.isAllowed(allowedRoles, xAccessToken)) {
        return response.status(401).send("Unauthorized");
    }

    try {
        const name: string = params.name;
        const owner: User = await userService.findById(params.owner);
        const adType: AdType = await adTypeService.findByKey(params.adType);
        const creativities: Creativity[] = await creativityService.find(params.creativities);

        // TODO check creativities
        // await adTypeService.checkCreativities(AdType, creativities)

        const ad: Ad = await adService.create(name, owner, adType, creativities);

        console.log(creativities);
        response.status(200).send({
            ad: ad._id,
            name: ad.name,
            owner: ad.owner._id,
            adType: ad.adType.key,
            creativities: [ad.creativities],
        });

    } catch (err) {
        console.error(err);
        response.status(400).send(err.toString());
    }
};

// Auxiliary functions
function invalidNumberCreativities(adType): string {
    return(
        "Invalid number of creativities. AdType " +
        adType.key +
        " accepts " +
        adType.numCreativities.min +
        " creativity as minimum and " +
        adType.numCreativities.max +
        " creativity as maximum!"
    );
}
