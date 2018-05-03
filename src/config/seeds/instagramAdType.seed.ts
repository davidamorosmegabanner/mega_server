import PlatformsConfiguration from "./platforms.seed";

/*

Attention!!!!
This configuration file is aimed to be same as database, but that's the one that matters!
To replace the existing database configuration with this one, use the flag INSERT=true when starting the server

 */

export default {

    InstagramImage: {
        name: "Instagram feed image",
        key: "IG_IMAGE",
        description: "Instagram image that appears in the feed",
        platform: PlatformsConfiguration.Instagram,
        mimetypes: ["image/jpg", "image/png"],
        actions: ["ACTION1", "ACTION2", "ACTION3"],
        objectives: ["OBJECTIVE1", "OBJECTIVE2", "OBJECTIVE3"],
        numCreativities: {
            min: 1,
            max: 1,
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
        allowedRatio: {
            min: {
                width: 4,
                height: 5,
            },
            max: {
                width: 1.91,
                height: 1,
            },
        },
    },

    InstagramVideo: {
        name: "Instagram feed video",
        key: "IG_VIDEO",
        description: "Instagram video that appears in the feed",
        platform: PlatformsConfiguration.Instagram,
        mimetypes: ["video/mp4", "video/mov"],
        actions: ["ACTION1", "ACTION2", "ACTION3"],
        objectives: ["OBJECTIVE1", "OBJECTIVE2", "OBJECTIVE3"],
        numCreativities: {
            min: 1,
            max: 1,
        },
        allowedSize: {
            min: {
                width: 1080,
                height: 1920,
            },
            max: {
                width: 2400,
                height: 2400,
            },
        },
        allowedRatio: {
            min: {
                width: 4,
                height: 5,
            },
            max: {
                width: 1.91,
                height: 1,
            },
        },
        duration: {
            min: 1 * 1000,
            max: 60 * 1000,
        },
    },

    InstagramStory: {
        name: "Instagram story",
        key: "IG_STORY",
        description: "Instagram image that appears while viewing stories",
        platform: PlatformsConfiguration.Instagram,
        mimetypes: ["image/jpg", "image/png", "video/mp4", "video/mov"],
        actions: ["ACTION1", "ACTION2", "ACTION3"],
        objectives: ["OBJECTIVE1", "OBJECTIVE2", "OBJECTIVE3"],
        numCreativities: {
            min: 1,
            max: 1,
        },
        allowedSize: {
            min: {
                width: 1080,
                height: 1920,
            },
            max: {
                width: 1080,
                height: 1920,
            },
        },
        allowedRatio: {
            min: {
                width: 9,
                height: 16,
            },
            max: {
                width: 9,
                height: 16,
            },
        },
        duration: {
            min: 1 * 1000,
            max: 15 * 1000,
        },
    },

    InstagramCarousel: {
        name: "Instagram carousel of images",
        key: "IG_CAROUSEL",
        description: "Instagram set of images that appear in the feed",
        platform: PlatformsConfiguration.Instagram,
        mimetypes: ["image/jpg", "image/png", "video/mp4", "video/mov"],
        actions: ["ACTION1", "ACTION2", "ACTION3"],
        objectives: ["OBJECTIVE1", "OBJECTIVE2", "OBJECTIVE3"],
        numCreativities: {
            min: 1,
            max: 10,
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
        allowedRatio: {
            min: {
                width: 4,
                height: 5,
            },
            max: {
                width: 1.91,
                height: 1,
            },
        },
    },
};
