const { Router } = require("express");
const filtersData = require("../API/filters.json");
const carOwnersData = require("../API/car_owners_data.json");
const router = Router();

router.get("/filter/:id", async (req, res) => {
  let filteredData = filtersData.find(filter => filter.id == req.params.id);

  if (!filteredData) {
    return res.status(500).json({ message: "Id is invalid", data: null });
  }

  let carOwners = await carOwnersData.filter(
    data =>
      +data.car_model_year >= +filteredData.start_year &&
      +data.car_model_year <= +filteredData.end_year
  );

  res.status(200).json({
    message: "Car owners data retrieved successfully",
    data: carOwners.slice(0, 30)
  });
});

router.get("/filters", async (req, res) => {
  res
    .status(200)
    .json({ message: "Filters retrieved successfully", data: filtersData });
});

module.exports = router;
// export.def
