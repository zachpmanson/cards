import { html } from "https://unpkg.com/htm/preact/standalone.module.js";
import Deck from "../components/Deck.js";

export default function NoCards({ next }) {
  return html`<div className="flex gap-8 w-full items-center h-full">
    <${Deck} size=${10} onClick=${(x) => {}} />
    <${Deck} size=${10} onClick=${(x) => {}} faceDown=${true} />
  </div>`;
}
