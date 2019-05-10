const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pharmaSchema = new Schema({
  Name: String,
  Pregnancy_category: String,
  Lactation_category: String,
  Class1: String,
  Class2: String,
  Class3: String,
  GURL: String
})

const Pharma = mongoose.model("Pharma", pharmaSchema);

module.exports = Pharma;