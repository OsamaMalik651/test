var express = require("express");
var router = express.Router();
var Packages = require("../models/package").Packages;
var packageCost = {
  title: " ",
  basePrice: 0,
  commision: 0,
  travellerCount: 0,
  totalPrice: 0,
};

//middleware that is specific to this router,
//Checks that the user must be logged in
//to be added to every router file if user sign is necessary there.
//all the routes above will not require user to be login to be displayed
router.use((req, res, next) => {
  if (!req.user) res.status(403).redirect("/");
  else next();
});
router.get("/purchaseDone", function (req, res, next) {
  res.render("purchaseDone", { title: "Purchase Confirmation Page" });
});
router.post("/purchaseConfirm", function (req, res, next) {
  console.log(packageCost);
  packageCost.travellerCount = req.body.travellerCount;
  packageCost.totalPrice =
    packageCost.basePrice * packageCost.travellerCount + packageCost.commision;
  res.render("purchaseConfirm", {
    title: "Purchase Confirmation Page",
    cost: packageCost,
  });
});
router.get("/purchaseConfirm", function (req, res, next) {
  res.render("purchaseConfirm", { title: "Purchase Confirmation Page" });
});

router.get("/:id", async function (req, res, next) {
  Packages.findOne({ PackageId: req.params.id }, function (err, result) {
    console.log(err, result);
    if (err) {
      console.log(err);
    }
    packageCost.title = result.PkgName;
    packageCost.basePrice = result.PkgBasePrice;
    packageCost.commision = result.PkgAgencyCommission;

    console.log(packageCost);
    res.render("purchasePage", {
      title: "Package detail Page",
      packageDetail: result,
    });
  });
});

router.get("/purchaseDone", function (req, res, next) {
  res.render("purchaseDone", { title: "Purchase Confirmation Page" });
});
module.exports = router;
