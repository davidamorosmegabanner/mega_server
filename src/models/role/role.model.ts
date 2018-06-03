export class RoleModel {
    public readonly name: string;
    public readonly key: string;
    public readonly description: string;
    public constructor(
        name: string,
        key: string,
        description: string,
    ) {
        this.name = (name);
        this.key = (key);
        this.description = (description);
    }
}

const Roles: RoleModel[] = [];

Roles.push(new RoleModel(
    "Administrator",
    "admin",
    "Administrator of the system",
));

export default Roles;
