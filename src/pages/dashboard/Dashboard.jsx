import { Navigate, Route, Routes } from 'react-router-dom';
import { cmsModules } from './config';
import { DashboardShell } from './components/DashboardShell';
import { ProtectedDashboard } from './components/ProtectedDashboard';
import { LoginPage } from './pages/LoginPage';
import { OverviewPage } from './pages/OverviewPage';
import { BookingsPage } from './pages/BookingsPage';
import { ServicesCrudPage } from './pages/ServicesCrudPage';
import { GalleryCrudPage } from './pages/GalleryCrudPage';
import { CmsPlaceholderPage } from './pages/CmsPlaceholderPage';
import { AdminSettingsPage } from './pages/AdminSettingsPage';

const DashboardRoutes = () => (
  <Routes>
    <Route path="login" element={<LoginPage />} />
    <Route
      path="/*"
      element={(
        <ProtectedDashboard>
          <DashboardShell>
            <Routes>
              <Route index element={<OverviewPage />} />
              <Route path="bookings" element={<BookingsPage />} />
              {cmsModules.map((module) => (
                <Route
                  key={module.path}
                  path={module.path}
                  element={module.path === 'services'
                    ? <ServicesCrudPage />
                    : module.path === 'gallery'
                      ? <GalleryCrudPage />
                      : <CmsPlaceholderPage module={module} />}
                />
              ))}
              <Route path="settings" element={<AdminSettingsPage />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </DashboardShell>
        </ProtectedDashboard>
      )}
    />
  </Routes>
);

export default DashboardRoutes;
