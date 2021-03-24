const express = require('express');
const cors = require('cors');
const app = express();
const { CronJob } = require("cron");

const {getDataApi} = require("./screping");

app.use(cors())

console.log("Scheduler Started");
const fetchRemoteJobsJob = new CronJob("* * * * *", async () => {
  console.log("Fetching new Remote Jobs...");
  const getData = app.get('/', function(req, res) {

    const products = getDataApi().then( result => {
        res.json(result)
    })
    return products
});
  console.log("Jobs: ", getData);
});
//You need to explicity start the cronjob 
fetchRemoteJobsJob.start();




app.listen(process.env.PORT || 3333);