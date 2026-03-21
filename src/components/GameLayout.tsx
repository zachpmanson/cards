import { useContext } from "preact/hooks";
import { GameState, N_HANDS, PlayerNum } from "../state/game";
import DeckDraw from "./DeckDraw";
import DeckPlayed from "./DeckPlayed";
import { Hand } from "./Hand";

export default function GameLayout() {
  const gameState = useContext(GameState);
  return (
    <div className="flex items-start h-full w-screen">
      <div className="flex flex-col">
        <button onClick={() => gameState.actions.sortHands()}>Sort</button>
        <button onClick={() => gameState.actions.toggleDebug("openHand")}>Toggle Open Hands</button>
        <button onClick={() => gameState.actions.toggleDebug("botMove")}>Toggle Bot Move</button>
      </div>
      <div className="flex w-full flex-col h-full items-center justify-between py-8">
        <div className="flex w-full">
          {Array(N_HANDS - 1)
            .fill(0)
            .map((_, i) => (
              <div className="flex-1 flex justify-center">
                <Hand
                  cards={gameState.slots[`player${i + 1}`].value}
                  onClick={(card) => gameState.actions.playerCardClicked(card, (i + 1) as PlayerNum)}
                  playerNum={(i + 1) as PlayerNum}
                  faceDown={!gameState.state.debug.value.openHand}
                />
              </div>
            ))}
        </div>
        <div className="flex gap-16">
          <DeckDraw />
          <DeckPlayed />
        </div>
        <div>
          <Hand
            cards={gameState.slots["player0"].value}
            onClick={(card) => gameState.actions.playerCardClicked(card, 0)}
            playerNum={0}
          />
        </div>
        <div className="flex gap-3 items-end">
          <span>
            <span>Direction:</span> <span>{gameState.state.direction.value}</span>
          </span>
          <span>
            <span>Current Player:</span> <span>{gameState.state.currentPlayer.value}</span>
          </span>
          <span>
            <span>Next Player Offset:</span>
            <span> {gameState.state.nextPlayerOffset.value}</span>
          </span>
          <span>
            <span>Pickup N Cards:</span>
            <span
              className="transition-all"
              style={{
                fontSize: gameState.state.pickupNCards.value * 12,
              }}
            >
              {gameState.state.pickupNCards.value}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
