export interface OperatingSystem {
    name: string;
    key: string;
}

const OperatingSystems: OperatingSystem[] = [];

OperatingSystems.push({
    name: "Windows",
    key: "WI",
});
OperatingSystems.push({
    name: "Linux",
    key: "LI",
});
OperatingSystems.push({
    name: "Mac OS X",
    key: "MA",
});
OperatingSystems.push({
    name: "iOS",
    key: "IO",
});
OperatingSystems.push({
    name: "Android",
    key: "AN",
});
OperatingSystems.push({
    name: "Windows Phone",
    key: "WP",
});
OperatingSystems.push({
    name: "Others",
    key: "OT",
});

export default OperatingSystems;
