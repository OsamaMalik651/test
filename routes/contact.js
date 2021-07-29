var express = require("express");
var router = express.Router();

const AgentDetails = require("../models/Agentmdl").AgentDetails;
const ContactDetails = require("../models/Agentmdl").contactDetails;

// load the contact page. Get agent details and the userName to show on the contact page
router.get("/", async function (req, res, next) {
  var name = await ContactDetails.findOne({ contactFormName: "Osama" }).exec();
  AgentDetails.find((err, agents) => {
    res.render("contact", {
      agentDetails: agents,
      name: name,
    });
  });
});

// Route for the agent detail creation page.
router.get("/create", function (req, res, next) {
  res.render("agentCreate");
});

// Router method to store the contact details to database. It also passess the current entered username to the thank you page
// for it to be displayed on the thankyou page
router.post("/", function (req, res, next) {
  const contactDetail = new ContactDetails();
  contactDetail.contactFormName = req.body.contactFormName;
  contactDetail.contactFormEmail = req.body.contactFormEmail;
  contactDetail.contactFormQuery = req.body.contactFormQuery;
  contactDetail.save((err) => {
    if (err) {
      const errorArray = [];
      const errorKeys = Object.keys(err.errors);
      errorKeys.forEach((key) => errorArray.push(err.errors[key].message));
      return res.render("/", {
        errors: errorArray,
      });
    }
  });
  res.render("Thankyou", {
    contactName: contactDetail.contactFormName,
  });
});

//Router method to store the newly created agent details in the database to be displayed in contact page.
router.post("/create", function (req, res, next) {
  const agentDetail = new AgentDetails();
  agentDetail.agentName = req.body.agentName;
  agentDetail.agentPhone = req.body.agentPhone;
  agentDetail.agentEmail = req.body.agentEmail;
  agentDetail.agentPosition = req.body.agentPosition;
  agentDetail.agentId = req.body.agentId;
  agentDetail.agencyId = req.body.agencyId;
  agentDetail.save((err) => {
    if (err) {
      const errorArray = [];
      const errorKeys = Object.keys(err.errors);
      errorKeys.forEach((key) => errorArray.push(err.errors[key].message));
      return res.render("agentCreate", {
        errors: errorArray,
      });
    }
    res.redirect("/contact/create");
  });
});

module.exports = router;
