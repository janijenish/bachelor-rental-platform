const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  getSavedProperties,
  getContactRequests
} = require("../controllers/userController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");


router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", protect, getProfile);

router.get(
  "/saved-properties",
  protect,
  authorizeRoles("tenant"),
  getSavedProperties
);

router.get(
  "/contact-requests",
  protect,
  authorizeRoles("landlord"),
  getContactRequests
);

module.exports = router;