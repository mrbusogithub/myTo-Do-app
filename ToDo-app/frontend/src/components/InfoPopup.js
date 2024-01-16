// Component for displaying information about the app in a modal
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal"; // Importing Bootstrap Modal component
import Button from "react-bootstrap/Button"; // Importing Bootstrap Button component

const InfoPopup = () => {
  // State to manage the visibility of the modal
  const [showModal, setShowModal] = useState(false);

  // Function to show the modal
  const handleShowModal = () => {
    setShowModal(true);
  };

  // Function to hide the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // JSX structure for the component
  return (
    <div>
      <div>
        <label style={{ color: "white" }}>Learn more about App</label>
      </div>
      <Button onClick={handleShowModal}>Info</Button>
      {/* Modal component for displaying additional information */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Detailed information about using the Todo App */}
          <p>
            Welcome to the Todo App: Get started with our friendly app. Adding
            Todos: Type a task and press 'Enter' or click 'Add Todo'. Editing
            Todos: Click 'Edit' to modify tasks in a popup. Deleting Todos:
            Remove tasks by clicking 'Delete'. Completing Todos: Mark tasks done
            with the checkbox. Total Todos Counter: See your total tasks at the
            bottom. Close Button: Use the 'Close' button to exit the popup.
            Enjoy Using the App: Organize your tasks and enjoy!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InfoPopup;
