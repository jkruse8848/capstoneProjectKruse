const mongoose = require("mongoose");

const bondSchema = new mongoose.Schema({
  bookings_id: {
    type: String,
    required: false,
    validate: /^[A-Za-z0-9 ]*$/
  },
  bondnumber: {
    type: String,
    required: false
  },
  bondtype: {
    type: String,
    required: false
  },
  bondamount: {
    type: String,
    required: false
  }
});

const Bond = mongoose.model("Bond", bondSchema);

module.exports = Bond;
