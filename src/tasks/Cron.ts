import * as cron from "node-cron";
import {DummyCron} from "./publisher/dummy";

const dummyCron = new DummyCron();

export default class CronManager {

    private dummy = cron.schedule(dummyCron.interval, dummyCron.start, false);

    public startJobs() {
        // this.dummy.start();
    }
}
