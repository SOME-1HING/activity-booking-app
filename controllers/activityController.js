const Activity = require("../models/Activity");
const {
  ErrorResponseObject,
  SuccessResponseObject,
} = require("../common/http");

exports.addActivity = async (req, res) => {
  try {
    const {
      title = "",
      description = "",
      location = "",
      dateTime = "",
    } = req.body;

    const missingFields = [];
    if (!title) missingFields.push("title");
    if (!description) missingFields.push("description");
    if (!location) missingFields.push("location");
    if (!dateTime) missingFields.push("dateTime");

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json(
          new ErrorResponseObject(`Missing fields: ${missingFields.join(", ")}`)
        );
    }

    const newActivity = new Activity({
      title,
      description,
      location,
      dateTime,
    });

    const savedActivity = await newActivity.save();

    res.status(201).json(
      new SuccessResponseObject("Activity successfully added", {
        activityId: savedActivity._id,
      })
    );
  } catch (err) {
    res.status(500).json(new ErrorResponseObject(err.message));
  }
};

exports.listActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res
      .status(200)
      .json(
        new SuccessResponseObject(
          "Activities retrieved successfully",
          activities
        )
      );
  } catch (err) {
    res.status(500).json(new ErrorResponseObject(err.message));
  }
};

exports.bookActivity = async (req, res) => {
  try {
    const { activityId = "" } = req.body;
    const userId = req.user.id;

    if (!activityId) {
      return res
        .status(400)
        .json(new ErrorResponseObject("Missing field: activityId"));
    }

    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res
        .status(404)
        .json(new ErrorResponseObject("Activity not found"));
    }

    activity.bookings.push({ userId });
    await activity.save();

    res
      .status(200)
      .json(new SuccessResponseObject("Activity booked successfully"));
  } catch (err) {
    res.status(500).json(new ErrorResponseObject(err.message));
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const activities = await Activity.find({ "bookings.userId": userId });

    res
      .status(200)
      .json(
        new SuccessResponseObject(
          "User bookings retrieved successfully",
          activities
        )
      );
  } catch (err) {
    res.status(500).json(new ErrorResponseObject(err.message));
  }
};
