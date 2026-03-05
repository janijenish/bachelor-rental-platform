const express = require("express");
const router = express.Router();

const {
  createProperty,
  getProperties
} = require("../controllers/propertyController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");


router.post("/", protect, authorizeRoles("landlord"), createProperty);

router.get("/", getProperties);


module.exports = router;