const puppeteer = require('puppeteer');

const url = 'https://old.reddit.com/r/learnprogramming/comments/4q6tae/i_highly_recommend_harvards_free_online_2016_cs50/'

(async function() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url);
    
    //expand all comment threads
    const expandButtons = await page.$$('.morecomments');
    console.log(expandButtons.length)
    for (let button of expandButtons) {
        await button.click();
    }

    //select all comments, scrape text and points
    //sort comments by points
    //insert into google spreadsheet

    await browser.close();
})()