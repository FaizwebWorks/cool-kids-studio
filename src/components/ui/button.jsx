import React from 'react';
import { cx } from '../../pages/dashboard/utils';

const variants = {
  default: 'bg-primary text-bg hover:bg-primary/90',
  accent: 'bg-accent text-primary hover:bg-accent-hover',
  outline: 'border border-primary/10 bg-transparent text-primary hover:bg-primary hover:text-bg',
  ghost: 'text-primary hover:bg-primary/5',
  destructive: 'bg-red-50 text-red-700 hover:bg-red-600 hover:text-white',
};

const sizes = {
  default: 'h-11 px-5 py-2.5 text-sm',
  sm: 'h-9 px-4 py-2 text-sm',
  icon: 'h-10 w-10 p-0',
};

export const Button = React.forwardRef(({
  className = '',
  variant = 'default',
  size = 'default',
  ...props
}, ref) => (
  <button
    ref={ref}
    className={cx(
      'inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-bold transition disabled:pointer-events-none disabled:opacity-60',
      variants[variant] || variants.default,
      sizes[size] || sizes.default,
      className,
    )}
    {...props}
  />
));

Button.displayName = 'Button';
