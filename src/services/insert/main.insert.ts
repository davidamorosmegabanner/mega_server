import InsertAdTypes from "./adType.insert";
import InsertPlatforms from "./platform.insert";

export default class InsertAll {
    public async insert(): Promise<void> {
        console.log("Inserting collections...");

        try {
            const insertPlatforms = new InsertPlatforms();
            const insertAdTypes = new InsertAdTypes();

            await insertPlatforms.insert();
            await insertAdTypes.insert();

            console.log("Collections inserted");
        } catch (err) {
            console.error("Error inserting in database");
            console.log(err);
        }
    }
}
