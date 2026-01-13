

import { useState } from "react";
import DeleteButton from "./ConfiremDelete";
import Item from "./Item";
export default function PackingList({
  items,
  handleDeleteItem,
  handleUpdateItem,
  handleClearItems,
}) {
  const [sortby, setSortBy] = useState("input");
  let sortedItems;
  if (sortby === "input") sortedItems = items;
  if (sortby === "description")
    sortedItems = items.slice().sort((a, b) => {
      return a.description.localeCompare(b.description);
    });
  if (sortby === "packed")
    sortedItems = items.slice().sort((a, b) => {
      return Number(a.packed) - Number(b.packed);
    });
  return (
    <div style={{ backgroundColor: "black" }}>
      {items.length > 0 && (
        <div
          className="actions"
          style={{ position: "absolute", right: "20px" }}
        >
          <select
            value={sortby}
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
          >
            <option value="input">Sort by input</option>
            <option value="description">Sort by description</option>
            <option value="packed">Sort by packed</option>
          </select>
        </div>
      )}
      <div className="list" style={{ height: "100%" }}>
        <ul>
          {items.length > 0 ? (
            sortedItems.map((item) => (
              <Item
                item={item}
                key={item.id}
                handleDeleteItem={handleDeleteItem}
                handleUpdateItem={handleUpdateItem}
              />
            ))
          ) : (
            <h1 style={{ backgroundColor: "transparent" }}>'No Items'</h1>
          )}
        </ul>
      </div>
      <div
        className="clearItems"
        style={{ position: "absolute", right: "20px", bottom: "30px" }}
      >
        <DeleteButton
          style={{ fontWeight: "900" }}
          handleClearItems={handleClearItems}
          items={items}
        />
      </div>
    </div>
  );
}