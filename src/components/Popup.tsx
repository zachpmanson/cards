import { useEffect, useState } from "preact/hooks";
import Window from "./Window";

type PopupState = {
  title: string;
  body: preact.ComponentChildren;
  onClose?: () => void;
};

let globalSetter: ((s: PopupState | null) => void) | null = null;

export function showPopup(title: string, body: preact.ComponentChildren, onClose?: () => void) {
  globalSetter?.({ title, body, onClose });
}

export function hidePopup() {
  globalSetter?.(null);
}

export function Popover() {
  const [state, setState] = useState<PopupState | null>(null);

  useEffect(() => {
    globalSetter = setState;
    return () => {
      if (globalSetter === setState) globalSetter = null;
    };
  }, []);

  return (
    <div id="popup" popover style={{ border: "none", backgroundColor: "transparent" }}>
      {state && <Window title={state.title} body={state.body} />}
    </div>
  );
}
