import React from "react";
import { useState } from "react";
import { useShoppingList } from "../shoppingListProvider";
import { useParams } from "react-router-dom";
import Header from "./header";
import List from "./list";
import MembersList from "./membersList";
import { Link } from "react-router-dom";
export default function Detail() {
  const { shoppingLists, currentUser, users } = useShoppingList();

  const { id } = useParams();
  const currentList = shoppingLists.find((list) => list.id === parseInt(id));

  return (
    <div className="container">
      {currentList ? (
        <div className="card">
          <Header currentList={currentList} />
          <List currentList={currentList} />
          <MembersList currentList={currentList} />
        </div>
      ) : (
        <div className="text-center">
          <h1>List not found</h1>
          <Link to="/">Back to home</Link>
        </div>
      )}
    </div>
  );
}
