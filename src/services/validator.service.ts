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

    public async validateCreativities(adType: AdType, creativities: Creativity[]): Promise<boolean> {
        let validation: boolean = true;
        try {
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
        } catch (err) {
            throw new Error(err);
        }

    }

    private async validateInstagramCreativities(adType: InstagramAdType, creativities: Creativity[]): Promise<boolean> {

        // Error responses
        function errorMimetype(): string {
            return (`One or more creativities mimetypes are not compatible with this AdType!`);
        }
        function errorSize(size: string): string {
            return (`One or more creativities are too ${size}.\n` +
                `Allowed creativity sizes for this AdType are:\n` +
                `Minimum: ${adType.allowedSize.min.width} x ${adType.allowedSize.min.height}\n` +
                `Maximum: ${adType.allowedSize.max.width} x ${adType.allowedSize.max.height}`);
        }
        function errorRatio(): string {
            return ("One or more creativities have incorrect ratio aspect.\n" +
                "Allowed ratios for this AdType are:\n" +
                "Minimum ratio: " + adType.allowedRatio.min.width + ":" + adType.allowedRatio.min.width + "\n" +
                "Maximum ratio: " + adType.allowedRatio.max.width + ":" + adType.allowedRatio.max.width + "\n");
        }
        function errorDuration(): string {
            return ("One or more creativities have incorrect duration.\n" +
                "Allowed ratios for this AdType are:\n" +
                "Minimum duration: " + adType.duration.min / 1000 + "sec\n" +
                "Maximum duration: " + adType.duration.max / 1000 + "sec");
        }

        // Validations
        creativities.map((creativity) => {

            // Validate mimetypes
            if (adType.mimetypes.indexOf(creativity.mimetype) === -1) {
                throw new Error(errorMimetype());
            }

            // Validate sizes
            if (creativity.size.height < adType.allowedSize.min.height || creativity.size.width < adType.allowedSize.min.width) {
                throw new Error(errorSize("small"));
            }
            if (creativity.size.height > adType.allowedSize.max.height || creativity.size.width > adType.allowedSize.max.width) {
                throw new Error(errorSize("big"));
            }

            // Validate ratios
            const minRatios: number = adType.allowedRatio.min.width / adType.allowedRatio.min.height;
            const maxRatios: number = adType.allowedRatio.max.width / adType.allowedRatio.max.height;
            const creativityRatios: number = creativity.size.width / creativity.size.height;

            if (creativityRatios < minRatios || creativityRatios > maxRatios) {
                throw new Error(errorRatio());
            }

            // Validate duration
            if (adType.duration) {
                if (adType.duration.min < creativity.duration || adType.duration.max > creativity.duration) {
                    throw new Error(errorDuration());
                }
            }
        });

        return true;
    }
}
