const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  dateTime: Date,
  bookings: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
});

module.exports = mongoose.model("Activity", activitySchema);
