const Property = require("../models/Property");
const User = require("../models/User");
const cloudinary = require("../utils/cloudinary");


// CREATE PROPERTY
exports.createProperty = async (req, res) => {

  const { title, description, price, location, bachelorAllowed, furnishing } = req.body;

  let imageUrl = "";

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


// GET ALL PROPERTIES
exports.getProperties = async (req, res) => {

  const {
    search,
    location,
    bachelorAllowed,
    minPrice,
    maxPrice,
    page = 1,
    limit = 10,
    sort
  } = req.query;

  let filter = {};

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  if (location) {
    filter.location = location;
  }

  if (bachelorAllowed) {
    filter.bachelorAllowed = bachelorAllowed === "true";
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = minPrice;
    if (maxPrice) filter.price.$lte = maxPrice;
  }

  const total = await Property.countDocuments(filter);

  const properties = await Property.find(filter)
    .populate("postedBy", "name email")
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit);

  res.json({
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    properties
  });

};


// GET SINGLE PROPERTY
exports.getPropertyById = async (req, res) => {

  const property = await Property.findById(req.params.id)
    .populate("postedBy", "name email")
    .populate("interestedUsers", "name email");

  if (!property) {
    res.status(404);
    throw new Error("Property not found");
  }

  res.json(property);

};


// UPDATE PROPERTY
exports.updateProperty = async (req, res) => {

  const property = await Property.findById(req.params.id);

  if (!property) {
    res.status(404);
    throw new Error("Property not found");
  }

  if (property.postedBy.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to update this property");
  }

  const { title, description, price, location, bachelorAllowed, furnishing } = req.body;

  property.title = title || property.title;
  property.description = description || property.description;
  property.price = price || property.price;
  property.location = location || property.location;
  property.bachelorAllowed = bachelorAllowed ?? property.bachelorAllowed;
  property.furnishing = furnishing || property.furnishing;

  const updatedProperty = await property.save();

  res.json({
    message: "Property updated successfully",
    property: updatedProperty
  });

};


// DELETE PROPERTY
exports.deleteProperty = async (req, res) => {

  const property = await Property.findById(req.params.id);

  if (!property) {
    res.status(404);
    throw new Error("Property not found");
  }

  if (property.postedBy.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to delete this property");
  }

  await property.deleteOne();

  res.json({
    message: "Property deleted successfully"
  });

};


// EXPRESS INTEREST
exports.expressInterest = async (req, res) => {

  const property = await Property.findById(req.params.id);

  if (!property) {
    res.status(404);
    throw new Error("Property not found");
  }

  if (property.interestedUsers.includes(req.user._id)) {
    res.status(400);
    throw new Error("You already expressed interest");
  }

  property.interestedUsers.push(req.user._id);

  await property.save();

  res.json({
    message: "Interest expressed successfully"
  });

};


// LANDLORD DASHBOARD
exports.getMyProperties = async (req, res) => {

  const properties = await Property.find({
    postedBy: req.user._id
  })
  .populate("interestedUsers", "name email");

  res.json(properties);

};


// SAVE PROPERTY
exports.saveProperty = async (req, res) => {

  const user = await User.findById(req.user._id);
  const propertyId = req.params.id;

  if (user.savedProperties.includes(propertyId)) {
    res.status(400);
    throw new Error("Property already saved");
  }

  user.savedProperties.push(propertyId);

  await user.save();

  res.json({
    message: "Property saved successfully"
  });

};


// REMOVE SAVED PROPERTY
exports.removeSavedProperty = async (req, res) => {

  const user = await User.findById(req.user._id);

  const propertyId = req.params.id;

  user.savedProperties = user.savedProperties.filter(
    id => id.toString() !== propertyId
  );

  await user.save();

  res.json({
    message: "Property removed from saved list"
  });

};