import { useState } from "react";
import { useShoppingList } from "../shoppingListProvider";

export default function MembersList({ currentList }) {
  const { users, updateShoppingList, selectedUser } = useShoppingList();

  const handleAddUser = (userId) => {
    updateShoppingList(currentList.id, {
      members: [...currentList.members, userId],
    });
  };

  const handleRemoveUser = (userId) => {
    updateShoppingList(currentList.id, {
      members: currentList.members.filter((id) => id !== userId),
    });
  };

  const isOwner = currentList.ownerId === selectedUser;
  console.log(currentList.ownerId, selectedUser);

  return (
    <div>
      <h2 className="mb-3">Members</h2>
      <ul>
        {currentList.members.map((member) => (
          <li key={member} className="d-flex align-items-center gap-2 mb-2">
            <h4>
              {users.find((user) => user.id === member).name}
              {member === currentList.ownerId && " (Owner)"}
            </h4>
            {isOwner && member !== currentList.ownerId && (
              <button
                className="btn btn-danger"
                onClick={() => handleRemoveUser(member)}
              >
                Remove from list
              </button>
            )}
          </li>
        ))}
      </ul>
      <h2 className="mb-3">Other users</h2>
      <ul>
        {users
          .filter((user) => !currentList.members.includes(user.id))
          .map((user) => (
            <li key={user.id} className="d-flex align-items-center gap-2 mb-2">
              <h4>{user.name}</h4>
              {isOwner && (
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddUser(user.id)}
                >
                  Add to list
                </button>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
