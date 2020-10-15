# istex-qid-ttl

[ezmaster](https://github.com/Inist-CNRS/ezmaster) app used to keep ISTEX q_id alive. It periodically auto-request ISTEX API to reset TTL (which is today 180 days on production API)

## Prerequisites

- [ezmaster](https://github.com/Inist-CNRS/ezmaster) >= 4.0.0

## Usage

- Add the application in your [ezmaster](https://github.com/Inist-CNRS/ezmaster) then create a new instance on this application

- Then, open the configuration of the created instance in your ezmaster and insert your wanted parameters:

  ```json
  {
    "crontab" : {
      "when": "0 4 * * *",
      "qids" : [
        {
          "q_id": "...",
          "comment": "description of the content"
        },
        ...
      ]
    },
    "options": {
      "silent": false
    }
  }
  ```

  To enable docker logging, you can set the ``crontab.options.silent`` to `false`. Having log is usefull at the begining to setup the stuff.

  You can also change ``crontab.when`` (crontabl syntax) if you do not want the script be run too often. Ex: `"0 4 * * *"` will run the command each day at 04:00 AM by default. 
