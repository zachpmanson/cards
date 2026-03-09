import { useState } from "preact/hooks";
import { startTransition } from "../../lib/utils";
import Card from "../Card";
import Deck from "../Deck";

export default function NoCards({ next }: { next?: () => void }) {
  const [targetPile, setTargetPile] = useState<Array<{ suit: number; number: number; group?: any }>>([]);

  function moveToTargetPile(suit: number, number: number, group: any, removeFn?: () => void) {
    startTransition(() => {
      setTargetPile((targetPile) => [...targetPile, { suit, number, group }]);
      removeFn?.();
    });
  }

  return (
    <div className="flex gap-8 w-full items-center h-full flex-col">
      <div className="flex gap-8">
        <Deck
          size={52}
          onClick={(index, suit, number, group, removeFn) => moveToTargetPile(suit, number, group, removeFn)}
        />
        <Deck
          size={52}
          onClick={(index, suit, number, group, removeFn) => moveToTargetPile(suit, number, group, removeFn)}
        />
        <Deck
          size={20}
          faceDown
          onClick={(index, suit, number, group, removeFn) => moveToTargetPile(suit, number, group, removeFn)}
        />
      </div>

      <div id="target" className="flex gap-2 flex-wrap p-2">
        {targetPile.map(({ suit, number, group }, i) => (
          <Card key={i} suit={suit} number={number} group={group} />
        ))}
      </div>
    </div>
  );
}
