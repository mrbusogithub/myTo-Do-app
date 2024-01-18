// Importing necessary modules and components
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";
import { addTodo, loginUser, registerUser, logoutUser } from "./store/actions"; // Import loginUser and registerUser actions
import TodoList from "./components/TodoList";
import InfoPopup from "./components/InfoPopup";
import axios from "axios"; // Import axios for HTTP requests
import "./App.css"; // Import styles for the App component
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles

// App component for the main application
const App = () => {
  // State variables for managing new todo, todo count, warnings, and errors
  const [newTodo, setNewTodo] = useState(""); // Input value for adding a new todo
  const [todoCount, setTodoCount] = useState(0); // Total count of todos
  const [warning, setWarning] = useState(""); // Warning message state
  const [error, setError] = useState(""); // Error message state

  // State variables for managing login and registration form visibility
  const [showLogin, setShowLogin] = useState(false); // State for login form visibility
  const [showRegister, setShowRegister] = useState(false); // State for register form visibility

  // State variables for storing login and registration form data
  const [loginData, setLoginData] = useState({ email: "", password: "" }); // State to store login form data
  const [registerData, setRegisterData] = useState({ email: "", password: "" }); // State to store register form data

  const dispatch = useDispatch(); // Redux dispatch function
  const user = useSelector((state) => state.user); // Select user state from Redux

  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for tracking user login status

  // Function to handle user login
  const handleLogin = async () => {
    try {
      // Validate username format
      if (!loginData.username.endsWith("@gmail.com")) {
        throw new Error("Invalid username. Must end with @gmail.com");
      }

      // Send a login request to the server
      const response = await axios.post(
        "https://todolist-app-backend-mz4r.onrender.com/login",
        loginData
      );

      // Dispatch login action, save token to local storage, and update UI
      dispatch(loginUser(response.data.user));
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error.message);
      setWarning(""); // Clear any previous warnings
      setError(error.message); // Set error message
    }
  };

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      // Send a logout request to the server
      const response = await axios.post(
        "https://todolist-app-backend-mz4r.onrender.com/logout"
      );
      console.log(response.data.message);

      // Dispatch logout action, remove token from local storage, and update UI
      dispatch(logoutUser());
      localStorage.removeItem("token");
      setIsLoggedIn(false); // Set isLoggedIn to false on successful logout
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  // Function to handle login button click
  const handleLoginButtonClick = () => {
    if (user) {
      handleLogout();
    } else {
      setShowLogin(true);
    }
  };

  // useEffect to update UI based on user state changes
  useEffect(() => {
    console.log("useEffect triggered. User:", user);
    // Check if the user is logged in (non-null user state) and update the UI accordingly
    if (user) {
      setShowLogin(false);
    } else {
      setShowLogin(false);
    }
  }, [user]);

  // Function to handle user registration
  const handleRegister = async () => {
    try {
      // Validate username format
      if (!registerData.username.endsWith("@gmail.com")) {
        throw new Error("Invalid username. Must end with @gmail.com");
      }

      // Password validation
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(registerData.password)) {
        throw new Error(
          "Invalid password. Must contain 8 characters or more, at least one uppercase and lowercase letter, a number, and a special character."
        );
      }

      // Send a registration request to the server
      const response = await axios.post(
        "https://todolist-app-backend-mz4r.onrender.com/register",
        {
          username: registerData.username,
          password: registerData.password,
        }
      );

      // Extract user data from the response and dispatch registration action
      const userData = response?.data?.user;
      if (userData) {
        dispatch(registerUser(userData));
        setShowRegister(false);
      } else {
        console.error("User data not found in the response.");
      }
    } catch (error) {
      console.error(error.message || "Registration failed");
      setWarning(""); // Clear any previous warnings
      setError(error.message); // Set error message
    }
  };

  // Function to handle adding a new todo
  const handleAddTodo = async () => {
    try {
      // Send a request to the server to add a new todo
      const response = await axios.post(
        "https://todolist-app-backend-mz4r.onrender.com/login/data/add-task",
        { content: newTodo },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.message);

      // Dispatch the addTodo action to update the state
      dispatch(addTodo(newTodo));
      setNewTodo("");
      setError("");
    } catch (error) {
      console.error(error.response.data.message);
      setError(error.response.data.message);
    }
  };

  // Select todos state from Redux
  const todos = useSelector((state) => state.list);

  // useEffect to update todo count when todos state changes
  useEffect(() => {
    const todoCount = todos.length;
    setTodoCount(todoCount);
  }, [todos]);

  // Render the main application component
  return (
    <div className="App mt-4">
      <h1 style={{ color: "darkgrey" }}>To-do App</h1>
      <div className="mt-5 mb-3">
        <div>
          <div className="mb-3" style={{ color: "white" }}>
            <label>
              Click here to register and login to have unlimited access to the
              app
            </label>
          </div>
          <Button
            variant="success"
            style={{ marginLeft: "10px" }}
            onClick={() => setShowRegister(true)}
          >
            Register
          </Button>
        </div>
        <div className="mt-3 mb-3">
          <Button
            variant="info"
            style={{ marginLeft: "10px" }}
            onClick={isLoggedIn ? handleLogout : () => setShowLogin(true)}
          >
            {isLoggedIn ? "Logout" : "Login"}
          </Button>
        </div>

        {/* Input for adding a new todo */}
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add item..."
          style={{ borderRadius: "5px" }}
        />
        {/* Button to add a new todo */}
        <Button
          variant="secondary"
          style={{ marginLeft: "2px" }}
          onClick={handleAddTodo}
        >
          Add To-do
        </Button>
      </div>
      {/* Display warnings and errors */}
      {warning && <p className="text-danger">{warning}</p>}
      {error && <p className="text-danger">{error}</p>}
      {/* Display InfoPopup component */}
      <InfoPopup />
      <h2 className="my-3" style={{ color: "gray" }}>
        My To-do list
      </h2>
      {/* Render TodoList component */}
      <TodoList className="todo-list" style={{ color: "grey" }} />
      {/* Display total todo count */}
      <div
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          backgroundColor: "white",
          paddingLeft: "10px",
          paddingRight: "10px",
          border: "1px solid gray",
          borderRadius: "5px",
          zIndex: 1,
        }}
      >
        <p style={{ color: "green" }}>Total To-do's: {todoCount}</p>
      </div>

      {/* Login Modal */}
      <Modal show={showLogin} onHide={() => setShowLogin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p className="text-danger">{error}</p>}
          {/* Login Form */}
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>username (email)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                onChange={(e) =>
                  setLoginData({ ...loginData, username: e.target.value })
                }
                autoComplete="username"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                autoComplete="current-password"
              />
            </Form.Group>
            {/* Button to trigger login */}
            <Button variant="primary" onClick={handleLogin}>
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Registration Modal */}
      <Modal show={showRegister} onHide={() => setShowRegister(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p className="text-danger">{error}</p>}
          {/* Registration Form */}
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>username (email)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                onChange={(e) =>
                  setRegisterData({ ...registerData, username: e.target.value })
                }
                autoComplete="username"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    password: e.target.value,
                  })
                }
                autoComplete="current-password"
              />
            </Form.Group>
            {/* Button to trigger registration */}
            <Button variant="success" onClick={handleRegister}>
              Register
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default App;
