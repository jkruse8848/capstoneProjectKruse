const { Router, response } = require("express");
const Inmate = require("../models/Inmate");
const router = Router();

//Create record in MongoDB Atlas using mongoose
router.post("/", (request, response) => {
  const newInmate = new Inmate(request.body);
  newInmate.save((error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

module.exports = router;
