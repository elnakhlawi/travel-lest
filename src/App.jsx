import { useState } from "react";
import "./App.css";



export default function App() {
  const [items, setItems] = useState([]);

  function handleItems(item) {
    setItems([...items, item]);
    console.log(items);
  }
  function handleDeleteItem(id) {
    console.log(id);
    setItems(
      items.filter((item) => {
        return item.id !== id;
      })
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form handleItems={handleItems} />
      <PackingList items={items} handleDeleteItem={handleDeleteItem} />
      <Status />
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
    console.log(newItem);
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

function PackingList({ items, handleDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.length>0?items.map((item) => (
          <Item item={item} key={item.id} handleDeleteItem={handleDeleteItem} />
        )):<h1 style={{backgroundColor:'transparent'}}>'No Items'</h1>}
      </ul>
    </div>
  );
}

function Item({ item, handleDeleteItem }) {

  return (
    <li>
      <input type="checkbox"  />
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
function Status() {
  return (
    <footer className="stats">
      <em>🎒 you have x items on your list, and you already packed X (x%)</em>
    </footer>
  );
}
