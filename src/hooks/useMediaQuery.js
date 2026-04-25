import { useSyncExternalStore } from 'react';

const supportsMatchMedia = () => typeof window !== 'undefined' && typeof window.matchMedia === 'function';

export const useMediaQuery = (query) => {
  const subscribe = (onStoreChange) => {
    if (!supportsMatchMedia()) return () => {};

    const mediaQueryList = window.matchMedia(query);
    const listener = () => onStoreChange();
    mediaQueryList.addEventListener('change', listener);

    return () => mediaQueryList.removeEventListener('change', listener);
  };

  const getSnapshot = () => {
    if (!supportsMatchMedia()) return false;
    return window.matchMedia(query).matches;
  };

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
};
