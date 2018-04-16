import axios from "axios";
import {logger} from "../config/logger";

export class RequestService {

    public async get(url): Promise<any> {
        const p: object = new Promise<any>((resolve, reject) => {

            axios.get(url)
                .then((response: any) => {
                    resolve(response.data);
                })
                .catch((error: any) => {
                    reject(error.response.data);
                });

        });
        return p;
    }

    public async post(url, form): Promise<any> {
        const p: object = new Promise<any>((resolve, reject) => {

            axios.post(url, form)
                .then((response: any) => {
                    resolve(response.data);
                })
                .catch((error: any) => {
                    reject(error.response.data);
                });

        });
        return p;
    }
}