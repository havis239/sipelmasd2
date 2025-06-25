import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/NavbarNew';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import FirebaseTest from './components/FirebaseTest';

// Kebutuhan #5: Optimasi Kinerja dengan Lazy Loading
const LaporanDetailPage = lazy(() => import('./pages/LaporanDetailPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const LoginMasyarakatPage = lazy(() => import('./pages/LoginMasyarakatPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const BuatLaporanPage = lazy(() => import('./pages/BuatLaporanPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

function App() {
  return (
    <>
      <Navbar />
      <main style={{ padding: '1rem' }}>
        <Suspense fallback={<div>Memuat halaman...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/laporan/:id" element={<LaporanDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login-masyarakat" element={<LoginMasyarakatPage />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/buat-laporan" 
              element={
                <ProtectedRoute requireUser={true}>
                  <BuatLaporanPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Suspense>
      </main>
      
      {/* Debug component - remove in production */}
      {import.meta.env.DEV && <FirebaseTest />}
    </>
  );
}

export default App;