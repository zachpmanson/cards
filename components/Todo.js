import { html, useState } from "https://unpkg.com/htm/preact/standalone.module.js";

export default function Todo() {
  const [items, setItems] = useState(["Buy milk", "Touch grass"]);
  const [input, setInput] = useState("");

  const add = () => {
    if (!input.trim()) return;
    setItems([...items, input.trim()]);
    setInput("");
  };

  return html`<div class="window" style="width: 280px">
    <div class="title-bar">
      <div class="title-bar-text">Todo List</div>
    </div>
    <div class="window-body">
      <ul>
        ${items.map(
          (item, i) => html`
            <li key=${i}>
              ${item}
              <button onClick=${() => setItems(items.filter((_, j) => j !== i))}>✕</button>
            </li>
          `,
        )}
      </ul>
      ${items.length === 0 && html`<p><em>Nothing to do!</em></p>`}
      <div style="display: flex; gap: 4px">
        <input
          value=${input}
          onInput=${(e) => setInput(e.target.value)}
          onKeyDown=${(e) => e.key === "Enter" && add()}
          placeholder="New task..."
        />
        <button onClick=${add}>Add</button>
        <button onClick=${firePopup}>Add</button>
      </div>
    </div>
  </div>`;
}
