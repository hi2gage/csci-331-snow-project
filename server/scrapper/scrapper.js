const cheerio = require('cheerio');
const request = require('request');

async function scrap() {
    return new Promise(function (resolve, reject) {
        request({
            method: 'GET',
            url: 'https://skiwhitefish.com/snowreport/'
        }, (err, res, body) => {

            if (err) return console.error(err);

            let $ = cheerio.load(body);

            let firstCol = ($('#post-13 > div > div:nth-child(1) > div.col-sm-9 > div > div:nth-child(1)').html().split("<br>"))
            let secondCol = ($('#post-13 > div > div:nth-child(1) > div.col-sm-9 > div > div:nth-child(2)').html().split("<br>"))


            var snowReport = []
            let j = 0;
            firstCol.forEach(function (i, e) {
                snowReport[j] = i.trim()
                j++
            })

            secondCol.forEach(function (i, e) {
                snowReport[j] = i.trim()
                j++
            })



            var obj = {}
            snowReport.forEach(function (item, index) {
                var res = item.split(':').map(x => x.trim())
                console.log(res)
                if (index < 3) {
                    console.log("first")
                    obj[res[0]
                        .replaceAll(' ', '_')
                        .replaceAll('/', '_')
                        .concat('_in')]
                        = parseInt(res[1].split("/")[0].replaceAll('\"', ''))
                }
                else if (index == 3) {
                    console.log("second")
                    obj[res[0]
                        .replaceAll(' ', '_')
                        .replaceAll('/', '_')
                        .concat('_F')]
                        = parseInt(res[1].split("/")[0].replaceAll('°F', ''))
                }
                else if (index == 4 || index == 5) {
                    console.log("third")
                    obj[res[0]
                        .replaceAll(' ', '_')
                        .replaceAll('/', '_')
                        .concat('_in')]
                        = parseInt(res[1].split("/")[0].replaceAll('\"', ''))
                }
                else {
                    console.log("second")
                    obj[res[0]
                        .replaceAll(' ', '_')
                        .replaceAll('/', '_')]
                        = res[1]
                }
            });


            console.log(obj);
            resolve(obj)
        });
    })
}

module.exports = { scrap }