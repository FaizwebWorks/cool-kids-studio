import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UserCircle, X } from 'phosphor-react';
import { useAdminAuth } from '../../../hooks/useAdminAuth';
import { DashboardNav } from './DashboardNav';

export const DashboardShell = ({ children }) => {
  const { user, logout } = useAdminAuth();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/dashboard/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-bg text-primary">
      <aside data-lenis-prevent className="fixed inset-y-0 left-0 z-40 hidden h-dvh w-72 overflow-y-auto overscroll-contain border-r border-primary/5 bg-white/55 px-4 py-5 backdrop-blur-xl lg:block">
        <DashboardNav onLogout={handleLogout} user={user} />
      </aside>

      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-primary/30 backdrop-blur-sm lg:hidden"
          >
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
              data-lenis-prevent
              className="h-dvh w-[86vw] max-w-sm overflow-y-auto overscroll-contain bg-bg p-4"
            >
              <div className="mb-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsMobileNavOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/10"
                  aria-label="Close dashboard navigation"
                >
                  <X size={18} />
                </button>
              </div>
              <DashboardNav
                onNavigate={() => setIsMobileNavOpen(false)}
                onLogout={handleLogout}
                user={user}
              />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-w-0 lg:pl-72">
        <header className="sticky top-0 z-30 flex min-w-0 items-center justify-between gap-3 border-b border-primary/5 bg-bg/80 px-4 py-3 backdrop-blur-xl sm:gap-4 md:px-8 md:py-4">
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(true)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-primary/10 lg:hidden"
            aria-label="Open dashboard navigation"
          >
            <span className="h-0.5 w-5 bg-primary" />
            <span className="h-0.5 w-5 bg-primary" />
          </button>

          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary/45">Admin Dashboard</p>
            <h1 className="truncate font-heading text-3xl uppercase leading-none md:text-5xl">The Cool Kids</h1>
          </div>

          <div className="flex min-w-0 shrink-0 items-center gap-3">
            <div className="hidden min-w-0 text-right sm:block">
              <p className="truncate text-sm font-bold">{user?.name || 'Admin'}</p>
              <p className="max-w-48 truncate text-xs text-text-secondary">{user?.email}</p>
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-bg md:h-11 md:w-11">
              <UserCircle size={22} />
            </div>
          </div>
        </header>

        <main className="mx-auto min-w-0 max-w-[104rem] px-4 py-5 sm:px-5 md:px-8 md:py-8">
          {children}
        </main>
      </div>
    </div>
  );
};
