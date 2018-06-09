import {assert, expect} from "chai";
import * as mongoose from "mongoose";

import config from "../../../src/config/config";
import {Ad} from "../../../src/models/ad/ad.model";
import {AdService} from "../../../src/models/ad/ad.service";
import {AdTypeService} from "../../../src/models/adType/adType.service";
import {Campaign} from "../../../src/models/campaign/campaign.model";
import {CampaignService} from "../../../src/models/campaign/campaign.service";
import {User} from "../../../src/models/user/user.model";
import {UserService} from "../../../src/models/user/user.service";

const adService = new AdService();
const userService = new UserService();
const campaignService = new CampaignService();
const adTypeService = new AdTypeService();

describe("Ad middleware test", () => {

    before((done) => {
        mongoose.connect(config.db);
        done();
    });

    it ("Should create an ad, after it should delete it", async () => {
        try {
            const user: User = await userService.findAny();
            const campaign: Campaign = (await campaignService.getAll())[0];
            const ad: Ad = {
                _id: "12345",
                name: "Ad test",
                owner: user,
                adTypeKey: "TW_TWEET",
                campaign: (campaign),
                deleted: false,
                created: new Date(),
                updated: new Date(),
                published: true,
            };
            const adType = await adTypeService.assignByKey(ad.adTypeKey);
            const twitterParams = {
                text: "Test tweeeeet",
            };

            // With Twitter params
            const validAd: Ad = await adService.create(ad.name, ad.owner, adType, [], ad.campaign, twitterParams);
            // Then delete validAd
            const deletedAd: Ad = await adService.remove(validAd._id);

            expect(validAd).to.have.property("name");
            expect(validAd.owner).to.be.equal(ad.owner._id);
            expect(deletedAd.deleted).to.be.equal(false);
        } catch (err) {
            assert.ifError(err, "error creating ad");
        }
    });

    after((done) => {
        mongoose.connection.close();
        done();
    });
});
