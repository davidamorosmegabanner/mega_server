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
        "image/png",
        "video/mp4",
        "video/mov",
    ],
    facebookAPI: {
        clientId: "172396770149832",
        clientSecret: "b2cd9fae79287d0a4c55ab0a5298a45f",
        apiVersion: "v2.12",
        redirectUri: `http://localhost:3000/facebook/authCode/`,
        facebookURL: `https://graph.facebook.com`,
    },
    twitterAPI: {
        apiKey: "r7L0QOwT6fbLbIiyy4hqcPOy5",
        apiSecret: "zDy5Xm1qLYTbiuK231TksHzhdbIoPWRagTVHVcXi5fvoP8c3EL",
        redirectUri: `http://localhost:3000/twitter/authTokens`,
        redirectURL: "https://twitter.com/oauth/authenticate?oauth_token=",
    },
};
