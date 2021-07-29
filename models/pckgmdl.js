var mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const packageSchema = new mongoose.Schema({
  id: {
    type: String,
    required: "Please enter the ID.",
    trim: true,
    unique: "The  ID must be unique.",
  },
  imgsrc: {
    type: String,
    required: "Please enter the image URL",
    trim: true,
    unique: "The image url must be unique.",
  },
  imgtitle: {
    type: String,
    required: "Please enter the location Name",
    unique: "The image title must be unique.",
  },
  pagesource: {
    type: String,
    required: "Please enter the page URL",
    unique: "The page url must be unique.",
  },
  packagedetail: {
    type: String,
    required: "Please enter the Package Details.",
  },
});
packageSchema.plugin(uniqueValidator);
module.exports.Packages = mongoose.model("Packages", packageSchema);
