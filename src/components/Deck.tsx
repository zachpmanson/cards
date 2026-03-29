import { computed } from "@preact/signals";
import { CardDetails } from "../state/game";
import Card from "./Card";

function wiggle() {
  return { top: Math.random() * 7, left: Math.random() * 7 };
}

const wiggleStack = new Array(52).fill(0).map(() => wiggle());

export default function Deck({
  onClick,
  cards,
  faceDown,
  onBaseClick,
}: {
  cards: CardDetails[];
  onClick?: (card: CardDetails) => void;
  faceDown?: boolean;
  onBaseClick?: () => void;
}) {
  const deck = computed(() =>
    cards.map(({ number, suit, groupId }, index) => {
      return { number, suit, style: wiggleStack[index % 52], groupId: groupId };
    }),
  );

  function canPop(index: number) {
    return index === deck.value.length - 1;
  }

  return (
    <div className="relative h-26 w-20 border border-white border-solid" onClick={onBaseClick}>
      {deck.value.map((card: any, i: number) => (
        <div className="absolute" style={{ ...(card.style || {}), zIndex: i }}>
          <Card
            card={card}
            faceDown={!!faceDown}
            onClick={(card) => {
              if (canPop(i)) {
                onClick?.(card);
              }
            }}
          />
        </div>
      ))}
    </div>
  );
}
