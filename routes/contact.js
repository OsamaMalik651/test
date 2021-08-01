var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("contact");
});
router.post("/", function (req, res, next) {
  res.render("Thankyou", {
    message1: "contacting us",
    message2: "An agent will reach you shortly",
    login: true,
  });
});

module.exports = router;
