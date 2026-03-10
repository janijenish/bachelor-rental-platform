const express = require("express");
const router = express.Router();

const {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  expressInterest,
  getMyProperties
} = require("../controllers/propertyController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const upload = require("../utils/upload");


// CREATE PROPERTY (Landlord only)
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


// GET SINGLE PROPERTY
router.get("/:id", getPropertyById);


// UPDATE PROPERTY (Landlord only)
router.put(
  "/:id",
  protect,
  authorizeRoles("landlord"),
  updateProperty
);


// DELETE PROPERTY (Landlord only)
router.delete(
  "/:id",
  protect,
  authorizeRoles("landlord"),
  deleteProperty
);


// TENANT EXPRESS INTEREST
router.post(
  "/:id/interest",
  protect,
  authorizeRoles("tenant"),
  expressInterest
);

module.exports = router;