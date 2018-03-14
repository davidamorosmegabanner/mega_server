import {Model, Schema, Document} from "mongoose";
import * as mongoose from "mongoose";

export interface Creativity extends Document {
    name: string;
    owner: string;
    ad: string;
    path: string;
    mimetype: string;
    fileformat: string;
    deleted: boolean;
    created: Date
}

let CreativitySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId, 
        required: true,
        ref: 'User'
    },
    ad: {
        type: Schema.Types.ObjectId, 
        required: true,
        ref: 'Ad'
    },
    path: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    fileformat: {
        type: String,
        required: true
    },
    deleted: { 
        type: Boolean, 
        required: true, 
        default: false 
    },
    created: { 
        type: Date, 
        required: true, 
        default: Date.now 
    }
});


const CreativityMongo: Model<Creativity> = mongoose.model<Creativity>('Creativity', CreativitySchema);
export default CreativityMongo;
