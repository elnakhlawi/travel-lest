import { useState } from "react";
import "./App.css";
//components
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Status from "./components/Status";
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
