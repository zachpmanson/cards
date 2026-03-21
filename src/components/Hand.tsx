import { useContext } from "preact/hooks";
import { CardDetails, GameState, PlayerNum } from "../state/game";
import FannedCards from "./FannedCards";

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

  return (
    <div className="flex flex-col w-40 items-center gap-1">
      <div className="flex items-center justify-center h-8 gap-2">
        {playerNum === 0 && (
          <>
            <p className="text-center text-[white] text-[12px] rounded border border-[white] p-1">You</p>
            {game.state.currentPlayer.value === playerNum && <TurnIndicator playerNum={playerNum} />}
          </>
        )}
      </div>
      <FannedCards cards={cards} onClick={onClick} faceDown={faceDown} />

      <div className="flex items-center justify-center h-8 gap-2">
        {playerNum > 0 && (
          <>
            <p className="text-center text-[white] text-[12px] rounded border border-[white] p-1">Player {playerNum}</p>
            {game.state.currentPlayer.value === playerNum && <TurnIndicator playerNum={playerNum} />}
          </>
        )}
      </div>
    </div>
  );
}

function TurnIndicator({ playerNum }: { playerNum: PlayerNum }) {
  return (
    <p
      className="text-center text-[white] text-[12px] rounded border border-[white] p-1"
      style={{
        viewTransitionName: "turn-indicator",
        viewTransitionGroup: "turn-indicator",
      }}
    >
      {playerNum === 0 ? "Your" : "Their"} Turn
    </p>
  );
}
