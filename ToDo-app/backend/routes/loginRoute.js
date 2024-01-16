// Routes for user login, registration, and logout
const {
  userController,
  registerUser,
} = require("../controllers/userController");

const loginRoute = (app) => {
  // Login route
  app.post("/login", (req, res) => {
    userController(req, res);
  });

  // Register route
  app.post("/register", (req, res) => {
    const { username, password } = req.body;

    // Validate username and password
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Please provide both username and password." });
    }

    // To continue with the registration process
    registerUser(req, res);
  });

  // Logout route
  app.post("/logout", (req, res) => {
    // Check if req.session is defined before attempting to destroy it
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error("Logout failed:", err);
          res.status(500).json({ message: "Logout failed" });
        } else {
          res.json({ message: "Logout successful" });
        }
      });
    } else {
      res.status(500).json({ message: "Logout failed: Session not found" });
    }
  });
};

module.exports = loginRoute;
