import PlatformsConfiguration from "./platforms";

/*

Attention!!!!
This configuration file is aimed to be same as database, but that's the one that matters!
To replace the existing database configuration with this one, use the flag INSERT=true when starting the server

 */

export default {

    TwitterImages: {
        name: "Twitter images",
        key: "TW_IMAGE",
        description: "Images that appear on a tweet in the feed",
        platform: PlatformsConfiguration.Twitter,
        mimetypes: ["image/jpg", "image/png", "image/gif", "image/webp"],
        actions: ["WEBSITE", "APP_DOWNLOAD"],
        numCreativities: {
            min: 1,
            max: 4,
        },
        allowedSize: {
            min: {
                width: 1200,
                height: 1200,
            },
            max: {
                width: 2400,
                height: 2400,
            },
        },
    },
};
