// Import necessary modules and packages
const express = require("express"); // Import the Express framework
const session = require("express-session"); // Import Express session middleware for managing user sessions
const cors = require("cors"); // Import CORS (Cross-Origin Resource Sharing) middleware for enabling cross-origin requests
const bodyParser = require("body-parser"); // Import bodyParser middleware for parsing incoming request bodies
const loginRoute = require("./routes/loginRoute"); // Import loginRoute module for handling login-related routes
const userDataRoute = require("./routes/secure/userDataRoute"); // Import userDataRoute module for handling secure user data routes

// Create an Express application
const app = express();

// Session configuration
app.use(
  session({
    secret: "HyperionDev", // Secret key used to sign the session ID cookie
    resave: false, // Do not save the session if it hasn't been modified
    saveUninitialized: true, // Save uninitialized (new, not modified) sessions
  })
);

// Middleware for handling CORS (Cross-Origin Resource Sharing
app.use(cors());

// Middleware for parsing JSON data in request bodies
app.use(bodyParser.json());

// importing the myLoggerRoute
const myLoggerRoute = require("./routes/myLoggerRoute");

// Use the logger middleware for all routes
myLoggerRoute(app);

// Set up login and user data routes
loginRoute(app);
userDataRoute(app);

// Listening on port 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
