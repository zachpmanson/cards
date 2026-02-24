import { html, useEffect } from "https://unpkg.com/htm/preact/standalone.module.js";
import { hidePopup, showPopup } from "/components/Popup.js";
export default function WantToPlay({ next }) {
  useEffect(() => {
    showPopup(
      "Let's make a bet",
      html`<div>
        Whoever wins gets to hire the other person?
        <button
          onClick=${() => {
            hidePopup();
            next();
          }}
        >
          Deal!
        </button>
      </div> `,
    );
  }, []);
  return html``;
}
