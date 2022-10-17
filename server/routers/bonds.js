const { Router, response } = require("express");
const Bond = require("../models/Bond");
const router = Router();

//Create record in MongoDB Atlas using mongoose
router.post("/", (request, response) => {
  const newBond = new Bond(request.body);
  newBond.save((error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

//Read all uploads from MongoDB Atlas
router.get("/", (request, response) => {
  Bond.find({}, (error, record) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(record);
  });
});

router.get("/filterBookingID/:bookings_id", (request, response) => {
  Bond.find({ bookings_id: request.params.bookings_id }, (error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

module.exports = router;
