import * as moment from "moment";
import * as cron from "node-cron";
import {DummyCron} from "./publisher/dummy";
import {StatsCron} from "./stats/stats";

const dummyCron = new DummyCron();
const statsCron = new StatsCron();

export default class CronManager {

    private dummy = cron.schedule(convertToCronTime(dummyCron.interval), () => { dummyCron.start(); }, false);
    private stats = cron.schedule(convertToCronTime(statsCron.interval), () => { statsCron.start(); }, false);

    public startJobs() {
        // this.dummy.start();
        // this.stats.start();
    }
}

export function convertToCronTime(period: string) {
    switch (period) {
        case ("1MIN"): {
            return "0 * * * * *";
        }
        case ("5MIN"): {
            return "* 0,5,10,15,20,25,30,35,40,45,50,55 * * * *";
        }
        case ("10MIN"): {
            return "* 0,10,20,30,40,50 * * * *";
        }
        case ("30MIN"): {
            return "* 0,30 * * * *";
        }
        case ("1HOUR"): {
            return "* 0 * * * *";
        }
        case ("2HOUR"): {
            return "* * 0,2,4,6,8,10,12,14,16,18,20,22 * * *";
        }
        case ("4HOUR"): {
            return "* * 0,4,8,12,16,20 * * *";
        }
        case ("6HOUR"): {
            return "* * 0,6,12,18 * * *";
        }
        case ("12HOUR"): {
            return "* * 0,12 * * *";
        }
        case ("1DAY"): {
            return "* * 0 * * *";
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
