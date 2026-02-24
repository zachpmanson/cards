import { html, render } from "https://unpkg.com/htm/preact/standalone.module.js";
import Card from "/components/Card.js";
import { Popover, showPopup } from "/components/Popup.js";
import StageManager from "/components/StageManager.js";
import Window from "/components/Window.js";

// A component with a list and conditional rendering
function Main() {
  const firePopup = () => {
    showPopup("yonika", "yonika");
  };

  return html`
    <div>
      ${Window({
        title: "Todo List",
        body: [
          Card({
            suit: 1,
            number: 1,
          }),
          Card({
            suit: 1,
            number: 9,
          }),
          Card({
            suit: 2,
            number: 13,
          }),

          html`<button onClick=${firePopup}>Add</button>`,
        ],
      })}
      ${StageManager()} ${Popover()}
    </div>
  `;
}

render(html`<${Main} page="All" />`, document.body);
