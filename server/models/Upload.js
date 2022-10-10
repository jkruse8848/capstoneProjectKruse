const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  casenumber: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/
  },
  justification: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/
  },
  date: {
    type: String,
    required: true,
    validate: /^\d{2}\/\d{2}\/\d{4} (?:2[0-3]|[01]?[0-9]):[0-5][0-9]:[0-5][0-9]/
  }
});

const Upload = mongoose.model("Upload", uploadSchema);

module.exports = Upload;
