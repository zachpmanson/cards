import { html } from "https://unpkg.com/htm/preact/standalone.module.js";

let sprite = "'/assets/card-sprite.png'";
let dpr = window.devicePixelRatio;
let width = 71;
let height = 96;

let cwidth = width * Math.round(dpr);
let cheight = height * Math.round(dpr);

export default function Card({ suit, number, faceDown }) {
  return html`<div
    class="card"
    style=${{
      height: `${height}px`,
      width: `${width}px`,
      borderRadius: "3px",
      background: faceDown
        ? "url('/assets/card-back.png')"
        : `url(${sprite}) ${(Math.floor(suit) % 4) * width}px ${(Math.floor(-number + 1) % 14) * height}px`,
    }}
  ></div>`;
}
