export default function Status({ items }) {
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