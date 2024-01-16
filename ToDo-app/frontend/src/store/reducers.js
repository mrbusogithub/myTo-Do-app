// Redux reducer for managing the state based on action types
import {
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  TOGGLE_COMPLETED,
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
} from "./actionTypes"; // Importing action type constants from actionTypes.js

// To define the initial state, including an array of todos and the next available ID
const initialState = {
  list: [{ id: 1, content: "Item1", completed: false }],
  nextId: 2,
  user: null,
};

// To define a reducer that manages the state based on action types
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      // To handle the action to log in a user
      return {
        ...state,
        user: action.payload,
      };
    case ADD_TODO:
      // To handle the action to add a new todo item
      return {
        ...state, // To create a copy of the current state
        list: [
          // To create a new list of todos
          ...state.list, // To copy existing todos
          // To assign a new ID, set the content from the action payload and set the completed status as false for a new todo
          { id: state.nextId, content: action.payload, completed: false },
        ],
        nextId: state.nextId + 1, // To increment the next available ID
      };
    case EDIT_TODO:
      // To handle the action to edit an existing todo item
      return {
        ...state,
        list: state.list.map((todo) =>
          todo.id === action.id ? { ...todo, content: action.payload } : todo
        ),
      };
    case DELETE_TODO:
      // To handle the action to delete a todo item
      return {
        ...state,
        list: state.list.filter((todo) => todo.id !== action.id),
      };
    case TOGGLE_COMPLETED:
      // To handle the action to toggle the completed status of a todo item
      return {
        ...state,
        list: state.list.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };

    case REGISTER_USER:
      // To handle the action to register a new user
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT_USER:
      // To handle the action to log out a user
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default rootReducer;
