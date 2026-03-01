export const q = (e) => document.querySelector(e);

export const startTransition = (fn) => {
  if (!document.startViewTransition) {
    fn();
    return;
  }

  return document.startViewTransition(fn());
};
