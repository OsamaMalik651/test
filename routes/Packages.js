var express = require("express");
var router = express.Router();
var Packages = require("../models/package").Packages;

/* GET home page. */
router.get("/", function (req, res, next) {
  Packages.find((err, packages) => {
    res.render("Packages", {
      Packages: packages,
    });
  });
});
router.get("/details/:pkdId", async function (req, res, next) {
  Packages.findOne({ PackageId: req.params.pkdId }, function (err, result) {
    if (err) {
      console.log(err);
    }
    res.render("packageDetail", {
      title: "Package detail Page",
      packageDetail: result,
    });
  });
});

module.exports = router;
