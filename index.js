const puppeteer = require('puppeteer');

const url = 'https://old.reddit.com/r/learnprogramming/comments/4q6tae/i_highly_recommend_harvards_free_online_2016_cs50/';

(async function() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url);
    
    //expand all comment threads
    let expandButtons = await page.$$('.morecomments');
    while (expandButtons.length) {
        for (let button of expandButtons) {
            await button.click();
            await page.waitFor(500);
        }
        await page.waitFor(1000);
        expandButtons = await page.$$('.morecomments');
    }
    
    //select all comments, scrape text and points
    const comments = await page.$$('.entry');
    for (let comment of comments) {
        // scrape points
        const points = await comment.$eval('.score', el => el.textContent).catch(err => console.log('no score'));
        console.log({points});
        // scrape text
        const text = await comment.$eval('.usertext-body', el => el.textContent).catch(err => console.error('no text'));
    }
    //sort comments by points
    //insert into google spreadsheet

    await browser.close();
})()