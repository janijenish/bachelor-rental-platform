const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    bachelorAllowed: {
      type: Boolean,
      default: true
    },

    furnishing: {
      type: String
    },

    image: {
      type: String
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    interestedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);