const Property = require("../models/Property");


// CREATE PROPERTY (Landlord only)
exports.createProperty = async (req, res) => {
  try {

    const { title, description, price, location, bachelorAllowed, furnishing } = req.body;

    const property = await Property.create({
      title,
      description,
      price,
      location,
      bachelorAllowed,
      furnishing,
      postedBy: req.user._id
    });

    res.status(201).json({
      message: "Property listed successfully 🏠",
      property
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



// GET PROPERTIES WITH FILTERING
exports.getProperties = async (req, res) => {
  try {

    const { location, bachelorAllowed, maxPrice, page = 1, limit = 10, sort } = req.query;

    let filter = {};

    if (location) filter.location = location;

    if (bachelorAllowed)
      filter.bachelorAllowed = bachelorAllowed === "true";

    if (maxPrice)
      filter.price = { $lte: maxPrice };

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
};