import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { requestScrollTriggerRefreshSequence } from '../../utils/scrollTriggerRefresh';

const ScrollTriggerManager = () => {
  const location = useLocation();

  useEffect(() => {
    return requestScrollTriggerRefreshSequence([0, 320]);
  }, [location.pathname, location.hash]);

  return null;
};

export default ScrollTriggerManager;
