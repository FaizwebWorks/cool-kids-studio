import { NavLink } from 'react-router-dom';
import { SignOut } from 'phosphor-react';
import { navGroups } from '../config';
import { cx } from '../utils';

export const DashboardNav = ({ onNavigate, onLogout, user }) => (
  <div className="flex min-h-full flex-col">
    <div className="shrink-0 rounded-[1.75rem] border border-primary/5 bg-primary p-5 text-bg shadow-xl shadow-primary/10">
      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-bg/45">Studio Admin</p>
      <h2 className="mt-3 font-heading text-4xl uppercase leading-none">Control Room</h2>
      <p className="mt-3 text-sm leading-relaxed text-bg/60">
        Manage bookings, services, content, and studio settings from one place.
      </p>
    </div>

    <nav className="mt-6 flex-1 space-y-6 pb-6">
      {navGroups.map((group) => (
        <div key={group.label}>
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-primary/40">
            {group.label}
          </p>
          <div className="space-y-1">
            {group.items.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={onNavigate}
                  className={({ isActive }) => cx(
                    'flex min-w-0 items-center gap-3 rounded-full px-4 py-3 text-sm font-bold transition-all duration-300',
                    isActive ? 'bg-accent text-primary shadow-sm' : 'text-primary/65 hover:bg-card hover:text-primary',
                  )}
                >
                  <Icon size={18} className="shrink-0" />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      ))}
    </nav>

    <div className="mt-4 shrink-0 rounded-[1.5rem] border border-primary/5 bg-white/45 p-4">
      <p className="text-sm font-bold">{user?.name || 'Admin User'}</p>
      <p className="mt-1 truncate text-xs text-text-secondary">{user?.email || 'Signed in'}</p>
      <button
        type="button"
        onClick={onLogout}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-primary/10 px-4 py-3 text-sm font-bold transition hover:bg-primary hover:text-bg"
      >
        <SignOut size={17} />
        Logout
      </button>
    </div>
  </div>
);
