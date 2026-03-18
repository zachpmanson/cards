import { useContext } from "preact/hooks";
import { GameState, N_HANDS, PlayerNum } from "../state/game";
import DeckDraw from "./DeckDraw";
import DeckPlayed from "./DeckPlayed";
import { Hand } from "./Hand";

export default function GameLayout() {
  const gameState = useContext(GameState);
  return (
    <div className="w-full flex flex-col h-full items-center justify-between p-[32px]">
      <div className="flex flex-col items-center">
        {Array(N_HANDS - 1)
          .fill(0)
          .map((_, i) => (
            <Hand
              cards={gameState.slots[`player${i + 1}`].value}
              onClick={(card) => gameState.actions.playerCardClicked(card, (i + 1) as PlayerNum)}
              playerNum={(i + 1) as PlayerNum}
              faceDown
            />
          ))}
      </div>
      <div className="flex gap-[64px]">
        <DeckDraw />
        <DeckPlayed />
        <div className="flex flex-col">
          <p>Direction: {gameState.state.direction.value}</p>
          <p>Current Player: {gameState.state.currentPlayer.value}</p>
          <p>Next Player Offset: {gameState.state.nextPlayerOffset.value}</p>
          <p>Pickup N Cards: {gameState.state.pickupNCards.value}</p>
        </div>
      </div>
      <div>
        <Hand
          cards={gameState.slots["player0"].value}
          onClick={(card) => gameState.actions.playerCardClicked(card, 0)}
          playerNum={0}
        />
      </div>
    </div>
  );
}
