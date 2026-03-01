import { html, useState } from "https://unpkg.com/htm/preact/standalone.module.js";
import Card from "../components/Card.js";
import Deck from "../components/Deck.js";

export default function NoCards({ next }) {
  const [targetPile, setTargetPile] = useState([]);

  function moveToTargetPile(suit, number, group, removeFn) {
    document.startViewTransition(() => {
      setTargetPile((targetPile) => [...targetPile, { suit, number, group }]);
      removeFn?.();
    });
  }

  return html`<div className="flex gap-8 w-full items-center h-full flex-col">
    <div className="flex gap-8">
      <${Deck}
        size=${20}
        onClick=${(index, suit, number, group, removeFn) => moveToTargetPile(suit, number, group, removeFn)}
      />
      <${Deck}
        size=${20}
        onClick=${(index, suit, number, group, removeFn) => moveToTargetPile(suit, number, group, removeFn)}
      />
    </div>

    <div id="target" className="flex gap-2 flex-wrap">
      ${targetPile.map(({ suit, number, group }) => {
        return html`<${Card} suit=${suit} number=${number} group=${group} />`;
      })}
    </div>
  </div>`;
}
// <${Deck} size=${10} onClick=${(x) => {}} faceDown=${true} />
