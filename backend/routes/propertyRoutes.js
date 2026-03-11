const express = require("express");
const router = express.Router();

const {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  expressInterest,
  getMyProperties,
  saveProperty,
  removeSavedProperty
} = require("../controllers/propertyController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const upload = require("../utils/upload");


// CREATE PROPERTY
router.post(
  "/",
  protect,
  authorizeRoles("landlord"),
  upload.single("image"),
  createProperty
);


// GET ALL PROPERTIES
router.get("/", getProperties);


// LANDLORD DASHBOARD
router.get(
  "/my-properties",
  protect,
  authorizeRoles("landlord"),
  getMyProperties
);


// SAVE PROPERTY
router.post(
  "/:id/save",
  protect,
  authorizeRoles("tenant"),
  saveProperty
);


// REMOVE SAVED PROPERTY
router.delete(
  "/:id/save",
  protect,
  authorizeRoles("tenant"),
  removeSavedProperty
);


// EXPRESS INTEREST
router.post(
  "/:id/interest",
  protect,
  authorizeRoles("tenant"),
  expressInterest
);


// GET SINGLE PROPERTY
router.get("/:id", getPropertyById);


// UPDATE PROPERTY
router.put(
  "/:id",
  protect,
  authorizeRoles("landlord"),
  updateProperty
);


// DELETE PROPERTY
router.delete(
  "/:id",
  protect,
  authorizeRoles("landlord"),
  deleteProperty
);

module.exports = router;