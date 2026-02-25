import { html, useEffect, useState } from "https://unpkg.com/htm/preact/standalone.module.js";
import { hidePopup, showPopup } from "../components/Popup.js";

export default function WantToPlay({ next }) {
  useEffect(() => {
    showPopup(
      "Let's make a bet",
      html`<${Body}
        next=${() => {
          hidePopup();
          next();
        }}
      />`,
    );
  }, []);
  return html`<div></div>`;
}

function Body({ next }) {
  const [size, setSize] = useState(1);

  function deal() {
    setSize(size + 1);
  }

  return html`<div className="flex flex-col gap-2 overflow-visible">
    Whoever wins gets to hire the other person?
    <div className="flex justify-end gap-1 items-center">
      <button
        onClick=${() => {
          deal();
        }}
      >
        No thanks
      </button>
      <button
        style=${{
          fontSize: `${size}em`,
          paddingLeft: `${size / 4}em`,
          paddingRight: `${size / 4}em`,
        }}
        className="transition-all duration-100 ease-linear"
        id="deal-button"
        onClick=${next}
      >
        Deal!
      </button>
    </div>
  </div>`;
}
