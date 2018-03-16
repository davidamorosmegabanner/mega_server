import {Model, Schema, Document} from "mongoose";
import * as mongoose from "mongoose";

export interface AdType extends Document {
    _id: string;
    name: string;
    key: string;
    description: string
}

let AdTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    key: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});


const AdTypeMongo: Model<AdType> = mongoose.model<AdType>('AdType', AdTypeSchema);
export default AdTypeMongo;
