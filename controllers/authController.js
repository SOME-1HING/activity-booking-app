const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  ErrorResponseObject,
  SuccessResponseObject,
} = require("../common/http");

exports.register = async (req, res) => {
  try {
    let name = req.body.name || "",
      email = req.body.email || "",
      phone = req.body.phone || "",
      password = req.body.password || "";

    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!phone) missingFields.push("phone");
    if (!password) missingFields.push("password");

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json(
          new ErrorResponseObject(`Missing fields: ${missingFields.join(", ")}`)
        );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json(new ErrorResponseObject("Email already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, phone, password: hashedPassword });
    await user.save();
    res
      .status(201)
      .json(new SuccessResponseObject("User registered successfully"));
  } catch (err) {
    res.status(400).json(new ErrorResponseObject(err.message));
  }
};

exports.login = async (req, res) => {
  try {
    const { email = "", password = "" } = req.body;

    const missingFields = [];
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json(
          new ErrorResponseObject(`Missing fields: ${missingFields.join(", ")}`)
        );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json(new ErrorResponseObject("User not found"));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json(new ErrorResponseObject("Invalid credentials"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json(new SuccessResponseObject("Login successful", { token }));
  } catch (err) {
    res.status(500).json(new ErrorResponseObject(err.message));
  }
};
