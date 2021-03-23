const express = require('express');
const cors = require('cors');

const app = express(); 

const {getDataApi} = require("./screping");


app.use(cors())

app.get('/', function(req, res) {

    getDataApi().then( result => {
        res.json(result)
    })
    
});


app.listen(process.env.PORT || 3333);