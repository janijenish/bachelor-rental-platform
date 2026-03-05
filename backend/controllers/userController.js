const jwt = require("jsonwebtoken");
const User = require("../models/User");


// REGISTER USER
exports.registerUser = async (req, res) => {

  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    role
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    message: "User registered successfully ✅"
  });

};



// LOGIN USER
exports.loginUser = async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
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
    message: "Login successful ✅"
  });

};



// GET PROFILE (Protected)
exports.getProfile = async (req, res) => {

  res.json({
    message: "Access granted to protected route ✅",
    user: req.user
  });

};