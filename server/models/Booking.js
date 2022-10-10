const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  inmates_id: {
    type: String,
    required: false,
    validate: /^[A-Za-z0-9 ]*$/
  },
  bookingnumber: {
    type: String,
    required: false
  },
  bookingdate: {
    type: Date,
    required: false
  },
  releasedate: {
    type: Date,
    required: false
  },
  sentencelength: {
    type: String,
    required: false
  },
  prisonertype: {
    type: String,
    required: false
  },
  facility: {
    type: String,
    required: false
  },
  bondamount: {
    type: Number,
    required: false
  },
  bailamount: {
    type: Number,
    required: false
  },
  agency: {
    type: String,
    required: false
  }
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
