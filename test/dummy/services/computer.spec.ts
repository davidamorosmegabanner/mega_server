import {assert, expect} from "chai";
import * as mongoose from "mongoose";
import config from "../../../src/config/config";
import {NormalizedStats} from "../../../src/dummy/models/normalizedStats";
import ComputerService from "../../../src/dummy/services/computer";
import {Ad} from "../../../src/models/ad/ad.model";
import {Campaign} from "../../../src/models/campaign/campaign.model";
import {UserService} from "../../../src/models/user/user.service";

const computerService = new ComputerService();
const userService = new UserService();

describe("Ad middleware test", () => {

    before((done) => {
        mongoose.connect(config.db);
        done();
    });

    it ("Tests python exec", async () => {
        try {
            const clicks = 15;
            const impressions = 20;
            // const randomCTRArray = Array.from({length: 100}, () => Math.floor(Math.random() * 1000 / 4) / 1000);
            const randomCTRArray = [];
            console.log(randomCTRArray);

            const test = await computerService.runPythonScript(clicks, impressions, randomCTRArray);
            console.log(test);

            expect(test).to.be.at.least(0);
            expect(test).to.be.at.most(1);
        } catch (err) {
            assert.ifError(err, "error making pdf");
        }
    });

    it("Should compute CTR for every item in array", async () => {
        try {
            const before = new Date(); before.setDate(before.getDate() - 5);
            const after = new Date(); after.setDate(after.getDate() + 5);
            const user = await userService.findAny();
            const campaign: Campaign = {
                _id: "abcd",
                name: "Campaign 1",
                description: "something",
                owner: user,
                budget: 200,
                dailyBudget: 10,
                active: true,
                deleted: false,
                valid: true,
                startDate: before,
                endDate: after,
                created: before,
                updated: before,
            };
            const ad: Ad = {
                _id: "12345",
                name: "Ad",
                owner: user,
                adTypeKey: "TW_TWEET",
                campaign: (campaign),
                deleted: false,
                created: before,
                updated: before,
                published: false,
            };
            const newStats: NormalizedStats = {
                campaign: (campaign),
                stats: [{
                    ad: (ad),
                    CTR: { clicks: 100, impressions: 700 },
                }, {
                    ad: (ad),
                    CTR: { clicks: 72, impressions: 354 },
                }, {
                    ad: (ad),
                    CTR: { clicks: 125, impressions: 823 },
                }, {
                    ad: (ad),
                    CTR: { clicks: 134, impressions: 723 },
                }],
            };
            const oldStats: NormalizedStats[] = [
                {
                    campaign: (campaign),
                    stats: [{
                        ad: (ad),
                        CTR: { clicks: 33, impressions: 300 },
                    }, {
                        ad: (ad),
                        CTR: { clicks: 10, impressions: 200 },
                    }, {
                        ad: (ad),
                        CTR: { clicks: 2, impressions: 10 },
                    }, {
                        ad: (ad),
                        CTR: { clicks: 43, impressions: 374 },
                    }],
                },
            ];

            const computedStats = await computerService.compute(newStats, oldStats);

            expect(computedStats).to.be.a("object");
            expect(computedStats.stats[0]).to.be.a("object");
            expect(computedStats.stats[1]).to.have.property("ad");
            expect(computedStats).to.satisfy(() => {
                let isOK: boolean = true;
                computedStats.stats.forEach((computedStat) => {
                    if (computedStat.weight > 1 || computedStat.weight < 0) { isOK = false; }
                });
                return isOK;
            });
        } catch (err) {
            assert.ifError(err, "error computing CTR");
        }
    });

    after((done) => {
        mongoose.connection.close();
        done();
    });
});
