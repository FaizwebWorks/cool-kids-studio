import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ScrollTriggerManager = () => {
  const location = useLocation();

  useEffect(() => {
    // Refresh ScrollTrigger on route change with multiple attempts to handle lazy loading
    const refresh = () => ScrollTrigger.refresh();
    
    // Initial refresh after navigation
    refresh();

    const timers = [
      setTimeout(refresh, 500),
      setTimeout(refresh, 1000),
      setTimeout(refresh, 2500),
    ];

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [location.pathname]);

  return null;
};

export default ScrollTriggerManager;
