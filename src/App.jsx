import { useState } from "react";
import "./App.css";

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

  return (
    <div className="app">
      <Logo />
      <Form handleItems={handleItems} />
      <PackingList
        items={items}
        handleDeleteItem={handleDeleteItem}
        handleUpdateItem={handleUpdateItem}
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

function PackingList({ items, handleDeleteItem, handleUpdateItem }) {
  return (
    <div className="list">
      <ul>
        {items.length > 0 ? (
          items.map((item) => (
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
  let itemsNumbers = items.length;

  return (
    <footer className="stats">
      <em>🎒 you have {itemsNumbers} items on your list, and you already packed X (x%)</em>
    </footer>
  );
}
