export const q = (selector: string): HTMLElement | null => {
  if (typeof document === "undefined") return null;
  return document.querySelector(selector) as HTMLElement | null;
};

export const startTransition = (fn: () => void) => {
  if (typeof document === "undefined" || !("startViewTransition" in document)) {
    // call and return the callback's return value so callers can await it when
    // needed (e.g. returning a Promise that resolves after paint).
    return fn();
  }

  return document.startViewTransition(fn);
};
