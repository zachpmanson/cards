import { useContext } from "preact/hooks";
import { GameState } from "../state/game";
import Deck from "./Deck";

export default function DeckPlayed() {
  const game = useContext(GameState);

  return <Deck cards={game.slots.playedDeck.value} onClick={game.actions.draw} faceDown={false} />;
}
