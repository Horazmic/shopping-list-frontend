import { useShoppingList } from "../shoppingListProvider";

export default function Header({ currentList }) {
  const { removeShoppingList, selectedUser } = useShoppingList();

  const isOwner = currentList.ownerId === selectedUser;

  return (
    <div className="header d-flex justify-content-between align-items-center">
      <h1>{currentList.name}</h1>
      {isOwner && (
        <button
          className="btn btn-danger"
          onClick={() => removeShoppingList(currentList.id)}
        >
          Delete
        </button>
      )}
    </div>
  );
}
