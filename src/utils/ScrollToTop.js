import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToHashTarget } from './hashScroll';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }

    scrollToHashTarget(hash, { behavior: 'smooth' });
  }, [pathname, hash]);

  return null;
}
