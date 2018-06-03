import {Document, Model, Schema} from "mongoose";

export interface Location {
    country: string;
    province?: string;
    municipality?: string;
    postalCode?: string;
}

export const LocationSchema = new Schema({
    country: {
        type: String,
        required: true,
    },
    province: {
        type: String,
    },
    municipality: {
        type: String,
    },
    postalCode: {
        type: String,
    },
});
