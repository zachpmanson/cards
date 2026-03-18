import { CardDetails } from "../state/game";

// reference sprite in the legacy folder so it works in-dev without copying files
const sprite = "/assets/card-sprite.png";
export const cardHeight = 96;
export const cardWidth = 71;

export default function Card({
  faceDown,
  card,
  onClick,
  disabled,
}: {
  card: CardDetails;
  faceDown?: boolean;
  onClick?: (card: CardDetails) => void;
  disabled?: boolean;
}) {
  const actualSuit = faceDown ? 5 : card.suit;
  const actualNumber = faceDown ? 1 : card.number;

  const offsetX = (Math.floor(actualNumber - 1) % 14) * cardWidth;
  const offsetY = (Math.floor(actualSuit - 1) % 6) * cardHeight;

  const id = cardId(card);

  return (
    <div
      id={id}
      onClick={() => {
        if (disabled) return;
        onClick?.(card);
      }}
      className="text-[blue] flex justify-center"
      style={{
        height: `${cardHeight}px`,
        width: `${cardWidth}px`,
        borderRadius: "3.5px",
        viewTransitionName: id,
        viewTransitionGroup: "card-move",
        position: "relative",
        backgroundImage: `url(${sprite})`,
        backgroundPosition: `${-offsetX}px ${-offsetY}px`,
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Suit: {card.suit}
      <br />
      Num: {card.number} */}
    </div>
  );
}

export function cardId({ suit, number, groupId }: CardDetails) {
  return `card-${String(groupId ?? "no-group").replace(".", "")}-${suit ?? 0}-${number ?? 0}`;
}
