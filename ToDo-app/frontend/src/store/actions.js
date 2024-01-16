// Actions for Redux state management
import * as actionTypes from "./actionTypes"; // Importing the action type constants from the actionTypes module

/* Action creator for adding a new todo */
export const addTodo = (content) => ({
  type: actionTypes.ADD_TODO, // Specifies the action type for adding a todo
  payload: content, // Contains the content of the new todo
});

/* Action creator for editing an existing todo */
export const editTodo = (id, content) => ({
  type: actionTypes.EDIT_TODO, // Specifies the action type for editing a todo
  id, // Specifies the ID of the todo to be edited
  payload: content, // Contains the updated content for the todo
});

/* Action creator for deleting a todo */
export const deleteTodo = (id) => ({
  type: actionTypes.DELETE_TODO, // Specifies the action type for deleting a todo
  id, // Specifies the ID of the todo to be deleted
});

/* Action creator for toggling the completed state of a todo */
export const toggleCompleted = (id) => ({
  type: actionTypes.TOGGLE_COMPLETED, // Specifies the action type for toggling the completed state
  id, // Specifies the ID of the todo to be toggled
});

/* Action creator for logging in a user */
export const loginUser = (userData) => ({
  type: actionTypes.LOGIN_USER,
  payload: userData,
});

/* Action creator for registering a new user */
export const registerUser = (userData) => ({
  type: actionTypes.REGISTER_USER,
  payload: userData,
});

/* Action creator for logging out a user */
export const logoutUser = () => ({
  type: actionTypes.LOGOUT_USER,
});
