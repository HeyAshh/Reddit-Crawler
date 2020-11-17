const puppeteer = require('puppeteer');
const Sheet = require('./sheet');

const url = 'https://old.reddit.com/r/learnprogramming/comments/4q6tae/i_highly_recommend_harvards_free_online_2016_cs50/';

(async function() {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(url);
    const sheet = new Sheet();
    await sheet.load();
    //create sheet with title
    const title = await page.$eval('.title a', el => el.textContent);
    const sheetIndex = await sheet.addSheet(title);
    
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
    const formattedComments = [];
    for (let comment of comments) {
        // scrape points
        const points = await comment.$eval('.score', el => el.textContent).catch(err => console.log('no score'));
        // scrape text
        const rawText = await comment.$eval('.usertext-body', el => el.textContent).catch(err => console.error('no text'));
        if (points && text) {
            const text = rawText.replace(/\n/g, '');
            formattedComments.push({points, text});
        }
    }

     formattedComments.sort((a, b) => {
        const pointsA = Number(a.points.split(' ')[0])
        const pointsB = Number(b.points.split(' ')[0])
        return pointsB - pointsA;
     })
     console.log(formattedComments.length);
    //insert into google spreadsheet
    sheet.addRows(formattedComments, sheetIndex);
  
    await browser.close();
})()
