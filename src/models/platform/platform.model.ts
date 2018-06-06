export class Platform {
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

export const Twitter: Platform = new Platform(
    "Twitter",
    "TW",
    "Twitter Social Network",
);

export const Instagram: Platform = new Platform(
    "Instagram",
    "IG",
    "Instagram Social Network",
);

export const Facebook: Platform = new Platform(
    "Facebook",
    "FB",
    "Facebook Social Network",
);

export const YouTube: Platform = new Platform(
    "YouTube",
    "YT",
    "YouTube Social Network",
);
