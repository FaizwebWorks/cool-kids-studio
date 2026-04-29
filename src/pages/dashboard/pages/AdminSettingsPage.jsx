import { useState } from 'react';
import { SpinnerGap, UserCircle } from 'phosphor-react';
import { useAdminAuth } from '../../../hooks/useAdminAuth';
import { getErrorMessage } from '../utils';
import { ErrorNotice, PageHeader, Panel } from '../components/DashboardUI';

export const AdminSettingsPage = () => {
  const { user, changePassword } = useAdminAuth();
  const [values, setValues] = useState({ currentPassword: '', newPassword: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');
    setIsSaving(true);

    try {
      await changePassword(values);
      setValues({ currentPassword: '', newPassword: '' });
      setMessage('Password changed successfully.');
    } catch (err) {
      setError(getErrorMessage(err, 'Could not change password.'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Settings"
        title="Admin account"
        description="Manage profile details and keep the admin password updated."
      />
      <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(18rem,0.85fr)_minmax(0,1fr)]">
        <Panel title="Profile">
          <div className="min-w-0 rounded-[1.5rem] bg-primary p-6 text-bg">
            <UserCircle size={38} />
            <h3 className="mt-4 break-words font-heading text-4xl uppercase leading-none">{user?.name || 'Admin User'}</h3>
            <p className="mt-2 break-words text-sm text-bg/60">{user?.email || 'No email loaded'}</p>
            <p className="mt-1 text-sm text-bg/45">Role: {user?.role || 'admin'}</p>
          </div>
        </Panel>
        <Panel title="Change password">
          <form onSubmit={submit} className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-primary/45">Current password</span>
              <input
                type="password"
                value={values.currentPassword}
                onChange={(event) => setValues((current) => ({ ...current, currentPassword: event.target.value }))}
                className="w-full rounded-[1rem] border border-primary/10 bg-bg px-4 py-4 outline-none transition focus:border-accent"
                required
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-primary/45">New password</span>
              <input
                type="password"
                value={values.newPassword}
                onChange={(event) => setValues((current) => ({ ...current, newPassword: event.target.value }))}
                className="w-full rounded-[1rem] border border-primary/10 bg-bg px-4 py-4 outline-none transition focus:border-accent"
                required
              />
            </label>
            {message && <div className="rounded-[1rem] bg-accent/30 p-4 text-sm font-bold">{message}</div>}
            {error && <ErrorNotice message={error} />}
            <button
              type="submit"
              disabled={isSaving}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-4 font-bold transition hover:bg-accent-hover disabled:opacity-60"
            >
              {isSaving && <SpinnerGap size={17} className="animate-spin" />}
              Save Password
            </button>
          </form>
        </Panel>
      </div>
    </div>
  );
};
