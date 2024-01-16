// Middleware for JWT verification and additional checks
const jwt = require("jsonwebtoken");

function jwtMiddleware(req, res, next) {
  const jwtToken = req.headers["authorization"];
  const tokenExtract = jwtToken.split(" ")[1];

  try {
    const payload = jwt.verify(tokenExtract, "HyperionDev");
    req.payload = payload;

    // Middleware to check if username ends with '@gmail.com'
    if (!payload.name.endsWith("@gmail.com")) {
      return res.status(403).json({ message: "Invalid email address" });
    }

    // Middleware to check content type
    if (!req.is("application/json")) {
      return res.status(400).json({ message: "Invalid content type" });
    }

    next(); // To continue to load to the next function
  } catch (error) {
    res.status(403).json({ message: "Log in first to able to add items" });
  }
}

module.exports = {
  jwtMiddleware,
};
