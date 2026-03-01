import { html, render } from "https://unpkg.com/htm/preact/standalone.module.js";
import { Popover } from "./components/Popup.js";
import StageManager from "./components/StageManager.js";
// A component with a list and conditional rendering
const slot = document.querySelector("#base");
function Main() {
  return html` <div className="h-screen w-screen flex items-stretch"><${StageManager} /> <${Popover} /></div> `;
}

render(html`<${Main} page="All" />`, slot);

// <${Window}
//   title="Todo List"
//   body=${[
//     Card({
//       suit: 1,
//       number: 1,
//     }),
//     Card({
//       suit: 1,
//       number: 9,
//     }),
//     Card({
//       suit: 2,
//       number: 13,
//     }),

//     html`<button onClick=${firePopup}>Add</button>`,
//   ]}
// />
