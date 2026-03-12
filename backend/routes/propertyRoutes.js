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
  removeSavedProperty,
  contactLandlord
} = require("../controllers/propertyController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const upload = require("../utils/upload");

router.post("/", protect, authorizeRoles("landlord"), upload.single("image"), createProperty);

router.get("/", getProperties);

router.get("/my-properties", protect, authorizeRoles("landlord"), getMyProperties);

router.post("/:id/save", protect, authorizeRoles("tenant"), saveProperty);

router.delete("/:id/save", protect, authorizeRoles("tenant"), removeSavedProperty);

router.post("/:id/interest", protect, authorizeRoles("tenant"), expressInterest);

router.post("/:id/contact", protect, authorizeRoles("tenant"), contactLandlord);

router.get("/:id", getPropertyById);

router.put("/:id", protect, authorizeRoles("landlord"), updateProperty);

router.delete("/:id", protect, authorizeRoles("landlord"), deleteProperty);

module.exports = router;