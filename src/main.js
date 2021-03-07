const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false})
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 881});
  await page.goto('https://www.nike.com.br/snkrs#calendario')
  
  const List = await page.evaluate(() => {
        

    const ListDays = [...document.querySelectorAll('.snkr-release__day')];

    const dayList = ListDays.map(r => {
        return r
    });

    const ListMonth = [...document.querySelectorAll('.snkr-release__month')];

    const monthList = ListMonth.map(r => {
        return r
    });

    const listName = [...document.querySelectorAll('.snkr-release__bottom .snkr-release__name')];

    const nameList = listName.map(r => {
        return r
    });

    Array.from(document.querySelectorAll('.lazy.aspect-radio-box-inside')).forEach((el) => el.classList.remove('aspect-radio-box-inside'));

    const ListImage = ([...document.querySelectorAll('.produto--aviseme .aspect-radio-box-inside')]).map(({src}) => ({src}))
    console.log(ListImage)
    const tenis = {
      img: ListImage,
      day: dayList,
      
    }
    return tenis;
  });

  console.log(List);

  // await browser.close()
})()
