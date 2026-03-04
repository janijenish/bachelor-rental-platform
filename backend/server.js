const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const propertyRoutes = require("./routes/propertyRoutes");

// Load environment variables
dotenv.config();

const app = express();

/* =========================
   Middleware
========================= */
app.use(express.json());
app.use(cors());

/* =========================
   MongoDB Connection
========================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
  })
  .catch((error) => {
    console.error("MongoDB Connection Failed ❌", error);
    process.exit(1);
  });

/* =========================
   Base Route
========================= */
app.get("/", (req, res) => {
  res.send("Bachelor Rental API Running 🚀");
});

/* =========================
   Routes
========================= */
const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);

/* =========================
   Start Server
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});