const puppeteer = require('puppeteer');
const fs = require('fs');
const url = 'https://www.nike.com.br/snkrs#calendariol';
const selector = '.snkr-release.produto.produto--aviseme';
(async function(){
    const browser = await puppeteer.launch();
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
    });;
    console.log(recipes)
    fs.writeFile('./db.json', JSON.stringify(recipes, null, 2), err => err ? console.log(err): null);
    await browser.close();
})();