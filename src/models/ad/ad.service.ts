import * as _ from "lodash";
import {Model} from "mongoose";

import {AdTypeModel} from "../adType/adType.model";
import {CampaignModel} from "../campaign/campaign.model";
import {CreativityModel} from "../creativity/creativity.model";
import {User} from "../user/user.model";
import {AdModel, default as AdMongo} from "./ad.model";
import {default as TwitterAdMongo, TwitterAdModel} from "./twitterAd.model";

export class AdService {
    private readonly mongoModel: Model<AdModel>;
    private readonly twitterAdModel: Model<TwitterAdModel>;

    constructor(mongoModel?: Model<AdModel>) {
        this.mongoModel = mongoModel || AdMongo;
        this.twitterAdModel = TwitterAdMongo;
    }

    public async create(
        name: string, owner: User, adType: AdTypeModel, creativities: CreativityModel[], campaign: CampaignModel,
        twitterParams: any,
    ): Promise<any> {
        // Twitter
        if (adType.platform.key === "TW") {
            const ad: TwitterAdModel = new this.twitterAdModel({
                name: (name),
                owner: (owner),
                adTypeKey: (adType.key),
                creativities: (creativities),
                campaign: (campaign),
                text: (twitterParams.text),
                url: (twitterParams.url),
                androidAppId: (twitterParams.androidAppId),
                androidAppDeepLink: (twitterParams.androidAppDeepLink),
                iPhoneAppId: (twitterParams.iPhoneAppId),
                iPhoneAppDeepLink: (twitterParams.iPhoneAppDeepLink),
                iPadAppId: (twitterParams.iPadAppId),
                iPadAppDeepLink: (twitterParams.iPadAppDeepLink),
            });
            ad.twitterCampaign = undefined;
            const twitterAdMongo = new this.twitterAdModel(ad);
            return await twitterAdMongo.save();
        }

        // Default
        const ad = new this.mongoModel({
            name: (name),
            owner: (owner),
            adType: (adType),
            creativities: (creativities),
            campaign: (campaign),
        });

        const adMongo = new this.mongoModel(ad);
        return await adMongo.save();
    }

    public async assignTwitterCampaign(campaign: CampaignModel, twitterCampaignId: string): Promise<CampaignModel> {
        return await this.mongoModel.findOneAndUpdate({_id: campaign._id, twitterCampaign: twitterCampaignId});
    }

    public async list(owner: User): Promise<AdModel[]> {
        const populateQuery = [
            {path: "adType", select: "name key -_id -__t"},
            {path: "creativities", select: "name path thumbnail mimetype fileformat filetype size allowedDuration"},
        ];
        return await this.mongoModel
            .find({owner: (owner), deleted: false}, {_id: 1, name: 1, adType: 1, creativities: 1})
            .populate(populateQuery)
            .lean();
    }

    public async getUserAds(user: User, id: string[]): Promise<AdModel> {
        const populateQuery = [
            {path: "creativities", select: "name path thumbnail mimetype fileformat filetype size allowedDuration"},
        ];
        return await this.mongoModel
            .find({_id: id, owner: user, deleted: false}, {_id: 1, name: 1, adTypeKey: 1, creativities: 1})
            .populate(populateQuery)
            .lean();
    }

    public async getWithId(id: string): Promise<AdModel> {
        return await this.mongoModel
            .find({_id: id})
            .lean();
    }

    public async getTwitterAd(id: string): Promise<TwitterAdModel> {
        const populateQuery = [
            {path: "creativities", select: "name path thumbnail mimetype fileformat filetype size allowedDuration"},
        ];
        return await this.mongoModel
            .find({_id: id, deleted: false}, {_id: 1, name: 1, adTypeKey: 1, creativities: 1})
            .populate(populateQuery)
            .lean();
    }

    public async remove(id: string): Promise<CreativityModel> {
        if (id === undefined) { throw new Error("Param id is required"); }

        return await this.mongoModel.findOneAndUpdate({_id: id}, {$set: {deleted: true}});
    }

    public async findAndCheck(ads: string[]): Promise<AdModel[]> {
        const findAds = await this.mongoModel.find({ _id: { $in: (ads) }});
        // Compare length of ads input array with length of mongo ads array to know if all input ads are correct
        if (findAds.length !== ads.length) {
            throw new Error("One ore more ads ids do not match with the ones stored");
        }
        return findAds;
    }

    public async getCampaignAds(campaign: CampaignModel): Promise<AdModel[]> {
        return await this.mongoModel
            .find({ campaign: (campaign) })
            .lean();
    }

    public async getUnpublished(): Promise<AdModel[]> {
        return await this.mongoModel
            .find({published: false, active: true, deleted: false})
            .populate("campaign", "owner")
            .lean();
    }

    public async getPublishedAndNotValid(): Promise<AdModel[]> {
        const ads: AdModel[] = await this.mongoModel
            .find({published: true})
            .populate("campaign", "owner")
            .lean();

        return ads.filter((ad) => {
            return (ad.campaign.deleted || !ad.campaign.active);
        });
    }

    public async changeToPublished(ad: AdModel): Promise<AdModel> {
        return await this.mongoModel.findOneAndUpdate({
            _id: ad._id,
        }, {
            $set: { published: true },
        });
    }

    public async changeToUnpublished(ad: AdModel): Promise<AdModel> {
        return await this.mongoModel.findOneAndUpdate({
            _id: ad._id,
        }, {
            $set: { published: false },
        });
    }
}
