// src/state/game.tsx
import { signal } from "@preact/signals";
import { createContext } from "preact";
import { randomizeArray } from "../lib/array";
import { startTransition } from "../lib/utils";

export type CardDetails = { suit: number; number: number; groupId: string };

export function createGameState() {
  // const deckId = String(Math.random());

  const baseCards = randomizeArray(
    Array(52)
      .fill(52)
      .map((_, i) => i)
      .map((i) => ({ number: (i % 13) + 1, suit: (i % 4) + 1, groupId: "deck1" })),
  );

  const slots = {
    player1: signal<CardDetails[]>([]),
    player2: signal<CardDetails[]>([]),
    drawDeck: signal<CardDetails[]>(baseCards),
    playedDeck: signal<CardDetails[]>([]),
  };
  const validInteraction = signal<"player1" | "player2" | "deck">("player1");

  const actions = {
    initialDeal() {
      let counter = 0;
      const initialHandSize = 7;
      const ptr = setInterval(() => {
        startTransition(() => {
          const remainingDeck = slots.drawDeck.value.slice(0, -1);
          if (counter % 2 === 0) {
            const card = slots.drawDeck.value.at(-1);
            if (!card) return;
            slots.player1.value = [...slots.player1.value, card];
          } else {
            const card = slots.drawDeck.value.at(-1);
            if (!card) return;
            slots.player2.value = [...slots.player2.value, card];
          }
          slots.drawDeck.value = remainingDeck;

          counter++;
          if (counter === initialHandSize * 2) {
            clearInterval(ptr);
          }
        });
      }, 200);
    },
    deckClicked() {
      if (validInteraction.value !== "deck") return;
      return startTransition(() => {
        const card = slots.drawDeck.value.at(-1);
        if (!card) return;

        slots.drawDeck.value = slots.drawDeck.value.slice(0, -1);

        slots.player1.value = [...slots.player1.value, card];
      });
    },
    addCardToPlayer1(card: CardDetails) {
      if (validInteraction.value !== "player1") return;

      slots.player1.value = [...slots.player1.value, card];
    },
    moveCardToPlayer2(index: number) {
      const card = slots.player1.value[index];
      if (!card) return;
      slots.player1.value = slots.player1.value.filter((_, i) => i !== index);
      slots.player2.value = [...slots.player2.value, card];
    },
    clearHands() {
      slots.player1.value = [];
      slots.player2.value = [];
    },
  };

  return { slots: slots, actions };
}

export const GameState = createContext(createGameState());
