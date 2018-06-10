import {secrets} from "../secrets";

export default {
    db: "mongodb://localhost:27017/mega",
    port: 3000,
    redirectURL: "http://megabanner.net",
    superToken: {
        isActive: true,
        value: "8dab98ca9e27007f83e088a5bea17e7d",
    },
    session: {
        seed: "VulVgkTh2pynRD4rEkxM",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false, // Deactivated while connection is http
            maxAge: 3600000, // 3600 sec, 1 hour
        },
    },
    acceptedMedia: [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/gif",
        "video/mp4",
        "video/mov",
    ],
    facebookAPI: {
        clientId: secrets.facebook.clientId,
        clientSecret: secrets.facebook.secret,
        apiVersion: "v2.12",
        redirectUri: `http://localhost:3000/facebook/authCode/`,
        facebookURL: `https://graph.facebook.com`,
    },
    twitterAPI: {
        apiKey: secrets.twitter.apiKey,
        apiSecret: secrets.twitter.apiSecret,
        redirectUri: `http://localhost:3000/twitter/authTokens`,
        redirectURL: "https://twitter.com/oauth/authenticate?oauth_token=",
    },
};
