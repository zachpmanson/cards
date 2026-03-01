import { html, useEffect, useState } from "https://unpkg.com/htm/preact/standalone.module.js";

let sprite = "'/assets/card-sprite.png'";
let dpr = window.devicePixelRatio;
let width = 71;
let height = 96;

let cwidth = width * Math.round(dpr);
let cheight = height * Math.round(dpr);

export default function Card({ suit, number, faceDown, group, onClick }) {
  const [justRendered, setJustRendered] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setJustRendered(false);
    }, 1500);
    return () => {
      setJustRendered(true);
    };
  }, []);

  const actualSuit = faceDown ? 5 : suit;
  const actualNumber = faceDown ? 1 : number;

  const offsetX = (Math.floor(actualNumber - 1) % 14) * width;
  const offsetY = (Math.floor(actualSuit - 1) % 6) * height;

  const id = cardId({ suit, number, group });
  return html`<div
    id=${id}
    onClick=${() => {
      onClick?.(suit, number, group);
    }}
    style=${{
      height: `${height}px`,
      width: `${width}px`,
      borderRadius: "3.5px",
      background: `url(${sprite}) ${-offsetX}px ${-offsetY}px`,
      viewTransitionName: id,
      viewTransitionGroup: "card-move",
      // zIndex: justRendered ? 5 : undefined,
      position: "relative",
      border: justRendered ? "solid 1px red" : "solid 1px transparent",
    }}
  ></div>`;
}

// ${number}-${suit}
// <br />
// ${faceDown ? "Face Down" : "Face Up"}
// <br />
// X${offsetX} / Y${offsetY}

export function cardId({ suit, number, group }) {
  return `card-${String(group).replace(".", "")}-${suit}-${number}`;
}
