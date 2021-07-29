var express = require("express");
var router = express.Router();
var rg = require("random-greetings");
let greetings = [
  "Hello",
  "Hello There",
  "Greetings",
  "Hola",
  "Bonjour",
  "Ciao",
  "Guten Targ",
  "Bonjour",
  "Good day to you!",
];

var moment = require("moment");

const Package = require("../models/pckgmdl").Packages;

// Route to load new package creation page
router.get("/create", function (req, res, next) {
  res.render("package-create");
});

//function to store the new package details into the database.
router.post("/", function (req, res, next) {
  const package = new Package();
  package.id = req.body.id;
  package.imgsrc = req.body.imgsrc;
  package.imgtitle = req.body.imgtitle;
  package.pagesource = req.body.pagesource;
  package.packagedetail = req.body.packagedetail;
  package.save((err) => {
    if (err) {
      const errorArray = [];
      const errorKeys = Object.keys(err.errors);
      errorKeys.forEach((key) => errorArray.push(err.errors[key].message));
      return res.render("package-create", {
        errors: errorArray,
      });
    }
    res.redirect("/");
  });
});

//Route to load the main page. Package details, random greeting and the current time is passed in here.
router.get("/", function (req, res, next) {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes();
  var dt = date + " " + time;
  Package.find((err, packages) => {
    res.render("index", {
      Packages: packages,
      greetings: greetings[Math.floor(Math.random() * greetings.length)],
      time: dt,
    });
  });
});

module.exports = router;
