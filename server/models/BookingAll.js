const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingAllSchema = new mongoose.Schema({
  booking: { type: Schema.Types.ObjectId, ref: "Booking" },
  bonds: [{ type: Schema.Types.ObjectId, ref: "Bond" }],
  charges: [{ type: Schema.Types.ObjectId, ref: "Charge" }]
});

const BookingAll = mongoose.model("BookingAll", BookingAllSchema);

module.exports = BookingAll;
