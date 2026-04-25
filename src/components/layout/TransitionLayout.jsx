import React from 'react';
import { usePageTransitionStyles } from '../../context/TransitionContext';

const TransitionLayout = ({ children }) => {
  const { pageContainer } = usePageTransitionStyles();

  return (
    <div style={pageContainer}>
      {children}
    </div>
  );
};

export default TransitionLayout;
