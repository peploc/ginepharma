const mongoose = require("mongoose");
const Pharma = require("../models/Pharma");
const fs = require("fs").promises;

let seed;
mongoose
  .connect("mongodb://localhost/Pharma", { useNewUrlParser: true })
  .then(a => {
    console.log(
      `Connected to Mongo! Database name: "${a.connections[0].name}"`
    );

    const PharmaSeed = async () => {
      seed = await fs.readFile("pharma.json", (err, data) => {
        if (err) throw err;
        return data;
      });
    };

    PharmaSeed().then(() => {
      Pharma.create(JSON.parse(seed))
        .then(pharma => console.log(`pharma added`))
        .catch(err => console.log("An error happened:", err));
    });
  });

  //let x = JSON.parse(seed).filter(el => el.Lactation_category === "N")
