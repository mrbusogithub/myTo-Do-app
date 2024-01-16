// Route for logging middleware
const { loggerMiddleware } = require("../middleware/myLogger");
const { loggerController } = require("../controllers/loggerController");

const myLoggerRoute = (app) => {
  app.use(loggerMiddleware); // To use the logger middleware for all routes
  app.get("/", loggerController);
  // This route URL will be 'http://localhost:8080/'
};

module.exports = myLoggerRoute;
