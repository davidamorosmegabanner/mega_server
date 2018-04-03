import {Model} from "mongoose";
import {AdType} from "../adType/adType.model";
import {Creativity} from "../creativity/creativity.model";
import {User} from "../user/user.model";
import {Ad, default as AdMongo} from "./ad.model";

export class AdService {
    private readonly mongoModel: Model<Ad>;

    constructor(mongoModel?: Model<Ad>) {
        this.mongoModel = mongoModel || AdMongo;
    }

    public async create(name: string, owner: User, adType: AdType, creativities: Creativity[]): Promise<Ad> {
        const ad = new this.mongoModel({
            name: (name),
            owner: (owner),
            adType: (adType),
            creativities: (creativities),
        });

        const adMongo = new this.mongoModel(ad);
        return await adMongo.save();
    }

    public async list(owner: User): Promise<Ad[]> {
        const populateQuery = [
            {path: "adType", select: "name key -_id -__t"},
            {path: "creativities", select: "name path thumbnail mimetype fileformat filetype size duration"},
        ];
        return await this.mongoModel
            .find({owner: (owner), deleted: false}, {_id: 1, name: 1, adType: 1, creativities: 1})
            .populate(populateQuery)
            .lean();
    }

    public async get(user: User, id: string[]): Promise<Ad> {
        const populateQuery = [
            {path: "adType", select: "name key -_id -__t"},
            {path: "creativities", select: "name path thumbnail mimetype fileformat filetype size duration"},
        ];
        return await this.mongoModel
            .find({_id: id, owner: user, deleted: false}, {_id: 1, name: 1, adType: 1, creativities: 1})
            .populate(populateQuery)
            .lean();
    }

    public async remove(id: string): Promise<Creativity> {
        if (id === undefined) { throw new Error("Param id is required"); }

        return await this.mongoModel.findOneAndUpdate({_id: id}, {$set: {deleted: true}});
    }

    public async find(ads: string[]): Promise<Ad[]> {
        const findAds = await this.mongoModel.find({ id: { $in: (ads) }});
        // Compare length of ads input array with length of mongo ads array to know if all input ads are correct
        if (findAds.length !== ads.length) {
            throw new Error("One ore more ads ids do not match with the ones we have");
        }
        return findAds;
    }
}
