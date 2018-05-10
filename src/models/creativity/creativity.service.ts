import {Model} from "mongoose";
import {User} from "../user/user.model";
import {Creativity, default as CreativityMongo} from "./creativity.model";
import {Dimensions} from "./dimensions";

export class CreativityService {
    private readonly mongoModel: Model<Creativity>;

    constructor(mongoModel?: Model<Creativity>) {
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
        dimensions: Dimensions,
        size: number,
        duration: number,
    ): Promise<Creativity> {
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

    public async findById(creativities: string[]): Promise<Creativity[]> {
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

    public async get(user: User, id: string[]): Promise<Creativity> {
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

    public async list(user: User): Promise<Creativity[]> {
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

    public async remove(id: string): Promise<Creativity> {
        if (id === undefined) { throw new Error("Param id is required"); }

        return await this.mongoModel.findOneAndUpdate({_id: id}, {$set: {deleted: true}});
    }
}
