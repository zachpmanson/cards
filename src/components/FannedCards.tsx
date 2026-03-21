import { CardDetails } from "../state/game";
import Card, { cardHeight, cardWidth } from "./Card";

export default function FannedCards({
  cards,
  onClick,
  faceDown,
}: {
  cards: CardDetails[];
  onClick?: (card: CardDetails) => void;
  faceDown?: boolean;
}) {
  const rotate = true;
  const mouseOverClass = "hover:translate-y-[-0.5em] cursor-pointer";

  return (
    <div
      className="relative max-w-full"
      style={{
        height: `${cardHeight}px`,
        width: `${cardWidth}px`,
      }}
    >
      {cards.map((card, i) => {
        const distanceFromMiddle = i - (cards.length - 1) / 2;
        const leftOffset = distanceFromMiddle < 0 ? -1 : 1;

        return (
          <div
            key={i}
            className={faceDown ? undefined : mouseOverClass}
            style={{
              // Use Math.abs before raising to a fractional power. Raising a negative
              // number to a non-integer exponent yields NaN in JS (complex number),
              // which makes the entire CSS transform invalid and prevents rotate
              // from being applied. Keep the sign via leftOffset.
              transform: rotate
                ? `translate(${leftOffset * Math.abs(distanceFromMiddle) ** 0.8 * 3}em, ${Math.abs(
                    Math.abs(distanceFromMiddle) ** 2 * 0.2,
                  )}em) rotate(${distanceFromMiddle * 7 + 0.01}deg)`
                : "unset",
              // the 0.01 is to prevent a weird bug where cards with 0 rotation flickers after rotation animation completes
              position: "absolute",
            }}
          >
            {/* {distanceFromMiddle} */}
            <Card
              card={card}
              faceDown={faceDown}
              onClick={(card) => {
                onClick?.(card);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
