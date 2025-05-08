const jwt = require("jsonwebtoken");
const { ErrorResponseObject } = require("../common/http");

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader)
    return res
      .status(401)
      .json(new ErrorResponseObject("No token, authorization denied"));

  let token;
  if (authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else {
    token = authHeader;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json(new ErrorResponseObject("Token is not valid"));
  }
};

module.exports = auth;
