var schedule = require('node-schedule');
var shell    = require('shelljs');
var config   = require('./config.json');

var j = schedule.scheduleJob(config.crontab.when, runCrontabStuff);

function runCrontabStuff() {
  // config.crontab.commands.forEach(function (cmd) {
  //   if (!config.crontab.options.silent) {
  //     console.log(new Date() + ' - running cron task : ' + cmd);
  //   }
  //   shell.exec(cmd, {
  //     silent: config.crontab.options.silent,
  //     env: Object.assign(process.env, config.env)
  //   });
  // });
}
runCrontabStuff();