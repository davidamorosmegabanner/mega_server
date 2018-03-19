import {Document, Model, Schema} from "mongoose";
import * as mongoose from "mongoose";

export interface Platform extends Document {
    name: string;
    key: string;
    description: string;
}

const PlatformSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const PlatformMongo: Model<Platform> = mongoose.model<Platform>("Platform", PlatformSchema);
export default PlatformMongo;
