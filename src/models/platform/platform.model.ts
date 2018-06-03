export class PlatformModel {
    public readonly name: string;
    public readonly key: string;
    public readonly description: string;
    constructor(
        name: string,
        key: string,
        description: string,
    ) {
        this.name = (name);
        this.key = (key);
        this.description = (description);
    }
}

export const Twitter: PlatformModel = new PlatformModel(
    "Twitter",
    "TW",
    "Twitter Social Network",
);

export const Instagram: PlatformModel = new PlatformModel(
    "Instagram",
    "IG",
    "Instagram Social Network",
);

export const Facebook: PlatformModel = new PlatformModel(
    "Facebook",
    "FB",
    "Facebook Social Network",
);

export const YouTube: PlatformModel = new PlatformModel(
    "YouTube",
    "YT",
    "YouTube Social Network",
);
