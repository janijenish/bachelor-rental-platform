const Property = require("../models/Property");
const cloudinary = require("../utils/cloudinary");


// CREATE PROPERTY (Landlord only)
exports.createProperty = async (req, res) => {

  const { title, description, price, location, bachelorAllowed, furnishing } = req.body;

  let imageUrl = "";

  // Upload image if provided
  if (req.file) {

    const result = await cloudinary.uploader.upload(req.file.path);

    imageUrl = result.secure_url;

  }

  const property = await Property.create({
    title,
    description,
    price,
    location,
    bachelorAllowed,
    furnishing,
    image: imageUrl,
    postedBy: req.user._id
  });

  res.status(201).json({
    message: "Property listed successfully 🏠",
    property
  });

};




// GET ALL PROPERTIES WITH FILTERING + PAGINATION + SORTING
exports.getProperties = async (req, res) => {

  const { location, bachelorAllowed, maxPrice, page = 1, limit = 10, sort } = req.query;

  let filter = {};

  if (location) {
    filter.location = location;
  }

  if (bachelorAllowed) {
    filter.bachelorAllowed = bachelorAllowed === "true";
  }

  if (maxPrice) {
    filter.price = { $lte: maxPrice };
  }

  const properties = await Property.find(filter)
    .populate("postedBy", "name email")
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit);

  res.json(properties);

};