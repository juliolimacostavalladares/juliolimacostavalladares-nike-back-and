const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express(); 

require('./database');

const Products = require("./Models/Products");
const {getDataApi} = require("./screping");


app.use(cors())

app.get('/', function(req, res) {

    getDataApi().then( result => {
        res.json(result)
    })
    
});


app.listen(process.env.PORT || 3333);