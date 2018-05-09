import PlatformsConfiguration from "./platforms";

/*

Attention!!!!
This configuration file is aimed to be same as database, but that's the one that matters!
To replace the existing database configuration with this one, use the flag INSERT=true when starting the server

 */

export default {

    TwitterTweet: {
        name: "Tweet",
        key: "TW_TWEET",
        description: "Simple tweet that appears in the feed",
        platform: PlatformsConfiguration.Twitter,
        mandatoryTweet: true,
        mandatoryAppIds: false,
        mimetypes: [],
        numCreativities: {
            min: 0,
            max: 0,
        },
    },

    TwitterTweetImage: {
        name: "Tweet with image (up to 4 images)",
        key: "TW_TWEET_IMAGE",
        description: "Images that appear on a tweet in the feed",
        platform: PlatformsConfiguration.Twitter,
        mandatoryTweet: true,
        mandatoryAppIds: false,
        mimetypes: ["image/jpg", "image/png", "image/webp"],
        numCreativities: {
            min: 1,
            max: 4,
        },
        allowedSize: {
            min: {
                width: 1200,
                height: 800,
            },
            max: {
                width: 2400,
                height: 1600,
            },
        },
    },

    TwitterTweetGif: {
        name: "Tweet with GIF",
        key: "TW_TWEET_GIF",
        description: "GIF that appears on a tweet in the feed",
        platform: PlatformsConfiguration.Twitter,
        mandatoryTweet: true,
        mandatoryAppIds: false,
        mimetypes: ["image/gif"],
        numCreativities: {
            min: 1,
            max: 1,
        },
        allowedSize: {
            min: {
                width: 1200,
                height: 800,
            },
            max: {
                width: 2400,
                height: 1600,
            },
        },
    },

    TwitterTweetVideo: {
        name: "Tweet with video",
        key: "TW_TWEET_VIDEO",
        description: "Video that appears on a tweet in the feed",
        platform: PlatformsConfiguration.Twitter,
        mandatoryTweet: true,
        mandatoryAppIds: false,
        mimetypes: ["video/mp4"],
        numCreativities: {
            min: 1,
            max: 1,
        },
        allowedSize: {
            min: {
                width: 1200,
                height: 600,
            },
            max: {
                width: 2400,
                height: 1600,
            },
        },
    },

    TwitterAppImage: {
        name: "Card with an app id that appears on the feed",
        key: "TW_APP_IMAGE",
        description: "App card that appears on the feed with an image",
        platform: PlatformsConfiguration.Twitter,
        mandatoryTweet: false,
        mandatoryAppIds: true,
        mimetypes: ["image/jpg", "image/png", "image/webp"],
        numCreativities: {
            min: 1,
            max: 1,
        },
        allowedSize: {
            min: {
                width: 500,
                height: 500,
            },
            max: {
                width: 1200,
                height: 1200,
            },
        },
    },

    TwitterAppVideo: {
        name: "Tweet with video",
        key: "TW_APP_VIDEO",
        description: "App card that appears on the feed with a video",
        platform: PlatformsConfiguration.Twitter,
        mandatoryTweet: false,
        mandatoryAppIds: true,
        mimetypes: ["image/jpg", "image/png", "image/webp"],
        numCreativities: {
            min: 1,
            max: 1,
        },
        allowedSize: {
            min: {
                width: 500,
                height: 500,
            },
            max: {
                width: 1200,
                height: 1200,
            },
        },
    },
};
