import {logger} from "../../config/logger";
import InsertAdTypes from "./adType.insert";
import InsertPlatforms from "./platform.insert";

export default class InsertAll {
    public async insert(): Promise<void> {
        logger.info("Inserting collections...");

        try {
            const insertPlatforms = new InsertPlatforms();
            const insertAdTypes = new InsertAdTypes();

            await insertPlatforms.insert();
            await insertAdTypes.insert();

            logger.info("Collections inserted");
        } catch (err) {
            logger.error("Error inserting in database");
            logger.info(err);
        }
    }
}
