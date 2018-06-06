import {AdType} from "../../models/adType/adType.model";
import {InstagramAdTypeModel} from "../../models/adType/instagramAdType.model";
import {TwitterAdType} from "../../models/adType/twitterAdType.model";
import {Creativity} from "../../models/creativity/creativity.model";

/**
 *
 * Validators for compatibility between creativities and adTypes
 *
 */

export class ValidatorService {

    // Public creativities validator called when Ad is created
    public async validateCreativities(adType: any, creativities: Creativity[]): Promise<boolean> {
        let validation: boolean = true;
        // Implementing different validation depending on type of adType.model.ts
        switch (adType.platform.key) {
            case "IG": {
                validation = await this.validateInstagramCreativities(adType, creativities);
                break;
            }
            case "TW": {
                validation = await this.validateTwitterCreativities(adType, creativities);
                break;
            }
            default: {
                throw new Error("There's been a problem validating creativities. Please contact the admin.");
            }
        }
        return validation;
    }

    // Public params validator when Ad is created
    public async validateParams(adType: any, params: any): Promise<boolean> {
        let validation: boolean = true;
        // Implementing different validation depending on type of adType.model.ts
        switch (adType.platform.key) {
            case "TW": {
                validation = await this.validateTwitterParams(adType, params);
                break;
            }
            default: {
                throw new Error("There's been a problem validating parameters. Please contact the admin.");
            }
        }
        return validation;
    }

    // Functions used to validate creativities of an ad internally
    private async validateInstagramCreativities(adType: InstagramAdTypeModel, creativities: Creativity[]): Promise<boolean> {

        // Validate number of creativities
        if (adType.numCreativities.min > creativities.length || adType.numCreativities.max < creativities.length) {
            throw new Error(this.errorNumCreativities(adType));
        }

        // Validations for every creativity
        creativities.map((creativity) => {

            // Validate mimetypes
            if (adType.mimetypes.indexOf(creativity.mimetype) === -1) {
                throw new Error(this.errorMimetype());
            }

            // Validate dimensions
            if (
                creativity.dimensions.height < adType.allowedDimensions.min.height ||
                creativity.dimensions.width < adType.allowedDimensions.min.width
            ) {
                throw new Error(this.errorDimensions("small", adType.allowedDimensions));
            }
            if (
                creativity.dimensions.height > adType.allowedDimensions.max.height ||
                creativity.dimensions.width > adType.allowedDimensions.max.width
            ) {
                throw new Error(this.errorDimensions("big", adType.allowedDimensions));
            }

            // Validate ratios
            const minRatios: number = adType.allowedRatio.min.width / adType.allowedRatio.min.height;
            const maxRatios: number = adType.allowedRatio.max.width / adType.allowedRatio.max.height;
            const creativityRatios: number = creativity.dimensions.width / creativity.dimensions.height;

            if (creativityRatios < minRatios || creativityRatios > maxRatios) {
                throw new Error(this.errorRatio(adType.allowedRatio));
            }

            // Validate allowedDuration if video
            if (adType.allowedDuration && creativity.filetype === "video") {
                if (adType.allowedDuration.min < creativity.duration || adType.allowedDuration.max > creativity.duration) {
                    throw new Error(this.errorDuration(adType.allowedDuration));
                }
            }
        });

        return true;
    }
    private async validateTwitterCreativities(adType: TwitterAdType, creativities: Creativity[]): Promise<boolean> {

        // Validate number of creativities
        if (adType.numCreativities.min > creativities.length || adType.numCreativities.max < creativities.length) {
            throw new Error(this.errorNumCreativities(adType));
        }

        // Validations for every creativity
        creativities.map((creativity) => {

            // Validate mimetypes
            if (adType.mimetypes.indexOf(creativity.mimetype) === -1) {
                throw new Error(this.errorMimetype());
            }

            // Validate dimensionss
            if (
                creativity.dimensions.height < adType.allowedDimensions.min.height ||
                creativity.dimensions.width < adType.allowedDimensions.min.width
            ) {
                throw new Error(this.errorDimensions("small", adType.allowedDimensions));
            }
            if (
                creativity.dimensions.height > adType.allowedDimensions.max.height ||
                creativity.dimensions.width > adType.allowedDimensions.max.width
            ) {
                throw new Error(this.errorDimensions("big", adType.allowedDimensions));
            }

            // Validate size
            if (
                creativity.size > adType.maxCreativitySize
            ) {
                throw new Error(this.errorSize(creativity.size, adType.maxCreativitySize));
            }

            // Validate allowedDuration if video
            if (adType.allowedDuration && creativity.filetype === "video") {
                if (adType.allowedDuration.min < creativity.duration || adType.allowedDuration.max > creativity.duration) {
                    throw new Error(this.errorDuration(adType.allowedDuration));
                }
            }
        });

        return true;
    }

    // Functions used to validate params received of an ad internally
    private async validateTwitterParams(adType: TwitterAdType, params: any): Promise<boolean> {

        // Validate text is present
        if (adType.mandatoryTweet && !params.text && (params.text === undefined || params.text === null)) {
            throw new Error(this.errorMissingTweet(adType, "text"));
        }

        // Validate tweet length
        if (adType.mandatoryTweet && params.text && params.text.length > 240) {
            throw new Error(this.errorLongTweet());
        }

        // Validate mandatory app ids
        if (adType.mandatoryAppIds && !params.androidAppId && !params.iPhoneAppId && !params.iPadAppId) {
            throw new Error(this.errorMissingTwitterApp());
        }

        return true;
    }

    // Error responses
    private errorNumCreativities(adType: AdType): string {
        return (`Error in number of creativities. Max creativities: ${adType.numCreativities.max}. ` +
                `Min creativities: ${adType.numCreativities.min}`);
    }
    private errorMimetype(): string {
        return (`One or more creativities mimetypes are not compatible with this AdType`);
    }
    private errorDimensions(dimensions: string, allowedSize: any): string {
        return (`One or more creativities are too ${dimensions}.\n` +
            `Allowed creativity dimensionss for this AdType are:\n` +
            `Minimum: ${allowedSize.min.width} x ${allowedSize.min.height}\n` +
            `Maximum: ${allowedSize.max.width} x ${allowedSize.max.height}`);
    }
    private errorSize(fileSize, maxFileSize): string {
        return (`Max file size of ${maxFileSize} bytes exceeded. File size: ${fileSize} bytes`);
    }
    private errorRatio(allowedRatio: any): string {
        return (`One or more creativities have incorrect ratio aspect\n` +
            `Allowed ratios for this AdType are:\n` +
            `Minimum ratio: ${allowedRatio.min.width}:${allowedRatio.min.width}\n` +
            `Maximum ratio: ${allowedRatio.max.width}:${allowedRatio.max.width}\n`);
    }
    private errorDuration(duration): string {
        return (`One or more creativities have incorrect duration\n` +
            `Allowed ratios for this AdType are:\n` +
            `Minimum duration: ${duration.min / 1000} sec\n` +
            `Maximum duration: ${duration.max / 1000} sec`);
    }
    private errorMissingTweet(adType: AdType, tweetParam): string {
        return (`No tweet was received. For adType ${adType.name} you must send a tweet in param ${tweetParam}`);
    }
    private errorLongTweet(): string {
        return (`Your tweet is too long. Max length for any tweet is 240 characters`);
    }
    private errorMissingTwitterApp(): string {
        return (`You must specify either a androidAppId, iPhoneAppId or iPadAppId`);
    }
}
