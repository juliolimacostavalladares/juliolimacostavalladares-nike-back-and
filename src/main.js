const express = require('express');// Adding Express
var cors = require('cors');
    const app = express(); // Initializing Express
    const puppeteer = require('puppeteer'); // Adding Puppeteer
    app.use(cors())
    app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
    });

    const url = 'https://www.nike.com.br/snkrs#calendariol';
    const selector = '.snkr-release.produto.produto--aviseme';

    // Wrapping the Puppeteer browser logic in a GET request
    app.get('/', function(req, res) {

        // Launching the Puppeteer controlled headless browser and navigate to the Digimon website
        puppeteer.launch({'args' : ['--no-sandbox', '--disable-setuid-sandbox']}).then(async function(browser) {
            const page = await browser.newPage();
            await page.setDefaultNavigationTimeout(0);  
            await page.goto(url);
            const recipes = await page.$$eval(selector, nodes => {
                return nodes.map(node => {
                    const img = node.querySelector('img').getAttribute('data-src');
                    const day = node.querySelector('.snkr-release__day').textContent;
                    const month = node.querySelector('.snkr-release__month').textContent;
                    const hour = node.querySelector('.snkr-release__mobile-date').textContent;
                    const name = node.querySelector('.snkr-release__name').textContent;
                    const arry = {
                        name: name,
                        data: {
                            day,
                            month,
                            hour
                        },
                        img
                }
                return arry
        })

    });
            // Closing the Puppeteer controlled headless browser
            await browser.close();
            // Sending the Digimon names to Postman
            res.send(recipes);
        });
    });

    // Making Express listen on port 7000
    app.listen(process.env.PORT || 3333);