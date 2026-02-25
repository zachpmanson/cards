import { html } from "https://unpkg.com/htm/preact/standalone.module.js";
import DeckUp from "../components/DeckUp.js";

export default function NoCards({ next }) {
  return html`<div className="flex gap-8 w-full items-center h-full">
    <${DeckUp} size=${52} onClick=${(x) => {}} />
  </div>`;
}
