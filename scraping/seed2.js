const mongoose = require('mongoose');
const Pharma = require('./Pharma');
const puppeteer = require('puppeteer');


const dbName = 'Pharma';
mongoose
  .connect(`mongodb://localhost/${dbName}`, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

  let x = ` Name>abacavir>
      Category>B3>
      Class1>Antimicrobials>
      Class2>Antiviral agents>
      Class3>x>
    </tr>

      Name>abacavir / dolutegravir / lamivudine>
      Category>B3>
      Class1>Antimicrobials>
      Class2>Antiviral agents>
      Class3>x>
    </tr>

      Name>abacavir / lamivudine / zidovudine>
      Category>B3>
      Class1>Antimicrobials>
      Class2>Antiviral agents>
      Class3>x>
    </tr>

      Name>abacavir/ lamivudine>
      Category>B3>
      Class1>Antimicrobials>
      Class2>Antiviral agents>
      Class3>x>
    </tr>

      Name>abatacept>
      Category>C>
      Class1>Allergy and Immune System>
      Class2>Immunomodifiers>
      Class3>x>
    </tr>

      Name>abciximab>
      Category>C>
      Class1>Cardiovascular System>
      Class2>Anticoagulants and thrombolytic agents>
      Class3>x>
    </tr>

      Name>abiraterone>
      Category>D>
      Class1>Endocrine System>
      Class2>Antiandrogens>
      Class3>x>
    </tr>

      Name>acamprosate>
      Category>B2>
      Class1>Detoxifying Agents, Antidotes >
      Class2>x>
      Class3>x>
    </tr>`

    x = x.split("</tr>")
    x = x.map(el => el.split(">").map(e => e.trim()))
    x.map(el => el.pop())


let scrape = async (name) => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto(`http://www.e-lactancia.org/breastfeeding/${name}/product/`);
    await page.waitFor(3000);

    const result = await page.evaluate(() => {
        let val = JSON.stringify(document.body.innerHTML)

        if(val.indexOf("risk-level") !== -1) {return val[(val.indexOf("risk-level")) + 10]}
        else {return "N"}
    });

    browser.close();
    return result;
};

let createObject = async (el) => {
  let uniq = String(el[1]).split(" ")[0]
  //  let lr = await scrape(uniq)

  return { "Name": el[1],
      "Pregnancy_category": el[3],
      "Lactation_category": "lr",
      "Class1": el[5],
      "Class2": el[7],
      "Class3": el[9],
      "WikiURL": `https://en.wikipedia.org/wiki/${uniq}`
      }
  }

  let createArray = async (arr) => {
    let pharmas = await arr.map(el => createObject(el))
    return pharmas
  }



//    let db = async (arr) => {
//     let pharmas = await createArray(arr)
//    }

// db(x)

console.log(createArray(x))