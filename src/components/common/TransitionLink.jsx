import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTransition } from '../../context/TransitionContext';
import { scrollToHashTarget } from '../../utils/hashScroll';

const TransitionLink = ({ to, children, className, ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { startTransition } = useTransition();

  const parseTarget = (target) => {
    if (typeof target !== 'string') return null;

    if (target.startsWith('http://') || target.startsWith('https://')) {
      return { isExternal: true };
    }

    if (target.startsWith('mailto:') || target.startsWith('tel:')) {
      return { isExternal: true };
    }

    const [pathPart, hashPart] = target.split('#');
    const pathname = pathPart || location.pathname;
    const hash = hashPart ? `#${hashPart}` : '';

    return {
      isExternal: false,
      pathname,
      hash,
      fullPath: `${pathname}${hash}`,
    };
  };

  const handleClick = async (e) => {
    const target = parseTarget(to);
    if (!target) return;

    if (target.isExternal) {
      if (props.onClick) await props.onClick(e);
      return;
    }

    const isHashNavigation = Boolean(target.hash);
    const isSamePath = target.pathname === location.pathname;
    const isSamePathHash = isSamePath && isHashNavigation;
    const isSameLocation = target.fullPath === `${location.pathname}${location.hash}`;

    if (isSameLocation || (isSamePath && !isHashNavigation)) {
      if (props.onClick) await props.onClick(e);
      return;
    }

    e.preventDefault();

    if (props.onClick) await props.onClick(e);

    if (isSamePathHash) {
      navigate(target.fullPath);
      await scrollToHashTarget(target.hash, { behavior: 'smooth' });
      return;
    }

    await startTransition('forward');
    navigate(target.fullPath);
  };

  return (
    <Link to={to} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
};

export default TransitionLink;
