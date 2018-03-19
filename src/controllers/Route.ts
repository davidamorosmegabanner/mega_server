import {Application} from "express";
import {NextFunction, Request, Response} from "express";
import {UploadedFile} from "express-fileupload";

export type ExpressSignature = (req: Request & {files: UploadedFile}, res: Response, next: NextFunction) => void;

export interface Route {
    URL: string;

    decorate(app: Application);
}
