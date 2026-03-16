import { CardDetails } from "../state/game";
import Card, { cardHeight } from "./Card";

export function Hand({ cards, faceDown }: { cards: CardDetails[]; faceDown?: boolean }) {
  return (
    <div
      className="flex gap-4"
      style={{
        height: `${cardHeight}px`,
      }}
    >
      {cards.map((card, i) => (
        <Card key={i} card={card} faceDown={faceDown} />
      ))}
    </div>
  );
}
