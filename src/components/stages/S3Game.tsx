import { signal } from "@preact/signals";
import { createGameState, GameState } from "../../state/game";
import GameLayout from "../GameLayout";

const count = signal(0);

export default function S3Game() {
  return (
    <GameState.Provider value={createGameState()}>
      <GameLayout />
    </GameState.Provider>
  );
}
