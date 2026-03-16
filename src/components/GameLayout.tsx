import { useContext } from "preact/hooks";
import { GameState } from "../state/game";
import DeckDraw from "./DeckDraw";
import DeckPlayed from "./DeckPlayed";
import { Hand } from "./Hand";

export default function GameLayout() {
  const gameState = useContext(GameState);
  return (
    <div className="w-full flex flex-col h-full items-center justify-between p-[32px]">
      <div>
        <Hand cards={gameState.slots.player2.value} faceDown />
      </div>
      <div className="flex gap-[32px">
        <DeckDraw />
        <DeckPlayed />
      </div>
      <div>
        <Hand cards={gameState.slots.player1.value} />
      </div>
    </div>
  );
}
