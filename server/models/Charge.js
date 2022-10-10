const mongoose = require("mongoose");

const chargeSchema = new mongoose.Schema({
  bookings_id: {
    type: String,
    required: false,
    validate: /^[A-Za-z0-9 ]*$/
  },
  chargedescription: {
    type: String,
    required: false
  },
  offensedate: {
    type: Date,
    required: false
  },
  sentencedate: {
    type: Date,
    required: false
  },
  courtdate: {
    type: Date,
    required: false
  },
  docketnumber: {
    type: String,
    required: false
  },
  disposition: {
    type: String,
    required: false
  },
  length: {
    type: String,
    required: false
  },
  crimeclass: {
    type: Number,
    required: false
  },
  arrestingagency: {
    type: Number,
    required: false
  }
});

const Charge = mongoose.model("Charge", chargeSchema);

module.exports = Charge;
