import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTransition } from '../../context/TransitionContext';

const TransitionLink = ({ to, children, className, ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { startTransition } = useTransition();

  const handleClick = async (e) => {
    // If it's a hash link or the same path, let it behave normally
    if (to.startsWith('#') || to === location.pathname) {
      return;
    }

    // External links
    if (to.startsWith('http')) {
      return;
    }

    e.preventDefault();
    
    // Trigger the exit animation
    await startTransition('forward');
    
    // Navigate to the new route
    navigate(to);
    
    // Scroll to top immediately after navigation
    window.scrollTo(0, 0);
  };

  return (
    <Link to={to} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
};

export default TransitionLink;
