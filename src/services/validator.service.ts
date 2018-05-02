import {AdType} from "../models/adType/adType.model";
import {InstagramAdType} from "../models/adType/instagram/instagram.adType.model";
import {InstagramAdTypeService} from "../models/adType/instagram/instagram.adType.service";
import {Creativity} from "../models/creativity/creativity.model";

/**
 *
 * Validators for compatibility between creativities and adTypes
 *
 */

export class Validator {

    // Public validator called when Ad is created
    public async validateCreativities(adType: AdType, creativities: Creativity[]): Promise<boolean> {
        let validation: boolean = true;
        // Implementing different validation depending on type of adType
        switch (adType.platform.key) {
            case "IG": {
                const instagramAdTypeService = new InstagramAdTypeService();
                const instagramAdType: InstagramAdType = await instagramAdTypeService.findByAdType(adType);
                validation = await this.validateInstagramCreativities(instagramAdType, creativities);
                break;
            }
            default: {
                throw new Error("There's been a problem validating creativities. Please contact the admin.");
            }
        }
        return validation;
    }

    // Functions used to validate ads internally
    private async validateInstagramCreativities(adType: InstagramAdType, creativities: Creativity[]): Promise<boolean> {

        // Validations for every creativity
        creativities.map((creativity) => {

            // Validate mimetypes
            if (adType.mimetypes.indexOf(creativity.mimetype) === -1) {
                throw new Error(this.errorMimetype());
            }

            // Validate sizes
            if (
                creativity.size.height < adType.allowedSize.min.height ||
                creativity.size.width < adType.allowedSize.min.width
            ) {
                throw new Error(this.errorSize("small", adType.allowedSize));
            }
            if (
                creativity.size.height > adType.allowedSize.max.height ||
                creativity.size.width > adType.allowedSize.max.width
            ) {
                throw new Error(this.errorSize("big", adType.allowedSize));
            }

            // Validate ratios
            const minRatios: number = adType.allowedRatio.min.width / adType.allowedRatio.min.height;
            const maxRatios: number = adType.allowedRatio.max.width / adType.allowedRatio.max.height;
            const creativityRatios: number = creativity.size.width / creativity.size.height;

            if (creativityRatios < minRatios || creativityRatios > maxRatios) {
                throw new Error(this.errorRatio(adType.allowedRatio));
            }

            // Validate duration if video
            if (adType.duration && creativity.filetype === "video") {
                if (adType.duration.min < creativity.duration || adType.duration.max > creativity.duration) {
                    throw new Error(this.errorDuration(adType.duration));
                }
            }
        });

        return true;
    }

    // Error responses
    private errorMimetype(): string {
        return (`One or more creativities mimetypes are not compatible with this AdType`);
    }
    private errorSize(size: string, allowedSize: any): string {
        return (`One or more creativities are too ${size}.\n` +
            `Allowed creativity sizes for this AdType are:\n` +
            `Minimum: ${allowedSize.min.width} x ${allowedSize.min.height}\n` +
            `Maximum: ${allowedSize.max.width} x ${allowedSize.max.height}`);
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
}
