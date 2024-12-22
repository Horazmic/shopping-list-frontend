import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function CreateShoppingListModal({
  show,
  handleClose,
  handleSave,
}) {
  const [shoppingListName, setShoppingListName] = useState("");

  const handleSubmit = () => {
    handleSave(shoppingListName);
    setShoppingListName("");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Shopping List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Shopping List Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter list name"
              value={shoppingListName}
              onChange={(e) => setShoppingListName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
