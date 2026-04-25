import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTransition } from '../../context/TransitionContext';

const TransitionLink = ({ to, children, className, ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { startTransition } = useTransition();

  const handleClick = async (e) => {
    // If it's a hash link on the SAME page, let it behave normally (smooth scroll)
    const isSamePageHash = to.startsWith('#') || (to.startsWith('/#') && location.pathname === '/');
    
    if (isSamePageHash || to === location.pathname) {
      if (props.onClick) props.onClick(e);
      return;
    }

    // External links
    if (to.startsWith('http')) {
      if (props.onClick) props.onClick(e);
      return;
    }

    e.preventDefault();
    
    // If there's an onClick handler (like closing a menu), execute it and wait
    if (props.onClick) {
      await props.onClick(e);
    }
    
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
