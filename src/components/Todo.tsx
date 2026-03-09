import { useState } from "preact/hooks";
import { showPopup } from "./Popup";

export default function Todo() {
  const [items, setItems] = useState<string[]>(["Buy milk", "Touch grass"]);
  const [input, setInput] = useState("");

  const add = () => {
    if (!input.trim()) return;
    setItems([...items, input.trim()]);
    setInput("");
  };

  return (
    <div className="window" style={{ width: 280 }}>
      <div className="title-bar">
        <div className="title-bar-text">Todo List</div>
      </div>
      <div className="window-body">
        <ul>
          {items.map((item, i) => (
            <li key={i}>
              {item}
              <button onClick={() => setItems(items.filter((_, j) => j !== i))}>✕</button>
            </li>
          ))}
        </ul>
        {items.length === 0 && (
          <p>
            <em>Nothing to do!</em>
          </p>
        )}
        <div style={{ display: "flex", gap: 4 }}>
          <input
            value={input}
            onInput={(e: any) => setInput(e.target.value)}
            onKeyDown={(e: any) => e.key === "Enter" && add()}
            placeholder="New task..."
          />
          <button onClick={add}>Add</button>
          <button onClick={() => showPopup("Add task", <div>Not implemented</div>)}>Add</button>
        </div>
      </div>
    </div>
  );
}
