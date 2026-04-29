import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeSlash, SpinnerGap, WarningCircle } from 'phosphor-react';
import { useAdminAuth } from '../../../hooks/useAdminAuth';
import { getErrorMessage } from '../utils';

export const LoginPage = () => {
  const { login, status } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const redirectTo = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (status === 'authenticated') {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate, status]);

  const submitLogin = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(form);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err, 'Could not login. Please check your credentials.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-screen min-w-0 bg-bg text-primary lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <section className="flex min-h-[42vh] min-w-0 flex-col justify-between bg-primary p-6 text-bg md:p-10">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-bg/45">Secure Studio Portal</p>
          <h1 className="mt-8 max-w-xl break-words font-heading text-5xl uppercase leading-[0.9] sm:text-7xl md:text-9xl">
            Admin Dashboard
          </h1>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-bg/55 md:text-base">
          Bookings, schedule decisions, and content operations live here. Public customers never need to login.
        </p>
      </section>

      <section className="flex min-w-0 items-center justify-center p-5 md:p-10">
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          onSubmit={submitLogin}
          className="w-full max-w-md rounded-[1.5rem] border border-white/70 bg-white/50 p-5 shadow-sm backdrop-blur-xl sm:rounded-[2rem] sm:p-6 md:p-8"
        >
          <span className="inline-flex rounded-full border border-primary/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-primary/55">
            Staff Access
          </span>
          <h2 className="mt-5 break-words font-heading text-4xl uppercase leading-none sm:text-5xl">Welcome Back</h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            Sign in to manage bookings, services, and studio content.
          </p>

          <label className="mt-8 block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-primary/45">Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              className="w-full rounded-[1rem] border border-primary/10 bg-bg px-4 py-4 outline-none transition focus:border-accent"
              placeholder="admin@thecoolkids.test"
              required
            />
          </label>

          <label className="mt-4 block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-primary/45">Password</span>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                className="w-full rounded-[1rem] border border-primary/10 bg-bg px-4 py-4 pr-14 outline-none transition focus:border-accent"
                placeholder="Admin@12345"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-primary/55 transition hover:bg-primary/5 hover:text-primary"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeSlash size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </label>

          {error && (
            <div className="mt-5 flex items-start gap-3 rounded-[1.25rem] border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <WarningCircle size={18} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-accent px-6 py-4 font-bold text-primary transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting && <SpinnerGap size={18} className="animate-spin" />}
            {isSubmitting ? 'Signing in' : 'Enter Dashboard'}
          </button>
        </motion.form>
      </section>
    </div>
  );
};
