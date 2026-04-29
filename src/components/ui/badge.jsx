import { cx } from '../../pages/dashboard/utils';

const variants = {
  default: 'bg-primary text-bg',
  accent: 'bg-accent/60 text-primary',
  secondary: 'bg-card text-primary/70',
  destructive: 'bg-red-100 text-red-700',
};

export const Badge = ({ className = '', variant = 'default', ...props }) => (
  <span
    className={cx(
      'inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em]',
      variants[variant] || variants.default,
      className,
    )}
    {...props}
  />
);
