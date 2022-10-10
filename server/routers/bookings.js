const { Router, response } = require("express");
const Booking = require("../models/Booking");
const router = Router();

//Create record in MongoDB Atlas using mongoose
router.post("/", (request, response) => {
  const newBooking = new Booking(request.body);
  newBooking.save((error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

//Read all uploads from MongoDB Atlas
router.get("/", (request, response) => {
  Booking.find({}, (error, record) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(record);
  });
});

module.exports = router;
