import React from "react";
import { useShoppingList } from "../shoppingListProvider";
import { useParams } from "react-router-dom";
import Header from "./header";
import List from "./list";
import MembersList from "./membersList";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"; // Import Recharts components

export default function Detail() {
  const { shoppingLists, currentUser, users } = useShoppingList();
  const { id } = useParams();
  const currentList = shoppingLists.find((list) => list.id === parseInt(id));

  if (!currentList) {
    return (
      <div className="text-center">
        <h1>List not found</h1>
        <Link to="/">Back to home</Link>
      </div>
    );
  }

  const solvedCount = currentList.items.filter((item) => item.resolved).length;
  const unsolvedCount = currentList.items.length - solvedCount;

  const pieData = [
    { name: "Solved", value: solvedCount },
    { name: "Unsolved", value: unsolvedCount },
  ];

  return (
    <div className="container">
      <div className="card">
        <Header currentList={currentList} />
        <div className="row">
          <div className="col-12 col-md-6">
            <List currentList={currentList} />
          </div>

          <div className="col-12 col-md-6 text-center">
            <h3>Item Status</h3>
            <PieChart width={300} height={300}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                <Cell fill="#00C49F" />
                <Cell fill="#FF8042" />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
            <p>Solved: {solvedCount}</p>
            <p>Unsolved: {unsolvedCount}</p>
          </div>
        </div>
        <MembersList currentList={currentList} />
      </div>
    </div>
  );
}
