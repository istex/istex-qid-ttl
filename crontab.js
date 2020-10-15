const schedule = require("node-schedule");
const config = require("./config.json");
const got = require("got");
const url = require("url");

const j = schedule.scheduleJob(config.crontab.when, runCrontabStuff);

function runCrontabStuff() {
  config.qids.forEach(({ qid, comment }) => {
    (async () => {
      try {
        if (!qid.match(/[0-9a-f]{32}/)) {
          console.log("qid " + qid + "seems to be syntaxically incorrect");
        } else {
          const response = await got(config.istexApiUrl + "/q_id/" + qid);
        }        
      } catch (error) {
        console.log(`Error requesting qid ${qid} on ${config.istexApiUrl}: ${error.response.body}`);
      }
    })();
  });
}
runCrontabStuff();
