import { html, useMemo, useState } from "https://unpkg.com/htm/preact/standalone.module.js";
import { popRandom } from "../numbers.js";
import Card from "./Card.js";

export default function Deck({ onClick, size, faceDown }) {
  const deckId = useMemo(() => Math.random(), []);

  const cardIds = Array(size)
    .fill(size)
    .map((_, i) => i)
    .map((i) => [(i % 13) + 1, (i % 4) + 1]);

  // store card data in state rather than rendered elements
  // this prevents handlers captured in the initial render from closing over stale `deck` values
  const [deck, setDeck] = useState(
    Array(size)
      .fill(size)
      .map((_, i) => {
        const [number, suite] = popRandom(cardIds);
        return { number, suite, style: { top: Math.random() * 7, left: Math.random() * 7 } };
      }),
  );

  function canPop(index) {
    console.debug({ index, deckLength: deck.length });
    return index === deck.length - 1;
  }

  return html`<div className="relative h-[110px] w-[80px]">
    ${deck.map(
      (card, i) =>
        html`<div className="absolute" style=${card.style}>
          <${Card}
            suit=${card.suite}
            number=${card.number}
            faceDown=${!!faceDown}
            group=${deckId}
            onClick=${(suit, number, group) => {
              if (canPop(i)) {
                onClick?.(i, suit, number, group, () => setDeck((d) => d.slice(0, d.length - 1)));
              }
            }}
          />
        </div>`,
    )}
  </div>`;
}
