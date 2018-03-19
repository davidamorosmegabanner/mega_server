import {Model} from "mongoose";
import {User} from "../user/user.model";
import {Creativity, default as CreativityMongo, Size} from "./creativity.model";

export class CreativityService {
    private mongoModel: Model<Creativity>;

    constructor(mongoModel?: Model<Creativity>) {
        this.mongoModel = mongoModel || CreativityMongo;
    }

    public async create(name: string, owner: User, source: string, mimetype: string, fileformat: string, filetype: string, size: Size): Promise<Creativity> {

        const creativity = new this.mongoModel({
            name: (name),
            owner: (owner),
            source: (source),
            mimetype: (mimetype),
            fileformat: (fileformat),
            filetype: (filetype),
            size: (size),
        });

        return await creativity.save();
    }

    public async remove(id: string): Promise<Creativity> {
        if (id === undefined) { throw new Error("Param id is required"); }

        return await this.mongoModel.findByIdAndRemove(id);
    }

    public async list(user: User): Promise<Creativity[]> {
        return await this.mongoModel.find({owner: user, deleted: false}, {size: 1, name: 1, mimetype: 1, fileformat: 1, source: 1});
    }
}