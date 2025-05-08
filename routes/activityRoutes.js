const express = require("express");
const router = express.Router();

const {
  listActivities,
  bookActivity,
  getMyBookings,
  addActivity,
} = require("../controllers/activityController");
const auth = require("../middlewares/authMiddlewares");

router.get("/", listActivities);
router.post("/add", auth, addActivity);
router.post("/book", auth, bookActivity);
router.get("/my-bookings", auth, getMyBookings);

module.exports = router;
