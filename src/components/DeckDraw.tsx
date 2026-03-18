import { useContext, useEffect } from "preact/hooks";
import { GameState } from "../state/game";
import Deck from "./Deck";

export default function DeckDraw() {
  const game = useContext(GameState);

  useEffect(() => {
    setTimeout(() => {
      game.actions.initialDeal();
    }, 1000);
  }, []);

  return <Deck cards={game.slots.drawDeck.value} faceDown={true} onClick={game.actions.draw} />;
}
