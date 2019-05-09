const puppeteer = require('puppeteer');

let scrape = async (name) => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto(`http://www.e-lactancia.org/breastfeeding/${name}/product/`);
    await page.waitFor(1000);

    const result = await page.evaluate(() => {
        let val = JSON.stringify(document.body.innerHTML)

        if(val.indexOf("risk-level") !== -1) {return val[(val.indexOf("risk-level")) + 10]}
        else {return "N"}
    });

    browser.close();
    return result;
};

scrape("ibuprofen").then((value) => {
    console.log(value); // Success!
});