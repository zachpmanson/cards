// src/state/game.tsx
import { computed, Signal, signal } from "@preact/signals";
import { createContext } from "preact";
import { randomizeArray } from "../lib/array";
import { startTransition } from "../lib/utils";

export type CardDetails = { suit: number; number: number; groupId: string };

type CardSlot = "drawDeck" | "playedDeck" | `player${PlayerNum}`;

export const N_HANDS = 4;
export type PlayerNum = number;

function compareCards(a: CardDetails, b: CardDetails) {
  return a.suit === b.suit && a.number === b.number && a.groupId === b.groupId;
}

const CHAINABLE_CARDS = [2, 3, 4, 10, 11];

export function createGameState() {
  // const deckId = String(Math.random());

  const baseCards = randomizeArray(
    Array(52)
      .fill(52)
      .map((_, i) => i)
      .map((i) => ({ number: (i % 13) + 1, suit: (i % 4) + 1, groupId: "deck1" })),
  );

  const slots: Record<string, Signal<CardDetails[]>> = {
    ...Object.fromEntries(
      Array(N_HANDS)
        .fill(N_HANDS)
        .map((_, i) => [`player${i}`, signal<CardDetails[]>([])]),
    ),
    drawDeck: signal<CardDetails[]>(baseCards),
    playedDeck: signal<CardDetails[]>([]),
  };
  const topPlayedCard = computed(() => {
    return slots.playedDeck.value.at(-1);
  });
  const topDrawCard = computed(() => {
    return slots.drawDeck.value.at(-1);
  });

  const state = {
    direction: signal<"clockwise" | "counterclockwise">("clockwise"),
    currentPlayer: signal<PlayerNum>(0),
    pickupNCards: signal(1),
    nextPlayerOffset: signal(1),
  };

  function moveCard(card: CardDetails, target: CardSlot) {
    startTransition(() => {
      for (let i = 0; i < N_HANDS; i++) {
        const playerIndex = slots[`player${i}` as const].value.findIndex((c) => compareCards(c, card));
        if (playerIndex !== -1) {
          slots[`player${i}` as const].value = slots[`player${i}` as const].value.filter((_, j) => j !== playerIndex);
          slots[target].value = [...slots[target].value, card];
          return;
        }
      }

      const drawDeckIndex = slots.drawDeck.value.findIndex((c) => compareCards(c, card));
      if (drawDeckIndex !== -1) {
        slots.drawDeck.value = slots.drawDeck.value.filter((_, i) => i !== drawDeckIndex);
        slots[target].value = [...slots[target].value, card];
        return;
      }
      const playedDeckIndex = slots.playedDeck.value.findIndex((c) => compareCards(c, card));
      if (playedDeckIndex !== -1) {
        slots.playedDeck.value = slots.playedDeck.value.filter((_, i) => i !== playedDeckIndex);
        slots[target].value = [...slots[target].value, card];
        return;
      }
    });
  }

  function canCardBePlayed(card: CardDetails, topCard: CardDetails | undefined) {
    console.log("canCardBePlayed", { card, topCard, pickupNCards: state.pickupNCards.value });
    if (!topCard) return true;
    if (card.suit === topCard.suit || card.number === topCard.number) return true;
    if (card.number === 1) return true;
    if (topCard.number === 9) return true;
    if (state.pickupNCards.value > 0 && CHAINABLE_CARDS.includes(card.number)) return true;
    console.log("can't play card");
    return false;
  }

  function sideEffect(card: CardDetails) {
    if (card.number === 1) {
      // new suit
    } else if (card.number === 2) {
      if (state.pickupNCards.value === 1) {
        state.pickupNCards.value = 2;
      } else {
        state.pickupNCards.value += 2;
      }
      // chain +2
    } else if (card.number === 3) {
      if (state.pickupNCards.value === 1) {
        state.pickupNCards.value = 3;
      } else {
        state.pickupNCards.value = 3;
      }
      // chain +3
    } else if (card.number === 4) {
      // cancel chain
      state.pickupNCards.value = 1;
    } else if (card.number === 5) {
      // play again
    } else if (card.number === 6) {
      // nothing
    } else if (card.number === 7) {
      // reverse
      state.direction.value = state.direction.value === "clockwise" ? "counterclockwise" : "clockwise";
    } else if (card.number === 8) {
      // skip
      state.nextPlayerOffset.value = 2;
    } else if (card.number === 9) {
      // play any card
      state.nextPlayerOffset.value = 0;
    } else if (card.number === 10) {
      // reverse, continue chain
      state.direction.value = state.direction.value === "clockwise" ? "counterclockwise" : "clockwise";
    } else if (card.number === 11) {
      // skip, continue chain
      state.nextPlayerOffset.value = 2;
    } else if (card.number === 12) {
      // pick next player
    } else if (card.number === 13) {
      // all other players pick a card to give to a player
    }
  }

  function nextPlayer() {
    console.debug("nextPlayer", {
      currentPlayer: state.currentPlayer.value,
      nextPlayerOffset: state.nextPlayerOffset.value,
      direction: state.direction.value,
    });
    if (state.direction.value === "clockwise") {
      state.currentPlayer.value = ((state.currentPlayer.value + state.nextPlayerOffset.value) % N_HANDS) as PlayerNum;
    } else {
      state.currentPlayer.value = ((state.currentPlayer.value - state.nextPlayerOffset.value + N_HANDS) %
        N_HANDS) as PlayerNum;
    }

    state.nextPlayerOffset.value = 1;
  }

  const actions = {
    flipCard() {
      const card = slots.drawDeck.value.at(-1);
      if (!card) return;
      moveCard(card, "playedDeck");
    },

    initialDeal() {
      const initialHandSize = 7;
      for (let i = 0; i < initialHandSize * N_HANDS; i++) {
        setTimeout(() => {
          const card = slots.drawDeck.value.at(-1);
          if (!card) return;
          moveCard(card, `player${i % N_HANDS}` as const);
        }, i * 200);
      }
      setTimeout(
        () => {
          actions.flipCard();
          // moveCard(slots.drawDeck.value.at(-1), "playedDeck");
          // state.currentPlayer.value = 0;
        },
        200 * (initialHandSize * N_HANDS + 1),
      );
    },
    draw() {
      for (let i = 0; i < state.pickupNCards.value; i++) {
        setTimeout(() => {
          moveCard(topDrawCard.value, `player${state.currentPlayer.value}`);
        }, i * 200);
      }
      setTimeout(
        () => {
          nextPlayer();
          state.pickupNCards.value = 1;
        },
        (state.pickupNCards.value + 2) * 200,
      );
    },

    playerCardClicked(card: CardDetails, playerNum: PlayerNum) {
      if (playerNum !== state.currentPlayer.value) return;
      if (!canCardBePlayed(card, topPlayedCard.value)) return;

      moveCard(card, "playedDeck");

      sideEffect(card);

      nextPlayer();
    },
    clearHands() {
      for (let i = 0; i < N_HANDS; i++) {
        slots[`player${i}` as const].value = [];
      }
    },
  };

  return { slots: slots, actions, state };
}

export const GameState = createContext(createGameState());
