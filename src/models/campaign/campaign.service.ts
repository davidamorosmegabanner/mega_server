import {Model} from "mongoose";
import {CreativityModel} from "../creativity/creativity.model";
import {User} from "../user/user.model";
import {CampaignModel, default as CampaignMongo} from "./campaign.model";

export class CampaignService {
    private readonly mongoModel: Model<CampaignModel>;

    constructor(mongoModel?: Model<CampaignModel>) {
        this.mongoModel = mongoModel || CampaignMongo;
    }

    public async create(
        name: string,
        description: string,
        owner: User,
        dailyBudget: number,
        startDate: Date,
        endDate: Date,
    ) {
        const campaign = new this.mongoModel({
            name: (name),
            owner: (owner),
            budget: 0,
            dailyBudget: (dailyBudget),
            startDate: (startDate),
            endDate: (endDate),
        });

        if (description.length > 0) { campaign.description = (description); }

        return await campaign.save();
    }

    public async findById(user:User, id: string): Promise<CampaignModel> {
        return await this.mongoModel
            .findOne({
                owner: user,
                _id: id,
            }, {
                _id: 1,
                name: 1,
                description: 1,
                owner: 1,
                budget: 1,
                dailyBudget: 1,
                startDate: 1,
                endDate: 1,
                active: 1,
                created: 1,
                updated: 1,
            })
            .lean();
    }

    public async get(user: User, id: string[]): Promise<CampaignModel> {
        return await this.mongoModel
            .find({
                owner: user,
                _id: (id),
                deleted: false,
            }, {
                _id: 1,
                name: 1,
                description: 1,
                owner: 1,
                budget: 1,
                dailyBudget: 1,
                startDate: 1,
                endDate: 1,
                active: 1,
                created: 1,
                updated: 1,
            })
            .lean();
    }

    public async list(user: User): Promise<CampaignModel[]> {
        return await this.mongoModel
            .find({
                owner: user,
                deleted: false,
            }, {
                _id: 1,
                name: 1,
                description: 1,
                owner: 1,
                ads: 1,
                budget: 1,
                dailyBudget: 1,
                startDate: 1,
                endDate: 1,
                active: 1,
                created: 1,
                updated: 1,
            })
            .lean();
    }

    public async remove(id: string): Promise<CreativityModel> {
        if (id === undefined) { throw new Error("Param id is required"); }

        return await this.mongoModel.findOneAndUpdate({_id: id}, {$set: {deleted: true}});
    }

    public async start(campaign: CampaignModel): Promise<CreativityModel> {
        if (campaign === undefined) { throw new Error("Param id is required"); }

        return await this.mongoModel.findOneAndUpdate({_id: campaign._id}, {$set: {active: true}});
    }

    public async stop(campaign: CampaignModel): Promise<CreativityModel> {
        if (campaign === undefined) { throw new Error("Param id is required"); }

        return await this.mongoModel.findOneAndUpdate({_id: campaign._id}, {$set: {active: false}});
    }

    public async getAll(): Promise<CampaignModel[]> {
        return await this.mongoModel
            .find({ active: true, deleted: false })
            .populate("owner")
            .lean();
    }
}
