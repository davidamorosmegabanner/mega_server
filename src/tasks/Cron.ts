import * as moment from "moment";
import * as cron from "node-cron";
import DummyEngine from "../dummy/main";
import {PublisherCron} from "./publisher/publisher";
import {StatsCron} from "./stats/stats";
import {UpdaterCron} from "./updater/updater";

const updaterCron = new UpdaterCron();
const dummyCron = new DummyEngine();
const publisherCron = new PublisherCron();
const statsCron = new StatsCron();

export default class CronManager {

    private update = cron.schedule(convertToCronTime(updaterCron.interval), () => { updaterCron.start(); }, false);
    private dummy = cron.schedule(convertToCronTime(dummyCron.interval), () => {dummyCron.start(); }, false);
    private publish = cron.schedule(convertToCronTime(publisherCron.interval), () => { publisherCron.start(); }, false);
    private stats = cron.schedule(convertToCronTime(statsCron.interval), () => { statsCron.start(); }, false);

    public startJobs() {
        this.update.start();
        this.dummy.start();
        this.publish.start();
        this.stats.start();
    }
}

export function convertToCronTime(period: string) {
    switch (period) {
        case ("1MIN"): {
            return "* * * * *";
        }
        case ("5MIN"): {
            return "*/5 * * * *";
        }
        case ("10MIN"): {
            return "*/10 * * * *";
        }
        case ("30MIN"): {
            return "*/30 * * * *";
        }
        case ("1HOUR"): {
            return "0 * * * *";
        }
        case ("2HOUR"): {
            return "0 */2 * * *";
        }
        case ("4HOUR"): {
            return "0 */4 * * *";
        }
        case ("6HOUR"): {
            return "0 */6 * * *";
        }
        case ("12HOUR"): {
            return "0 */12 * * *";
        }
        case ("1DAY"): {
            return "0 0 * * *";
        }
    }
}

export function getIntervalDate(period: string): { now: Date, before: Date } {
    const NOW = new Date();
    switch (period) {
        case ("1MIN"): {
            return {
                now: NOW,
                before: moment(NOW).subtract(1, "minutes").toDate(),
            };
        }
        case ("5MIN"): {
            return {
                now: NOW,
                before: moment(NOW).subtract(5, "minutes").toDate(),
            };
        }
        case ("10MIN"): {
            return {
                now: NOW,
                before: moment(NOW).subtract(10, "minutes").toDate(),
            };
        }
        case ("30MIN"): {
            return {
                now: NOW,
                before: moment(NOW).subtract(30, "minutes").toDate(),
            };
        }
        case ("1HOUR"): {
            return {
                now: NOW,
                before: moment(NOW).subtract(1, "hours").toDate(),
            };
        }
        case ("2HOUR"): {
            return {
                now: NOW,
                before: moment(NOW).subtract(2, "hours").toDate(),
            };
        }
        case ("4HOUR"): {
            return {
                now: NOW,
                before: moment(NOW).subtract(4, "hours").toDate(),
            };
        }
        case ("6HOUR"): {
            return {
                now: NOW,
                before: moment(NOW).subtract(6, "hours").toDate(),
            };
        }
        case ("12HOUR"): {
            return {
                now: NOW,
                before: moment(NOW).subtract(12, "hours").toDate(),
            };
        }
        case ("1DAY"): {
            return {
                now: NOW,
                before: moment(NOW).subtract(24, "hours").toDate(),
            };
        }
    }
}
