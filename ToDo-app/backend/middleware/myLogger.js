// Simple middleware for logging requests
const loggerMiddleware = function (req, res, next) {
  console.log("MIDDLEWARE LOGGED");
  next();
};

module.exports = {
  loggerMiddleware,
};
