import { html, useState } from "https://unpkg.com/htm/preact/standalone.module.js";
import { popRandom } from "../numbers.js";
import Card from "./Card.js";

export default function Deck({ onClick, size, faceDown }) {
  let cardIds = Array(size)
    .fill(size)
    .map((_, i) => i)
    .map((i) => [(i % 13) + 1, (i % 4) + 1]);

  const [deck, setDeck] = useState(
    Array(size)
      .fill(size)
      .map((_, i) => {
        const [number, suite] = popRandom(cardIds);
        return html`<div
          className="absolute"
          onClick="${() => {
            onClick?.(i, suite, number);
            setDeck((d) => d.slice(0, d.length - 1));
          }}"
          style=${{ top: Math.random() * 7, left: Math.random() * 7 }}
        >
          <${Card} suit=${suite} number=${number} faceDown=${!!faceDown} />
        </div>`;
      }),
  );

  return html`<div className="relative h-[110px] w-[80px]">${deck}</div>`;
}
