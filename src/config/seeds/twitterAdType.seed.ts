import PlatformsConfiguration from "./platforms.seed";

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
        mimetypes: [],
        objectives: ["APP_ENGAGEMENTS", "APP_INSTALLS", "AWARENESS", "FOLLOWERS",
            "TWEET_ENGAGEMENTS", "VIDEO_VIEWS", "VIDEO_VIEWS_PREROLL", "WEBSITE_CLICKS"],
        placements: ["ALL_ON_TWITTER", "PUBLISHER_NETWORK", "TWITTER_PROFILE", "TWITTER_SEARCH", "TWITTER_TIMELINE"],
        numCreativities: {
            min: 0,
            max: 0,
        },
    },

    TwitterImages: {
        name: "Tweet with image",
        key: "TW_TWEET_IMAGE",
        description: "Images that appear on a tweet in the feed",
        platform: PlatformsConfiguration.Twitter,
        mimetypes: ["image/jpg", "image/png", "image/gif", "image/webp"],
        objectives: ["APP_ENGAGEMENTS", "APP_INSTALLS", "AWARENESS", "FOLLOWERS",
            "TWEET_ENGAGEMENTS", "VIDEO_VIEWS", "VIDEO_VIEWS_PREROLL", "WEBSITE_CLICKS"],
        placements: ["ALL_ON_TWITTER", "PUBLISHER_NETWORK", "TWITTER_PROFILE", "TWITTER_SEARCH", "TWITTER_TIMELINE"],
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
