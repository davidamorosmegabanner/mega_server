export interface Role {
    name: string;
    key: string;
    description: string;
}

const Roles: Role[] = [];

Roles.push({
    name: "Administrator",
    key: "admin",
    description: "Administrator of the system",
});

export default Roles;
