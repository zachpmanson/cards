import { useContext } from "preact/hooks";
import { CardDetails, GameState, PlayerNum } from "../state/game";
import Card, { cardHeight } from "./Card";

export function Hand({
  cards,
  faceDown,
  onClick,
  playerNum,
}: {
  cards: CardDetails[];
  faceDown?: boolean;
  onClick?: (card: CardDetails) => void;
  playerNum: PlayerNum;
}) {
  const game = useContext(GameState);
  const rotate = true;

  return (
    <div className="flex flex-col w-fit">
      {playerNum === 0 && (
        <div className="flex items-center justify-center h-[2rem] gap-[8px]">
          <p className="text-center text-[white] text-[12px] rounded border border-[white] p-[4px]">You</p>

          {game.state.currentPlayer.value === playerNum && (
            <p className="text-center text-[white] text-[12px] rounded border border-[white] p-[4px]">Your Turn</p>
          )}
        </div>
      )}
      <div
        className="flex hover:background-[red] w-fit"
        style={{
          height: `${cardHeight}px`,
        }}
      >
        {cards.map((card, i) => {
          const distanceFromMiddle = i - (cards.length - 1) / 2;
          const leftOffset = distanceFromMiddle > 0 ? -1 : 1;

          return (
            <div
              key={i}
              className="hover:translate-y-[-0.5em] cursor-pointer"
              style={{
                // Use Math.abs before raising to a fractional power. Raising a negative
                // number to a non-integer exponent yields NaN in JS (complex number),
                // which makes the entire CSS transform invalid and prevents rotate
                // from being applied. Keep the sign via leftOffset.
                transform: rotate
                  ? `translate(${leftOffset * Math.abs(distanceFromMiddle) ** 1.2 * 3}em, ${Math.abs(
                      Math.abs(distanceFromMiddle) ** 1.7 * 0.2,
                    )}em) rotate(${distanceFromMiddle * 8 + 0.01}deg)`
                  : "unset",
                // the 0.01 is to prevent a weird bug where cards with 0 rotation flickers after rotation animation completes
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
      {playerNum > 0 && (
        <div className="flex items-center justify-center h-[2rem] gap-[8px]">
          <p className="text-center text-[white] text-[12px] rounded border border-[white] p-[4px]">
            Player {playerNum}
          </p>

          {game.state.currentPlayer.value === playerNum && (
            <p className="text-center text-[white] text-[12px] rounded border border-[white] p-[4px]">Their Turn</p>
          )}
        </div>
      )}
    </div>
  );
}
