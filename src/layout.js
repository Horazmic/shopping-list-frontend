import { useShoppingList } from "./shoppingListProvider";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  const { users, selectedUser, setSelectedUser, status } = useShoppingList();

  return (
    <>
      <div className="container mb-3">
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/" className="text-decoration-none fs-2 text-dark">
            Shopping List App
          </Link>
          <select
            className="form-select"
            style={{ width: 150 }}
            value={selectedUser}
            onChange={(e) => setSelectedUser(parseInt(e.target.value))}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {status === "loading" && (
        <div className="container text-center text-primary">
          <h1>Loading...</h1>
        </div>
      )}
      {status === "ready" && <div className="container">{children}</div>}
      {status === "error" && (
        <div className="container text-center text-danger">
          <h1>ERROR</h1>
        </div>
      )}
    </>
  );
}
