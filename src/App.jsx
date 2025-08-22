import "./App.css";

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Status/>
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🌴</h1>;
}

function Form() {
  return <div className="add-form">what do you need for your 😍tirp?</div>;
}

function PackingList() {
  return <div className="list">List</div>;
}

function Status() {
  return (
    <footer className="stats">
      <em>🎒 you have x items on your list, and you already packed X (x%)</em>
    </footer>
  );
}
