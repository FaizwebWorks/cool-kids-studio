import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToHashTarget, toHashPath } from '../utils/hashScroll';

export const useSectionNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return useCallback(
    async (hash) => {
      const targetPath = toHashPath(hash);
      const targetHash = targetPath.includes('#') ? targetPath.slice(targetPath.indexOf('#')) : '';

      if (location.pathname !== '/') {
        navigate(targetPath);
        return;
      }

      if (location.hash !== targetHash) {
        navigate(targetPath);
      }

      await scrollToHashTarget(hash, { behavior: 'smooth' });
    },
    [location.hash, location.pathname, navigate],
  );
};
