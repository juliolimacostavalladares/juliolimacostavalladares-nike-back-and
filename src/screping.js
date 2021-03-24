const puppeteer = require('puppeteer');

const url = 'https://www.nike.com.br/snkrs#calendariol';
const selector = '.snkr-release.produto.produto--aviseme';

async function getDataApi() {
    let browser = await puppeteer.launch({'args' : ['--no-sandbox', '--disable-setuid-sandbox']});
    let page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setDefaultNavigationTimeout(0); 
    await page.setRequestInterception(true);

    page.on('request', (req) => {
        if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image' || req.resourceType() == 'media' || req.resourceType() == 'script' | req.resourceType() == 'texttrack' || req.resourceType() == 'xhr' || req.resourceType() == 'websocket' || req.resourceType() == 'fetch' || req.resourceType() == 'eventsource' || req.resourceType() == 'manifest' ){
            req.abort();
        }
        else {
            req.continue();
        }
    });

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

    await browser.close();
    return recipes
}


module.exports.getDataApi = getDataApi