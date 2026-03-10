exports.expressInterest = async (req, res) => {

  const property = await Property.findById(req.params.id);

  if (!property) {
    res.status(404);
    throw new Error("Property not found");
  }

  // Prevent duplicate interest
  if (property.interestedUsers.includes(req.user._id)) {
    res.status(400);
    throw new Error("You already expressed interest in this property");
  }

  property.interestedUsers.push(req.user._id);

  await property.save();

  res.json({
    message: "Interest expressed successfully"
  });
  exports.getMyProperties = async (req, res) => {

  const properties = await Property.find({
    postedBy: req.user._id
  })
  .populate("interestedUsers", "name email")
  .populate("postedBy", "name email");

  res.json(properties);

};

};
