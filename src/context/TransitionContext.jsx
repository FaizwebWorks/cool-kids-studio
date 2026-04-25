import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { requestScrollTriggerRefresh } from '../utils/scrollTriggerRefresh';

const TransitionContext = createContext({
  isTransitioning: false,
  direction: 'forward',
  startTransition: async () => {},
});

export const useTransition = () => useContext(TransitionContext);

export const TransitionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('forward');

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setDirection('back');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const startTransition = useCallback(async (newDirection = 'forward') => {
    if (isTransitioning) return;
    
    setDirection(newDirection);
    setIsTransitioning(true);
    
    // Wait for the exit animation duration (matches GSAP timeline)
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsTransitioning(false);
        resolve();
      }, 1000); // Wait for 1s (matching the GSAP duration)
    });
  }, [isTransitioning]);

  return (
    <TransitionContext.Provider value={{ isTransitioning, direction, startTransition, setIsTransitioning }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const usePageTransitionStyles = () => {
  const { isTransitioning } = useTransition();

  useEffect(() => {
    if (isTransitioning) return undefined;
    return requestScrollTriggerRefresh(180);
  }, [isTransitioning]);

  return {
    pageContainer: {
      opacity: isTransitioning ? 0 : 1,
      transform: isTransitioning ? 'scale(0.96)' : 'none',
      transition: 'opacity 1.2s cubic-bezier(0.76, 0, 0.24, 1), transform 1.2s cubic-bezier(0.76, 0, 0.24, 1)',
    },
  };
};
