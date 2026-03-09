export const q = (selector: string): HTMLElement | null => {
  if (typeof document === "undefined") return null;
  return document.querySelector(selector) as HTMLElement | null;
};

export const startTransition = (fn: () => void) => {
  if (typeof document === "undefined" || !("startViewTransition" in document)) {
    fn();
    return;
  }

  // @ts-ignore - experimental API
  return (document as any).startViewTransition(() => {
    return fn();
  });
};
