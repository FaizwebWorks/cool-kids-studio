import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { cx } from '../../pages/dashboard/utils';

export const DropdownMenu = (props) => <DropdownMenuPrimitive.Root {...props} />;
export const DropdownMenuTrigger = (props) => <DropdownMenuPrimitive.Trigger {...props} />;
export const DropdownMenuGroup = (props) => <DropdownMenuPrimitive.Group {...props} />;

export const DropdownMenuContent = ({
  className = '',
  sideOffset = 8,
  align = 'end',
  ...props
}) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      align={align}
      sideOffset={sideOffset}
      className={cx(
        'z-50 min-w-44 overflow-hidden rounded-[1.25rem] border border-primary/10 bg-bg/95 p-1.5 text-primary shadow-2xl shadow-primary/15 backdrop-blur-xl',
        'data-[side=bottom]:animate-in data-[side=bottom]:fade-in data-[side=bottom]:slide-in-from-top-1',
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
);

export const DropdownMenuItem = ({ className = '', destructive = false, ...props }) => (
  <DropdownMenuPrimitive.Item
    className={cx(
      'flex cursor-pointer select-none items-center gap-2 rounded-full px-3 py-2.5 text-sm font-bold outline-none transition focus:bg-accent/35 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      destructive && 'text-red-700 focus:bg-red-50',
      className,
    )}
    {...props}
  />
);

export const DropdownMenuSeparator = ({ className = '', ...props }) => (
  <DropdownMenuPrimitive.Separator
    className={cx('my-1 h-px bg-primary/10', className)}
    {...props}
  />
);
