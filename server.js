const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const activityRoutes = require("./routes/activityRoutes");
const connectDB = require("./config/db");
const { ErrorResponseObject } = require("./common/http");
const app = express();

dotenv.config();
connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/activities", activityRoutes);

app.all("*splat", (req, res) =>
  res.status(404).json(new ErrorResponseObject("Route not defined"))
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
