// Routes for secure user data requiring JWT authentication
const { getTodos, addTask } = require("../../controllers/userController");
const { jwtMiddleware } = require("../../middleware/jwtMiddleware");

const dataRoute = (app) => {
  // Get user todos route
  app.get("/login/data", jwtMiddleware, (req, res) => {
    getTodos(req, res);
  });

  // Add task route
  app.post("/login/data/add-task", jwtMiddleware, (req, res) => {
    addTask(req, res);
  });
};

module.exports = dataRoute;
