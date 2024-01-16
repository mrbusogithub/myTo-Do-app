// Component for displaying and managing the list of todos
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  editTodo,
  deleteTodo,
  toggleCompleted,
} from "../store/actions"; // Import Redux actions
import Modal from "react-bootstrap/Modal"; // Import Bootstrap Modal component
import Button from "react-bootstrap/Button"; // Import Bootstrap Button component
import axios from "axios"; // Import axios for HTTP requests
import "./TodoList.css"; // Import custom styles

const TodoList = ({ newTodo, setNewTodo }) => {
  // Redux state for todos and dispatch function
  const todos = useSelector((state) => state.list);
  const dispatch = useDispatch();
  // State for handling editing in the list
  const [isEditing, setEditing] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [error, setError] = useState("");

  // Function to handle the start of editing a todo
  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditedContent(todoToEdit.content);
    setEditing(id);
  };

  // Function to save the edited content
  const handleSaveEdit = () => {
    dispatch(editTodo(isEditing, editedContent));
    setEditing(null);
  };

  // Function to cancel editing
  const handleCancelEdit = () => {
    setEditing(null);
  };

  // Function to handle deletion of a todo
  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  // Function to handle toggling the completion status of a todo
  const handleToggle = (id) => {
    dispatch(toggleCompleted(id));
  };

  // Function to handle adding a new todo
  const handleAddTodo = async () => {
    try {
      // HTTP request to add a new todo
      const response = await axios.post(
        "http://localhost:8080/login/data/add-task",
        { content: newTodo },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.message);
      dispatch(addTodo(newTodo));
      setNewTodo("");
      setError("");
    } catch (error) {
      console.error(error.response.data.message);
      setError(error.response.data.message);
    }
  };

  // JSX structure for the component
  return (
    <ul className="todo-list box">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`todo-item ${todo.completed ? "completed" : ""}`}
        >
          <div className="todo-item">
            <div className="todo-content">
              {/* Display content or edit input based on editing state */}
              {isEditing === todo.id ? (
                // Modal for editing a todo
                <Modal show={true} onHide={handleCancelEdit}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit To-Do</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <input
                      type="text"
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveEdit}>
                      Save
                    </Button>
                  </Modal.Footer>
                </Modal>
              ) : (
                <>{todo.content}</>
              )}
            </div>
            <div className="todo-buttons">
              {/* Button to trigger editing, disabled for completed todos */}
              <Button
                variant="secondary"
                onClick={() => handleEdit(todo.id)}
                disabled={todo.completed} // Disable editing for completed to-dos
              >
                Edit
              </Button>
              {/* Button to trigger deletion, disabled for completed todos */}
              <Button
                variant="danger"
                onClick={() => handleDelete(todo.id)}
                disabled={todo.completed} // Disable deleting for completed to-dos
              >
                Delete
              </Button>

              {/* Checkbox to toggle completion status */}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
