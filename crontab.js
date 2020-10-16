const schedule = require("node-schedule");
const config = require("./config.json");
const got = require("got");
const dateformat = require("dateformat");

const j = schedule.scheduleJob(config.crontab.when, resetQidTTL);

function resetQidTTL() {
  console.log(timeString()+"Running resetQidTTL() cron on istexApiUrl "+config.istexApiUrl);
  config.qids.forEach(({ q_id }) => {
    (async () => {
      try {
        if (!q_id.match(/[0-9a-f]{32}/)) {
          console.log(timeString()+"q_id " + q_id + "seems to be syntaxically incorrect");
        } else {
          const response = await got(config.istexApiUrl + "/q_id/" + q_id);
        }        
      } catch (error) {
        console.log(`${timeString()}Error requesting qid ${qid} on ${config.istexApiUrl}: ${error.response.body}`);
      }
    })();
  });
}
resetQidTTL();

function timeString() {
  const currentDate = new Date();
  return "[" + dateformat(new Date(),"isoDateTime") + "] ";
}