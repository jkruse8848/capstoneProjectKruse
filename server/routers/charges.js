const { Router, response } = require("express");
const Charge = require("../models/Charge");
const router = Router();

//Create record in MongoDB Atlas using mongoose
router.post("/", (request, response) => {
  const newCharge = new Charge(request.body);
  newCharge.save((error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

//Read all uploads from MongoDB Atlas
router.get("/", (request, response) => {
  Charge.find({}, (error, record) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(record);
  });
});

router.get("/filterBookingID/:bookings_id", (request, response) => {
  Charge.find({ bookings_id: request.params.bookings_id }, (error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

module.exports = router;
