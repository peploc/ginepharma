const mongoose = require("mongoose");
const Pharma = require("../models/Pharma");
const fs = require("fs").promises;

let seed;
mongoose
  .connect("mongodb+srv://admin:R3s1l13nz4@cluster0-vuqhx.mongodb.net/ginepharma?retryWrites=true", { useNewUrlParser: true })
  .then(a => {
    console.log(
      `Connected to Mongo! Database name: "${a.connections[0].name}"`
    );

    const PharmaSeed = async () => {
      seed = await fs.readFile("pharmaNew.json", (err, data) => {
        if (err) throw err;
        return data
      });
      seed = await JSON.parse(seed)
      seed = await seed.map(el => {
        if (el.Lactation_category === "0") {el.Lactation_category = "L1"; return el}
        if (el.Lactation_category === "1") {el.Lactation_category = "L2"; return el}
        if (el.Lactation_category === "2") {el.Lactation_category = "L3"; return el}
        if (el.Lactation_category === "3") {el.Lactation_category = "L4"; return el}
        else return el
      });
    };

    PharmaSeed().then(() => {
 
      Pharma.create(seed)
        .then(pharma => console.log(`pharma added`))
        .catch(err => console.log("An error happened:", err));
    });
  });

  //let x = JSON.parse(seed).filter(el => el.Lactation_category === "N")
