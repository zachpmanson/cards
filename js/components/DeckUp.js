import { html, useState } from "https://unpkg.com/htm/preact/standalone.module.js";
import Card from "./Card.js";

export default function DeckUp({ onClick, size }) {
  const [deck, setDeck] = useState(
    Array(size)
      .fill(size)
      .map((_, i) => {
        const suite = Math.floor(Math.random() * 4);
        const number = Math.floor(Math.random() * 13);
        return html`<div
          className="absolute"
          onClick="${() => {
            onClick?.(i, suite, number);
            setDeck((d) => d.slice(0, d.length - 1));
          }}"
          style=${{ top: Math.random() * 7, left: Math.random() * 7 }}
        >
          <${Card} suit=${suite} number=${number} faceDown=${Math.random() > 0.5} />
        </div>`;
      }),
  );

  return html`<div className="relative h-[100px]">${deck}</div>`;
}
