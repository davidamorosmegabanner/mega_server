import {Model} from "mongoose";
import {AdType} from "../adType/adType.model";
import {Creativity} from "../creativity/creativity.model";
import {User} from "../user/user.model";
import {Ad, default as AdMongo} from "./ad.model";

export class AdService {
    private mongoModel: Model<Ad>;

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
}
