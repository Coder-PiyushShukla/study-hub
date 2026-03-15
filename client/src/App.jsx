import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from 'react-hot-toast';

import Navbar from "./components/common/navbar";
import BookIntro from "./components/common/BookIntro";
import Loader from "./components/common/loader";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/adminRoute";

import AdminLayout from "./layouts/AdminLayout";

const LandingPage = lazy(() => import("./pages/home"));
const About = lazy(() => import("./pages/about"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const NotesLibrary = lazy(() => import("./pages/NotesLibrary"));
const ExperienceHub = lazy(() => import("./pages/ExperienceHub"));
const CompanyPrep = lazy(() => import("./pages/companyPrep"));
const AIAssistant = lazy(() => import("./pages/AIassistant"));

const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/Register"));

const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminContent = lazy(() => import("./pages/admin/AdminContent"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics"));
const AdminReports = lazy(() => import("./pages/admin/AdminReports"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="h-screen w-full flex items-center justify-center bg-charcoal">
            <Loader type="spinner" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </>
  );
};

function App() {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (!hasSeenIntro) {
      setShowIntro(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setShowIntro(false);
  };

  return (
    <Router>
      <ScrollToTop />

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1A1714',
            color: '#F5F5F5',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      />

      <AnimatePresence mode="wait">
        {showIntro ? (
          <BookIntro
            key="intro"
            onComplete={handleIntroComplete}
          />
        ) : (
          <div
            key="app"
            className="relative min-h-screen bg-charcoal text-text-primary font-sans antialiased overflow-x-hidden"
          >
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<About />} />

                <Route path="/notes" element={
                  <ProtectedRoute>
                    <NotesLibrary />
                  </ProtectedRoute>
                } />
                <Route path="/experience" element={
                  <ProtectedRoute>
                    <ExperienceHub />
                  </ProtectedRoute>
                } />
                <Route path="/placements" element={
                  <ProtectedRoute>
                    <CompanyPrep />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/ai-mentor" element={
                  <ProtectedRoute>
                    <AIAssistant />
                  </ProtectedRoute>
                } />
              </Route>

              <Route
                path="/login"
                element={
                  <Suspense fallback={<div className="h-screen flex items-center justify-center bg-charcoal"><Loader /></div>}>
                    <Login />
                  </Suspense>
                }
              />
              <Route
                path="/register"
                element={
                  <Suspense fallback={<div className="h-screen flex items-center justify-center bg-charcoal"><Loader /></div>}>
                    <Register />
                  </Suspense>
                }
              />

              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <Suspense fallback={<div className="h-screen bg-charcoal flex items-center justify-center"><Loader /></div>}>
                      <AdminLayout />
                    </Suspense>
                  </AdminRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="content" element={<AdminContent />} />
                <Route path="analytics" element={<AdminAnalytics />} />
                <Route path="reports" element={<AdminReports />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              <Route
                path="*"
                element={
                  <div className="flex flex-col items-center justify-center h-screen bg-charcoal text-text-primary">
                    <h1 className="text-8xl font-bold text-gold-400 font-display">404</h1>
                    <p className="mt-4 text-2xl text-text-secondary">Page Not Found</p>
                    <a href="/" className="mt-8 px-8 py-3 bg-white text-charcoal rounded-xl font-bold hover:bg-gold-400 hover:text-charcoal transition-all">
                      Go Home
                    </a>
                  </div>
                }
              />
            </Routes>
          </div>
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;