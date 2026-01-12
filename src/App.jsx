import { useState } from "react";
import "./App.css";
import DeleteButton from "./components/ConfiremDelete";
export default function App() {
  const [items, setItems] = useState([]);
  function handleItems(item) {
    setItems([...items, item]);
  }
  function handleDeleteItem(id) {
    setItems(
      items.filter((item) => {
        return item.id !== id;
      })
    );
  }

  function handleUpdateItem(id) {
    setItems((items) => {
      return items.map((item) => {
        return item.id == id ? { ...item, packed: !item.packed } : item;
      });
    });
  }

  function handleClearItems() {
    setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form handleItems={handleItems} items={items} />
      <PackingList
        items={items}
        handleDeleteItem={handleDeleteItem}
        handleUpdateItem={handleUpdateItem}
        handleClearItems={handleClearItems}
      />
      <Status items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Engoy trip 🌴</h1>;
}

function Form({ handleItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!quantity || !description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    setDescription("");
    setQuantity(1);
    handleItems(newItem);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3> what do you need for your 😍tirp?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => {
          return i + 1;
        }).map((num) => {
          return (
            <option value={num} key={num}>
              {num}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        placeholder="Item.."
        value={description}
        onChange={(e) => {
          return setDescription(e.target.value);
        }}
      />
      <button type="text">Add</button>
    </form>
  );
}

function PackingList({
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
        />
      </div>
    </div>
  );
}

function Item({ item, handleDeleteItem, handleUpdateItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          handleUpdateItem(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button
        onClick={() => {
          handleDeleteItem(item.id);
        }}
      >
        ❌
      </button>
    </li>
  );
}
function Status({ items }) {
  let itemsNumber = items.length;
  let numberOfPacked = items.filter((item) => {
    return item.packed;
  }).length;
  let precentage = Math.round((numberOfPacked / itemsNumber) * 100) || 0;
  console.log(precentage);
  return (
    <footer className="stats">
      <em>
        {precentage == 100
          ? " You got everything! ready to go ✈"
          : `🎒 you have ${itemsNumber} items on your list, and you already packed ${numberOfPacked} (${precentage}%)`}
      </em>
    </footer>
  );
}
