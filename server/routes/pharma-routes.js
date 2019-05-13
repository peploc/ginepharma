const express = require('express');
const pharmaRoutes  = express.Router();
const Pharma = require("../models/Pharma");

pharmaRoutes.get('/all', (req, res, next) => {
  Pharma.find({}).then(data => {
    res.status(200).json(data);
  })
  .catch((err)=>{
    res.status(500).json({message: "Error"})
  })
});

pharmaRoutes.get('/one/:id', (req, res, next) => {
  Pharma.findById(req.params.id).then(data => {
    res.status(200).json(data);
  })
  .catch((err)=>{
    res.status(400).json({message: "Not Found"})
  })
});

/* pharmaRoutes.post('/new', (req, res, next) => {
  Pharma.create({
    
  }).then(data => {
    res.json(data);
  })
  .catch((err)=>{
    console.log(err)
  })
});

pharmaRoutes.put('/update/:id', (req, res, next) => {
  Pharma.findByIdAndUpdate(
    req.params.id,
    {
    
  }, {new: true}
  ).then(data => {
    res.json(data);
  })
  .catch((err)=>{
    console.log(err)
  })
});

pharmaRoutes.delete('/delete/:id', (req, res, next) => {
  Pharma.findByIdAndDelete(req.params.id).then(data => {
    res.json(data);
  })
  .catch((err)=>{
    console.log(err)
  })
}); */

module.exports = pharmaRoutes;