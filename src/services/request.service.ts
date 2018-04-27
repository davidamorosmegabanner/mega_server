import axios from "axios";
import {OAuth} from "oauth";

export class RequestService {

    // General GET request
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

    // General POST request
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
