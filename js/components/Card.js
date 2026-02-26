import { html } from "https://unpkg.com/htm/preact/standalone.module.js";

let sprite = "./assets/card-sprite.png";
let dpr = window.devicePixelRatio;
let width = 71;
let height = 96;

let cwidth = width * Math.round(dpr);
let cheight = height * Math.round(dpr);

export default function Card({ suit, number, faceDown }) {
  const actualSuit = faceDown ? 5 : suit;
  const actualNumber = faceDown ? 1 : number;

  const offsetX = (Math.floor(actualNumber - 1) % 14) * width;
  const offsetY = (Math.floor(actualSuit - 1) % 6) * height;

  return html`<div
    class="card"
    style=${{
      height: `${height}px`,
      width: `${width}px`,
      borderRadius: "3.5px",
      background: `url(${sprite}) ${-offsetX}px ${-offsetY}px`,
    }}
  ></div>`;
}

// ${number}-${suit}
// <br />
// ${faceDown ? "Face Down" : "Face Up"}
// <br />
// X${offsetX} / Y${offsetY}
