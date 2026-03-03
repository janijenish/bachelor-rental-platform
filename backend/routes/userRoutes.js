const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/* =========================
   REGISTER ROUTE
========================= */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      message: "User registered successfully ✅",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* =========================
   LOGIN ROUTE
========================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
      message: "Login successful ✅",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* =========================
   PROFILE ROUTE
========================= */
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Access granted to protected route ✅",
    user: req.user,
  });
});

module.exports = router;