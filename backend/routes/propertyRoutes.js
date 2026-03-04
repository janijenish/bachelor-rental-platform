const express = require("express");
const Property = require("../models/Property");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

/* =========================
   CREATE PROPERTY
   Only Landlords
========================= */
router.get("/", async (req, res) => {
  try {
    const { location, bachelorAllowed, maxPrice, page = 1, limit = 10, sort } = req.query;

    let filter = {};

    if (location) filter.location = location;
    if (bachelorAllowed) filter.bachelorAllowed = bachelorAllowed === "true";
    if (maxPrice) filter.price = { $lte: maxPrice };

    const properties = await Property.find(filter)
      .populate("postedBy", "name email")
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.json(properties);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

/* =========================
   GET ALL PROPERTIES
   Public
========================= */
router.get("/", async (req, res) => {
  try {

    const properties = await Property.find()
      .populate("postedBy", "name email");

    res.json(properties);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


module.exports = router;