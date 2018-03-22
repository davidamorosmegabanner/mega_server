import {Model} from "mongoose";
import {User} from "../user/user.model";
import {Creativity, default as CreativityMongo, Size} from "./creativity.model";

export class CreativityService {
    private mongoModel: Model<Creativity>;

    constructor(mongoModel?: Model<Creativity>) {
        this.mongoModel = mongoModel || CreativityMongo;
    }

    public async create(name: string, owner: User, source: string, thumbnail: string, mimetype: string, fileformat: string, filetype: string, size: Size, duration: number): Promise<Creativity> {
        const creativity = new this.mongoModel({
            name: (name),
            owner: (owner),
            path: (source),
            thumbnail: (thumbnail),
            mimetype: (mimetype),
            fileformat: (fileformat),
            filetype: (filetype),
            size: (size),
        });

        if (filetype === "video") { creativity.duration = (duration); }

        return await creativity.save();
    }

    public async findById(creativities: string[]): Promise<Creativity[]> {
        return await this.mongoModel
            .find({_id: creativities, deleted: false}, {deleted: 0, created: 0, owner: 0, fileformat: 0, filetype: 0, __v: 0});
    }

    public async get(user: User, id: string[]): Promise<Creativity> {
        return await this.mongoModel.find({_id: id, owner: user, deleted: false}, {_id: 1, name: 1, source: 1, mimetype: 1, fileformat: 1, filetype: 1, size: 1, duration: 1});
    }

    public async remove(id: string): Promise<Creativity> {
        if (id === undefined) { throw new Error("Param id is required"); }

        return await this.mongoModel.findOneAndUpdate({_id: id}, {$set: {deleted: true}});
    }

    public async list(user: User): Promise<Creativity[]> {
        return await this.mongoModel
            .find({owner: user, deleted: false}, {_id: 1, name: 1, source: 1, mimetype: 1, fileformat: 1, filetype: 1, size: 1, duration: 1});
    }


}
