// src/state/game.tsx
import { computed, Signal, signal } from "@preact/signals";
import { createContext } from "preact";
import { cardId } from "../components/Card";
import { generateRange, randomChoice, randomizeArray, sort } from "../lib/array";
import { startTransition, timeout } from "../lib/utils";

export type CardDetails = { suit: number; number: number; groupId: string };

type CardSlot = "drawDeck" | "playedDeck" | `player${PlayerNum}`;

function sortCards(cardA: CardDetails, cardB: CardDetails) {
  if (cardA.suit !== cardB.suit) {
    return cardA.suit > cardB.suit ? -1 : 1;
  }

  return cardA.number > cardB.number ? -1 : 1;
}

export const N_HANDS = 4;
const INIT_HAND_SIZE = 12;
const CARD_MOVE_TIMEOUT = 200;

export type PlayerNum = number;

function compareCards(a: CardDetails, b: CardDetails) {
  return a.suit === b.suit && a.number === b.number && a.groupId === b.groupId;
}

function p(playerNum: PlayerNum): CardSlot {
  return `player${playerNum}`;
}

function getPlayerDistance(curr: number, dest: number, direction) {
  if (direction === "clockwise") {
    return dest > curr ? dest - curr : N_HANDS - (dest - curr);
  } else {
    return dest > curr ? N_HANDS - (dest - curr) : dest - curr;
  }
}

// x x x x
// 0 1 2 3
const CHAINABLE_CARDS = [2, 3, 4, 10, 11];

export function createGameState() {
  // const deckId = String(Math.random());

  const baseCards = randomizeArray(
    Array(52)
      .fill(52)
      .map((_, i) => i)
      .map((i) => ({ number: (i % 13) + 1, suit: (i % 4) + 1, groupId: "deck1" })),
  );

  const slots: Record<CardSlot, Signal<CardDetails[]>> = {
    ...Object.fromEntries(
      Array(N_HANDS)
        .fill(N_HANDS)
        .map((_, i) => [p(i), signal<CardDetails[]>([])]),
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
    selectMode: signal<"next-player" | "donation-target" | "donation-card" | undefined>(),
    target: signal<PlayerNum>(),
    debug: signal({
      openHand: true,
      botMove: true,
    }),
  };

  async function moveCards(cards: CardDetails[], target: CardSlot) {
    const logicalMoveCard = (card: CardDetails, targetSlot: CardSlot) => {
      if (!card) {
        console.debug(`Attempted to move undefined card`);
        return;
      }
      console.debug(`Moving card ${cardId(card)} to ${target}`);
      for (let i = 0; i < N_HANDS; i++) {
        const playerIndex = slots[p(i)].value.findIndex((c) => compareCards(c, card));
        if (playerIndex !== -1) {
          slots[p(i)].value = slots[p(i)].value.filter((_, j) => j !== playerIndex);
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
    };
    console.debug(`Attempting to move`, cards);

    startTransition(() => {
      for (let card of cards) {
        logicalMoveCard(card, target);
      }
    });
    await timeout(CARD_MOVE_TIMEOUT);
  }

  function canCardBePlayed(card: CardDetails, topCard: CardDetails | undefined) {
    console.log("canCardBePlayed", { card, topCard, pickupNCards: state.pickupNCards.value });
    if (!topCard) return true;
    if (state.pickupNCards.value > 1) {
      if (CHAINABLE_CARDS.includes(card.number) && (topCard.suit === card.suit || topCard.number === card.number)) {
        console.log(`yes: pickup chain present but ${card.number} chainable and suits match`);
        return true;
      } else {
        console.log(`no: pickup chain present but ${card.number} not chainable or suits don't match`);
        return false;
      }
    }
    if (card.suit === topCard.suit || card.number === topCard.number) {
      return true;
    }
    if (card.number === 1) {
      return true;
    }
    if (topCard.number === 9) {
      return true;
    }
    console.log("no");
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
        state.pickupNCards.value += 3;
      }
      // chain +3
    } else if (card.number === 4) {
      // cancel chain
      state.pickupNCards.value = 1;
    } else if (card.number === 5) {
      // play again
      state.nextPlayerOffset.value = 0;
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
      if (state.currentPlayer.value === 0) {
        state.selectMode.value = "next-player";
      } else if (state.debug.value.botMove) {
        state.nextPlayerOffset.value = getPlayerDistance(
          state.currentPlayer.value,
          botTarget(state.currentPlayer.value),
          state.direction.value,
        );
        setTimeout(() => nextPlayer(), 500);
      }
      return false;
    } else if (card.number === 13) {
      // all other players pick a card to give to a player
      if (state.currentPlayer.value === 0) {
        state.selectMode.value = "donation-target";
      } else if (state.debug.value.botMove) {
        state.target.value = botTarget(state.currentPlayer.value);
        state.selectMode.value = "donation-card";
      }
      return false;
    }
    return true;
  }

  function nextPlayer() {
    startTransition(() => {
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

      if (state.debug.value.botMove && state.currentPlayer.value !== 0) {
        setTimeout(() => botMove(state.currentPlayer.value), 500);
      }
    });
  }

  function botMove(playerNum: number) {
    const hand = slots[p(playerNum)].value;
    for (let card of hand) {
      if (canCardBePlayed(card, slots.playedDeck.value.at(-1))) {
        actions.playerCardClicked(card, playerNum).then();
        return;
      }
    }
    actions.draw().then();
  }

  function botTarget(playerNum: PlayerNum) {
    let playerNums = generateRange(N_HANDS).splice(playerNum, 1);
    let choice = randomChoice(playerNums);
    console.log(`Bot targeted ${choice}`);
    return choice;
  }
  function botSelectDonateCard(playerNum: number) {
    return randomChoice(slots[p(playerNum)].value);
  }

  async function sortSlot(slotName: CardSlot) {
    startTransition(() => {
      slots[slotName].value = sort(slots[slotName].value, sortCards);
    });
    await timeout(CARD_MOVE_TIMEOUT);
  }

  async function shuffleSlot(slotName: CardSlot) {
    startTransition(() => {
      slots[slotName].value = randomizeArray(slots[slotName].value);
    });
    await timeout(CARD_MOVE_TIMEOUT);
  }

  async function refreshDeck() {
    const newDeck = slots.playedDeck.value.slice(0, -1);
    console.log(`Refreshing draw deck with ${newDeck.length} cards from the played deck`);
    await moveCards(newDeck, "drawDeck");
    await shuffleSlot("drawDeck");
  }

  const actions = {
    async flipCard() {
      console.debug(`flipCard()`);
      const card = slots.drawDeck.value.at(-1);
      if (!card) return;
      await moveCards([card], "playedDeck");
    },

    async initialDeal() {
      console.debug(`initialDeal()`);
      for (let i = 0; i < INIT_HAND_SIZE * N_HANDS; i++) {
        const card = slots.drawDeck.value.at(-1);
        if (!card) return;
        await moveCards([card], p(i % N_HANDS));
      }
      await actions.flipCard();
    },
    async draw() {
      console.debug(`draw()`);
      if (state.pickupNCards.value > slots.drawDeck.value.length) {
        await refreshDeck();
      }
      for (let i = 0; i < state.pickupNCards.value; i++) {
        await moveCards([topDrawCard.value], p(state.currentPlayer.value));
      }
      await timeout(200);
      if (slots.drawDeck.value.length === 0) {
        await refreshDeck();
      }
      state.pickupNCards.value = 1;

      nextPlayer();
    },

    async playerCardClicked(card: CardDetails, playerNum: PlayerNum) {
      console.debug(`playerCardClicked()`);
      if (playerNum !== state.currentPlayer.value) return;
      if (!canCardBePlayed(card, topPlayedCard.value)) return;

      await moveCards([card], "playedDeck");
      const goToNext = sideEffect(card);
      if (goToNext) {
        await timeout(500);
        nextPlayer();
      }
    },
    clearHands() {
      console.debug(`clearHands()`);
      for (let i = 0; i < N_HANDS; i++) {
        slots[p(i)].value = [];
      }
    },
    toggleDebug(key: string) {
      console.debug(`toggleDebug()`);
      state.debug.value = {
        ...state.debug.value,
        [key]: !state.debug.value[key],
      };
    },
    sortHands() {
      console.debug(`sortHands()`);
      startTransition(() => {
        for (let key of Object.keys(slots)) {
          slots[key].value = sort(slots[key].value, sortCards);
        }
      });
    },
    selectPlayer(playerNum: PlayerNum) {
      console.debug(`selectPlayer()`);
      if (state.selectMode.value === "next-player") {
        state.nextPlayerOffset.value = state.direction.value === "clockwise" ? playerNum : N_HANDS - playerNum;
        setTimeout(() => nextPlayer(), 500);
        state.selectMode.value = undefined;
      } else if (state.selectMode.value === "donation-target") {
        state.target.value = playerNum;
        state.selectMode.value = "donation-card";
      }
    },
    async selectDonationCard(card: CardDetails) {
      console.debug(`selectDonationCard()`);
      if (state.selectMode.value !== "donation-card") return;

      const targetPlayer = p(state.target.value);
      await moveCards([card], targetPlayer);
      state.selectMode.value = undefined;
      if (state.debug.value.botMove) {
        for (let i = 1; i < N_HANDS; i++) {
          if (i === state.target.value) continue;

          let choice = botSelectDonateCard(i);
          await moveCards([choice], targetPlayer);
        }
      }
      await timeout(500);
      nextPlayer();
    },
    forceNext() {
      console.debug(`forceNext()`);
      nextPlayer();
    },
  };

  return { slots, actions, state };
}

export const GameState = createContext(createGameState());
