export default {
    db: "mongodb://localhost:27017/mega",
    port: 3000,
    superToken: {
        isActive: true,
        value: "8dab98ca9e27007f83e088a5bea17e7d",
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
};
