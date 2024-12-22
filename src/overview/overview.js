import React, { useState } from "react";
import { useShoppingList } from "../shoppingListProvider";
import { Link } from "react-router-dom";
import CreateShoppingListModal from "./createShoopingListModal";
import { Button } from "react-bootstrap";

export default function Overview() {
  const {
    shoppingLists,
    addShoppingList,
    selectedUser,
    removeShoppingList,
    updateShoppingList,
  } = useShoppingList();

  const [showModal, setShowModal] = useState(false);
  const [showAll, setShowAll] = useState(true);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSaveShoppingList = (name) => {
    const newList = {
      id: shoppingLists.length + 1,
      resolved: false,
      name,
      items: [],
      members: [selectedUser],
      ownerId: selectedUser,
    };
    addShoppingList(newList);
    handleCloseModal();
  };

  const filteredLists = shoppingLists.filter((list) =>
    showAll
      ? list.members.includes(selectedUser)
      : list.members.includes(selectedUser) && !list.resolved
  );

  const renderListItem = (shoppingList) => {
    const isOwner = shoppingList.ownerId === selectedUser;

    return (
      <li key={shoppingList.id} className="list-group-item">
        <div className="d-flex justify-content-between align-items-center">
          <Link to={`/detail/${shoppingList.id}`}>{shoppingList.name}</Link>
          <div>
            <Button
              variant={shoppingList.resolved ? "success" : "warning"}
              size="sm"
              className="me-2"
              onClick={() =>
                updateShoppingList(shoppingList.id, {
                  resolved: !shoppingList.resolved,
                })
              }
            >
              {shoppingList.resolved ? "Unresolve" : "Resolve"}
            </Button>

            {isOwner && (
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeShoppingList(shoppingList.id)}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Overview</h1>
        <div>
          <Button variant="secondary" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Unresolved" : "Show all lists"}
          </Button>
          <Button variant="primary" onClick={handleOpenModal}>
            Create new shopping list
          </Button>
        </div>
      </div>

      <ul className="list-group">{filteredLists.map(renderListItem)}</ul>

      <CreateShoppingListModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSaveShoppingList}
      />
    </div>
  );
}
