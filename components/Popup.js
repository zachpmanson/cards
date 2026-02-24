import { html, render } from "https://unpkg.com/htm/preact/standalone.module.js";
import { q } from "/util.js";

function showMessage(element, message) {
  let initPostion = element.style.position;

  render(html`<div class="child">${message}</div>`, element);

  element.style.position = "relative";

  if (message.classList.contains("d-none")) {
    message.classList.remove("d-none");
  }

  // message.classList.add('d-none');
  message.style.animation = "none";
  message.offsetHeight;
  message.style.animation = null;

  setTimeout(() => {
    element.style.position = initPostion;
  }, 1000);
}

export function showPopup(title, body, onClose) {
  const popup = q("#popup");

  render(
    html`<div class="window" style="width: 300px">
      <div class="title-bar">
        <div class="title-bar-text">${title}</div>
        <div class="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button
            aria-label="Close"
            onClick=${() => {
              onClose?.();
              hidePopup();
            }}
          ></button>
        </div>
      </div>
      <div class="window-body">${body}</div>
    </div>`,
    popup,
  );
  popup.showPopover();
}

export function hidePopup() {
  const popup = q("#popup");

  popup.hidePopover();
}

export function Popover() {
  return html`<div popover id="popup" style="border: none; background-color: transparent"></div>`;
}
