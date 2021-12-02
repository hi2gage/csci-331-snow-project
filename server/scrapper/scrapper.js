const cheerio = require('cheerio');
const request = require('request');

function scrap() {
    request({
        method: 'GET',
        url: 'https://skiwhitefish.com/snowreport/'
    }, (err, res, body) => {

        if (err) return console.error(err);

        let $ = cheerio.load(body);

        let title = $('title');

        console.log(title.text());
    });
}

export {scrap}