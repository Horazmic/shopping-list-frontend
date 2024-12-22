import { useState } from "react";
import { useShoppingList } from "../shoppingListProvider";

export default function List({ currentList }) {
  const { updateShoppingList } = useShoppingList();
  const [editedItems, setEditedItems] = useState(
    currentList.items.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: item.name,
      }),
      {}
    )
  );

  const handleItemChange = (event, itemId) => {
    setEditedItems({
      ...editedItems,
      [itemId]: event.target.value,
    });
  };

  const handleItemSubmit = (itemId) => {
    updateShoppingList(currentList.id, {
      items: currentList.items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              name: editedItems[itemId],
            }
          : item
      ),
    });
  };

  const handleItemDelete = (itemId) => {
    updateShoppingList(currentList.id, {
      items: currentList.items.filter((item) => item.id !== itemId),
    });
  };

  const handleResolvedChange = (itemId) => {
    updateShoppingList(currentList.id, {
      items: currentList.items.map((item) =>
        item.id === itemId ? { ...item, resolved: !item.resolved } : item
      ),
    });
  };

  const handleAddItem = () => {
    updateShoppingList(currentList.id, {
      items: [
        ...currentList.items,
        { id: currentList.items.length + 1, name: "New Item", resolved: false },
      ],
    });
  };

  return (
    <div>
      <h2 className="mb-3">Items</h2>
      <ul>
        {currentList.items.map((item) => (
          <li key={item.id} className="d-flex align-items-center gap-2 mb-2">
            <input
              type="text"
              value={editedItems[item.id]}
              onChange={(event) => handleItemChange(event, item.id)}
            />
            {editedItems[item.id] !== item.name && (
              <button
                className="btn btn-success"
                onClick={() => handleItemSubmit(item.id)}
              >
                Save
              </button>
            )}
            <button
              className="btn btn-primary"
              onClick={() => handleResolvedChange(item.id)}
            >
              {item.resolved ? "Unresolve" : "Resolve"}
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleItemDelete(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button className="btn btn-primary" onClick={handleAddItem}>
        Add Item
      </button>
    </div>
  );
}
