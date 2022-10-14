const mongoose = require("mongoose");

const inmateSchema = new mongoose.Schema({
  gender: {
    type: String,
    required: false,
    validate: /^[A-Za-z0-9 ]*$/
  },
  fullname: {
    type: String,
    required: false,
    validate: /^[A-Za-z0-9 ]*$/
  },
  mothersmaiden: {
    type: String,
    required: false,
    validate: /^[A-Za-z0-9 ]*$/
  },
  address: {
    type: String,
    required: false
  },
  dob: {
    type: Date,
    required: false
  },
  age: {
    type: Number,
    required: false,
    validate: /^[A-Za-z0-9 ]*$/
  },
  ssn: {
    type: String,
    required: false,
    validate: /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/
  },
  inmateid: {
    type: String,
    required: false,
    validate: /^[A-Za-z0-9 ]*$/
  },
  heightcentimeters: {
    type: Number,
    required: false,
    validate: /^[-+]?[0-9]+$/
  },
  weightpounds: {
    type: Number,
    required: false
  },
  build: {
    type: String,
    required: false,
    validate: /^[A-Za-z0-9 ]*$/
  },
  race: {
    type: String,
    required: false,
    enum: [
      "Hispanic",
      "White",
      "Black or African American",
      "American Indian or Alaska Native",
      "Asian",
      "Native Hawaiian or Other Pacific Islander"
    ]
  },
  phone: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false,
    validate: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  bloodtype: {
    type: String,
    required: false,
    validate: /^(A|B|AB|O)[-+]$/
  },
  employmentcompany: {
    type: String,
    required: false,
    validate: /^[A-Za-z0-9 ]*$/
  },
  occupation: {
    type: String,
    required: false,
    validate: /^[A-Za-z0-9 ]*$/
  },
  latitude: {
    type: String,
    required: false
  },
  longitude: {
    type: String,
    required: false
  }
});

const Inmate = mongoose.model("Inmate", inmateSchema);

module.exports = Inmate;
