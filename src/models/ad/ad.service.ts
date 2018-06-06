import {Model} from "mongoose";

import {AdType} from "../adType/adType.model";
import {Campaign} from "../campaign/campaign.model";
import {Creativity} from "../creativity/creativity.model";
import {User} from "../user/user.model";
import {Ad, default as AdMongo} from "./ad.model";
import {default as TwitterAdMongo, TwitterAd} from "./twitterAd.model";

export class AdService {
    private readonly mongoModel: Model<Ad>;
    private readonly twitterAdModel: Model<TwitterAd>;

    constructor(mongoModel?: Model<Ad>) {
        this.mongoModel = mongoModel || AdMongo;
        this.twitterAdModel = TwitterAdMongo;
    }

    public async create(
        name: string, owner: User, adType: AdType, creativities: Creativity[], campaign: Campaign,
        twitterParams: any,
    ): Promise<any> {
        // Twitter
        if (adType.platform.key === "TW") {
            const ad: TwitterAd = new this.twitterAdModel({
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

    public async assignTwitterCampaign(ad: Ad, twitterCampaignId: string): Promise<Campaign> {
        return await this.twitterAdModel.findOneAndUpdate({_id: ad._id}, {twitterCampaign: twitterCampaignId});
    }

    public async list(owner: User): Promise<Ad[]> {
        const populateQuery = [
            {path: "adType", select: "name key -_id -__t"},
            {path: "creativities", select: "name path thumbnail mimetype fileformat filetype size allowedDuration"},
        ];
        return await this.mongoModel
            .find({owner: (owner), deleted: false}, {_id: 1, name: 1, adType: 1, creativities: 1})
            .populate(populateQuery)
            .lean();
    }

    public async getUserAds(user: User, id: string[]): Promise<Ad[]> {
        const populateQuery = [
            {path: "creativities", select: "name path thumbnail mimetype fileformat filetype size allowedDuration"},
        ];
        return await this.mongoModel
            .find({_id: id, owner: user, deleted: false}, {_id: 1, name: 1, adTypeKey: 1, creativities: 1})
            .populate(populateQuery)
            .lean();
    }

    public async getWithId(id: string): Promise<Ad> {
        return await this.mongoModel
            .find({_id: id})
            .lean();
    }

    public async getTwitterAd(id: string): Promise<TwitterAd> {
        return await this.mongoModel
            .findOne({_id: id})
            .lean();
    }

    public async remove(id: string): Promise<Creativity> {
        if (id === undefined) { throw new Error("Param id is required"); }

        return await this.mongoModel.findOneAndUpdate({_id: id}, {$set: {deleted: true}});
    }

    public async findAndCheck(ads: string[]): Promise<Ad[]> {
        const findAds = await this.mongoModel.find({ _id: { $in: (ads) }});
        // Compare length of ads input array with length of mongo ads array to know if all input ads are correct
        if (findAds.length !== ads.length) {
            throw new Error("One ore more ads ids do not match with the ones stored");
        }
        return findAds;
    }

    public async getCampaignAds(campaign: Campaign): Promise<Ad[]> {
        return await this.mongoModel
            .find({ campaign: (campaign) })
            .lean();
    }

    public async getUnpublished(): Promise<Ad[]> {
        return await this.mongoModel
            .find({published: false})
            .populate("campaign", "owner")
            .lean();
    }

    public async getPublishedAndNotValid(): Promise<Ad[]> {
        const ads: Ad[] = await this.mongoModel
            .find({published: true})
            .populate("campaign", "deleted")
            .lean();

        return ads.filter((ad) => {
            return (ad.campaign.deleted && !ad.campaign.active);
        });
    }

    public async changeToPublished(ad: Ad): Promise<Ad> {
        return await this.mongoModel.update({
            _id: ad._id,
        }, {
            $set: { published: true },
        });
    }

    public async changeToUnpublished(ad: Ad): Promise<Ad> {
        return await this.mongoModel.update({
            _id: ad._id,
        }, {
            $set: { published: false },
        });
    }
}
