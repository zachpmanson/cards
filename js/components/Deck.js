import { html, useMemo, useState } from "https://unpkg.com/htm/preact/standalone.module.js";
import { popRandom } from "../numbers.js";
import Card from "./Card.js";

export default function Deck({ onClick, size, faceDown }) {
  const deckId = useMemo(() => Math.random(), []);

  const cardIds = Array(size)
    .fill(size)
    .map((_, i) => i)
    .map((i) => [(i % 13) + 1, (i % 4) + 1]);

  const [deck, setDeck] = useState(
    Array(size)
      .fill(size)
      .map((_, i) => {
        const [number, suite] = popRandom(cardIds);
        return html`<div className="absolute" style=${{ top: Math.random() * 7, left: Math.random() * 7 }}>
          <${Card}
            suit=${suite}
            number=${number}
            faceDown=${!!faceDown}
            group=${deckId}
            onClick=${(suit, number, group) => {
              onClick?.(i, suit, number, group, () => setDeck((d) => d.slice(0, d.length - 1)));
            }}
          />
        </div>`;
      }),
  );

  return html`<div className="relative h-[110px] w-[80px]">${deck}</div>`;
}
