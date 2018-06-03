import {Model} from "mongoose";
import {User} from "../user/user.model";
import {CreativityModel, default as CreativityMongo} from "./creativity.model";
import {DimensionsModel} from "./dimensions.model";

export class CreativityService {
    private readonly mongoModel: Model<CreativityModel>;

    constructor(mongoModel?: Model<CreativityModel>) {
        this.mongoModel = mongoModel || CreativityMongo;
    }

    public async create(
        name: string,
        owner: User,
        source: string,
        thumbnail: string,
        mimetype: string,
        fileformat: string,
        filetype: string,
        dimensions: DimensionsModel,
        size: number,
        duration: number,
    ): Promise<CreativityModel> {
        const creativity = new this.mongoModel({
            name: (name),
            owner: (owner),
            path: (source),
            thumbnail: (thumbnail),
            mimetype: (mimetype),
            fileformat: (fileformat),
            filetype: (filetype),
            dimensions: (dimensions),
            size: (size),
        });

        if (filetype === "video") { creativity.duration = (duration); }

        return await creativity.save();
    }

    public async find(creativities: CreativityModel[]): Promise<CreativityModel[]> {
        if (creativities && creativities.length) {
            const ids = creativities.map((creativity) => creativity._id);
            return await this.mongoModel
                .find({
                    _id: { $in: ids },
                    deleted: false,
                }, {
                    deleted: 0,
                    created: 0,
                    owner: 0,
                    fileformat: 0,
                    filetype: 0,
                    __v: 0,
                })
                .lean();
        } else {
            return [];
        }
    }

    public async findById(creativities: string[]): Promise<CreativityModel[]> {
        if (creativities && creativities.length) {
            return await this.mongoModel
                .find({
                    _id: creativities,
                    deleted: false,
                }, {
                    deleted: 0,
                    created: 0,
                    owner: 0,
                    fileformat: 0,
                    filetype: 0,
                    __v: 0,
                })
                .lean();
        } else {
            return [];
        }
    }

    public async get(user: User, id: string[]): Promise<CreativityModel> {
        return await this.mongoModel
            .find({
                _id: id,
                owner: user,
                deleted: false,
            }, {
                _id: 1,
                name: 1,
                source: 1,
                mimetype: 1,
                fileformat: 1,
                filetype: 1,
                dimensions: 1,
                duration: 1,
            })
            .lean();
    }

    public async list(user: User): Promise<CreativityModel[]> {
        return await this.mongoModel
            .find({
                owner: user,
                deleted: false,
            }, {
                _id: 1,
                name: 1,
                source: 1,
                mimetype: 1,
                fileformat: 1,
                filetype: 1,
                dimensions: 1,
                duration: 1,
            })
            .lean();
    }

    public async remove(id: string): Promise<CreativityModel> {
        if (id === undefined) { throw new Error("Param id is required"); }

        return await this.mongoModel.findOneAndUpdate({_id: id}, {$set: {deleted: true}});
    }
}
