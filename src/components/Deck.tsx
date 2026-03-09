import { useMemo, useState } from "preact/hooks";
import { popRandom } from "../lib/numbers";
import Card, { CardDetails } from "./Card";

type DeckProps = {
  onClick?: (index: number, suit: number, number: number, group: any, removeFn?: () => void) => void;
  size?: number;
  faceDown?: boolean;
};

export default function Deck({ onClick, size = 52, faceDown }: DeckProps) {
  const deckId = useMemo(() => Math.random(), []);

  const cardIds: CardDetails[] = Array(size)
    .fill(size)
    .map((_, i) => i)
    .map((i) => ({ number: (i % 13) + 1, suite: (i % 4) + 1 }));

  const [deck, setDeck] = useState(
    Array(size)
      .fill(size)
      .map(() => {
        const { number, suite } = popRandom(cardIds);
        return { number, suite, style: { top: Math.random() * 7, left: Math.random() * 7 } };
      }),
  );

  function canPop(index: number) {
    return index === deck.length - 1;
  }

  return (
    <div className="relative h-[110px] w-[80px]">
      {deck.map((card: any, i: number) => (
        <div className="absolute" style={{ ...(card.style || {}), zIndex: i }}>
          <Card
            suit={card.suite}
            number={card.number}
            faceDown={!!faceDown}
            group={deckId}
            onClick={(suit, number, group) => {
              if (canPop(i)) {
                onClick?.(i, suit, number, group, () => setDeck((d) => d.slice(0, d.length - 1)));
              }
            }}
          />
        </div>
      ))}
    </div>
  );
}
