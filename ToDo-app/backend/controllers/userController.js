// Importing userDB data and JWT library
const userInformation = require("./userDB");
const jwt = require("jsonwebtoken");

// Controller for user registration
const registerUser = (req, res) => {
  const { username, password } = req.body;

  // Check if both username and password are provided
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both username and password." });
  }

  // Ensure valid email (ends with '@gmail.com')
  if (!username.endsWith("@gmail.com")) {
    return res.status(403).json({ message: "Invalid email address" });
  }

  // Check password complexity
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must contain 8 characters or more, at least one uppercase and lowercase letter, a number, and a special character.",
    });
  }

  // Check if the username already exists
  const userExists = userInformation.some((user) => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // Create a new user and generate a JWT token
  const newUser = {
    id: userInformation.length + 1,
    username,
    password,
    todos: [],
  };

  userInformation.push(newUser);

  const payload = {
    name: username,
    admin: false,
  };

  const token = jwt.sign(JSON.stringify(payload), "HyperionDev", {
    algorithm: "HS256",
  });

  console.log(`User ${username} registered`);
  res
    .status(201)
    .json({ message: `Welcome ${username}`, user: newUser, token });
};

// Middleware to check JWT token and user information
const jwtMiddleware = (req, res, next) => {
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

    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

// Controller for user login
const userController = (req, res) => {
  const { username, password } = req.body;
  const user = userInformation.find(
    (user) => user.username === username && user.password === password
  );

  // Check if the user exists
  if (!user) {
    return res.status(401).json({ message: "Incorrect user credentials" });
  }

  // Generate a new JWT token for the logged-in user
  payload = {
    name: username,
    admin: false,
  };
  const token = jwt.sign(JSON.stringify(payload), "HyperionDev", {
    algorithm: "HS256",
  });
  console.log(`User ${username} logged in`);
  res.json({ message: `Welcome back ${username}`, token: token });
};

// Controller to get todos for a logged-in user
const getTodos = (req, res) => {
  const { name, admin } = req.payload;
  const user = userInformation.find((user) => user.username === name);

  // Return the todos for the logged-in user
  if (user) {
    return res.json(user.todos);
  }
};

// Controller to add a task for a logged-in user
const addTask = (req, res) => {
  const { content } = req.body;

  // Check if task content is provided
  if (!content) {
    return res.status(400).json({ message: "Task content cannot be empty" });
  }

  // Additional validation to reject tasks exceeding 140 characters
  if (content.length > 140) {
    return res
      .status(400)
      .json({ message: "Task content exceeds 140 characters" });
  }

  // Find the logged-in user and add the task
  const { name } = req.payload;
  const user = userInformation.find((user) => user.username === name);

  if (user) {
    user.todos.push(content);
    return res.json({ message: "Task added successfully" });
  } else {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  userController,
  registerUser,
  getTodos,
  addTask,
}; // exporting the necessary modules
