import React, { createContext, useContext, useState, useEffect } from "react";

// Create context for the shopping list
const ShoppingListContext = createContext();

// Custom hook to use the ShoppingListContext
export function useShoppingList() {
  return useContext(ShoppingListContext);
}

// Provider component to manage the shopping lists
export function ShoppingListProvider({ children }) {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [selectedUser, setSelectedUser] = useState(1);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("loading");

  const useMockData = false;

  const mockShoppingLists = [
    {
      id: 1,
      resolved: false,
      name: "Groceries",
      items: [
        { id: 1, name: "Milk", resolved: true },
        { id: 2, name: "Bread", resolved: false },
        { id: 3, name: "Eggs", resolved: false },
      ],
      members: [1, 2],
      ownerId: 1,
    },
    {
      id: 2,
      resolved: true,
      name: "Hardware Store",
      items: [
        { id: 1, name: "Screwdriver", resolved: false },
        { id: 2, name: "Paint", resolved: false },
        { id: 3, name: "Nails", resolved: true },
      ],
      members: [1, 3],
      ownerId: 3,
    },
  ];

  const mockUsers = [
    { id: 1, name: "Radek" },
    { id: 2, name: "Kuba" },
    { id: 3, name: "Kasia" },
  ];

  const BASE_URL = "http://localhost:8000/api";

  useEffect(() => {
    const fetchInitialData = async () => {
      setStatus("loading");
      try {
        if (useMockData) {
          setShoppingLists(mockShoppingLists);
          setUsers(mockUsers);
          setStatus("ready");
        } else {
          const [listsResponse, usersResponse] = await Promise.all([
            fetch(`${BASE_URL}/shopping-list/getList/list`, {
              method: "GET",
              headers: { "x-user-profile": "admin" },
            }),
            fetch(`${BASE_URL}/shopping-list/getUsers`, {
              method: "GET",
              headers: { "x-user-profile": "admin" },
            }),
          ]);

          if (!listsResponse.ok || !usersResponse.ok) {
            throw new Error("Network response was not ok");
          }

          const [listsData, usersData] = await Promise.all([
            listsResponse.json(),
            usersResponse.json(),
          ]);

          if (
            listsData.status === "success" &&
            usersData.status === "success"
          ) {
            setShoppingLists(listsData.lists);
            setUsers(usersData.users);
            setStatus("ready");
          } else {
            console.error(
              "Error fetching data:",
              listsData.message || usersData.message
            );
            setStatus("error");
          }
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setStatus("error");
      }
    };

    fetchInitialData();
  }, []);

  const addShoppingList = async (shoppingList) => {
    setStatus("updating");
    try {
      if (useMockData) {
        const newList = { id: Date.now(), ...shoppingList };
        setShoppingLists([...shoppingLists, newList]);
        setStatus("ready");
      } else {
        const response = await fetch(`${BASE_URL}/shopping-list/createList`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-user-profile": "admin",
          },
          body: JSON.stringify(shoppingList),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        if (data.status === "success") {
          setShoppingLists([...shoppingLists, data.data]);
          setStatus("ready");
        } else {
          console.error("Error adding shopping list:", data.message);
          setStatus("error");
        }
      }
    } catch (error) {
      console.error("Error adding shopping list:", error);
      setStatus("error");
    }
  };

  const removeShoppingList = async (id) => {
    setStatus("updating");
    try {
      if (useMockData) {
        setShoppingLists(shoppingLists.filter((item) => item.id !== id));
        setStatus("ready");
      } else {
        const response = await fetch(
          `${BASE_URL}/shopping-list/deleteList/${id}`,
          {
            method: "DELETE",
            headers: {
              "x-user-profile": "admin",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        if (data.status === "success") {
          setShoppingLists(shoppingLists.filter((item) => item.id !== id));
          setStatus("ready");
        } else {
          console.error("Error removing shopping list:", data.message);
          setStatus("error");
        }
      }
    } catch (error) {
      console.error("Error removing shopping list:", error);
      setStatus("error");
    }
  };

  const updateShoppingList = async (id, updatedData) => {
    setStatus("updating");
    try {
      const shoppingList = shoppingLists.find((item) => item.id === id);
      if (!shoppingList) {
        throw new Error("Shopping list not found");
      }

      if (useMockData) {
        setShoppingLists(
          shoppingLists.map((item) =>
            item.id === id ? { ...item, ...updatedData } : item
          )
        );
        setStatus("ready");
      } else {
        const response = await fetch(
          `${BASE_URL}/shopping-list/updateList/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "x-user-profile": "admin",
            },
            body: JSON.stringify({ ...shoppingList, ...updatedData }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        if (data.status === "success") {
          setShoppingLists(
            shoppingLists.map((item) =>
              item.id === id ? { ...item, ...updatedData } : item
            )
          );
          setStatus("ready");
        } else {
          console.error("Error updating shopping list:", data.message);
          setStatus("error");
        }
      }
    } catch (error) {
      console.error("Error updating shopping list:", error);
      setStatus("error");
    }
  };

  const value = {
    shoppingLists,
    selectedUser,
    setSelectedUser,
    users,
    addShoppingList,
    removeShoppingList,
    updateShoppingList,
    status,
  };

  return (
    <ShoppingListContext.Provider value={value}>
      {children}
    </ShoppingListContext.Provider>
  );
}
