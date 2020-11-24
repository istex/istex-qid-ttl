const schedule = require("node-schedule");
const config = require("./config.json");
const got = require("got");
const mapLimit = require("async/mapLimit");
const dateformat = require("dateformat");

const j = schedule.scheduleJob(config.crontab.when, resetQidTTL);

const concurrency = 3;


// main function, which will be called by the cron
async function resetQidTTL() {
  console.info("***************************");
  console.info(timeString() + "Running resetQidTTL() cron on istexApiUrl " + config.istexApiUrl);

  const notUpdatedQids = [];
  const checkableQids = [];

  // check q_id syntax and store correct q_ids into an array
  for (qidObj of config.qids) {
    const q_id = qidObj.q_id;
    if (!q_id.match(/[0-9a-f]{32}/)) {
      console.warn( timeString() + "q_id " + q_id + " seems to be syntaxically incorrect" );
      notUpdatedQids.push(q_id);
    } else {
      checkableQids.push(q_id);
    }
  }


  mapLimit(checkableQids, concurrency, function (q_id, cb) {
    // call to q_id API, which consequence is to reset TTL
    got(config.istexApiUrl + "/q_id/" + q_id)
      .catch((err) => {
        notUpdatedQids.push(q_id);
        //TODO send mail to admin when error occur ?
        if (err.response.statusCode === 404) 
            console.error(timeString() + "Error requesting q_id" + q_id + " : not found.");
        })
      .finally(() => {return cb()});
  }, function (err) {
    // all q_id has been checked / reset
    if (err) console.error(err);
    console.info(timeString() + "All the " + config.qids.length + " q_ids have been processed. ");
    console.info(timeString() + "TTL of " + (config.qids.length - notUpdatedQids.length) + " q_ids successfully reset");
    if (notUpdatedQids.length > 0) {
      console.warn(timeString() + "TTL reset impossible for the following q_id(s) :");
      for(q_id of notUpdatedQids) {
        console.warn("- "+q_id);
      }
    }  
  });

}//end of resetQidTTL()

resetQidTTL();

function timeString() {
  const currentDate = new Date();
  return "[" + dateformat(new Date(), "isoDateTime") + "] ";
}
