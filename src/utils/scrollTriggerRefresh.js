import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const requestScrollTriggerRefresh = (delay = 0) => {
  if (typeof window === 'undefined') return () => {};

  let frameId = null;
  const timeoutId = window.setTimeout(() => {
    frameId = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, delay);

  return () => {
    window.clearTimeout(timeoutId);
    if (frameId !== null) {
      window.cancelAnimationFrame(frameId);
    }
  };
};

export const requestScrollTriggerRefreshSequence = (delays = [0]) => {
  const cleanups = delays.map((delay) => requestScrollTriggerRefresh(delay));
  return () => cleanups.forEach((cleanup) => cleanup());
};
