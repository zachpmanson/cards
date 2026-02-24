import { html } from "https://unpkg.com/htm/preact/standalone.module.js";
export default function Window({ title, body }) {
  return html`<div class="window" style="width: 300px">
    <div class="title-bar">
      <div class="title-bar-text">${title}</div>
      <div class="title-bar-controls">
        <button aria-label="Minimize"></button>
        <button aria-label="Maximize"></button>
        <button aria-label="Close"></button>
      </div>
    </div>
    <div class="window-body">${body}</div>
  </div>`;
}
