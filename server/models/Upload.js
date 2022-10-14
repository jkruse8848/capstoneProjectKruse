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
    required: true
  }
});

const Upload = mongoose.model("Upload", uploadSchema);

module.exports = Upload;
