import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import GlobalLoader from './components/GlobalLoader';
import { useAuthStore } from './store/authStore';

// Lazy Loaded Pages to reduce initial main.js bundle parsing < 500kb natively
const Home = lazy(() => import('./pages/Home'));
const AuthForm = lazy(() => import('./pages/AuthForm'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Career = lazy(() => import('./pages/Career'));
const Loans = lazy(() => import('./pages/Loans'));
const Chat = lazy(() => import('./pages/Chat'));
const UniversitySearch = lazy(() => import('./pages/UniversitySearch'));
const Predict = lazy(() => import('./pages/Predict'));
const ROI = lazy(() => import('./pages/ROI'));
const UniversityDetail = lazy(() => import('./pages/UniversityDetail'));
const Saved = lazy(() => import('./pages/Saved'));
const EligibilityResult = lazy(() => import('./pages/EligibilityResult'));
const EssayHelper = lazy(() => import('./pages/EssayHelper'));

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-background text-on-surface">
        {/* Navbar sits outside Routes so it's always rendered */}
        <Navbar />
        
        {/* Initialize Toastify Boundary universally */}
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={true} />

        {/* Fill remaining space */}
        <div className="flex-grow flex flex-col relative w-full pt-20">
          <Suspense fallback={<GlobalLoader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<AuthForm type="login" />} />
              <Route path="/register" element={<AuthForm type="register" />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/career" element={<ProtectedRoute><Career /></ProtectedRoute>} />
              <Route path="/loans" element={<ProtectedRoute><Loans /></ProtectedRoute>} />
              <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
              <Route path="/search" element={<ProtectedRoute><UniversitySearch /></ProtectedRoute>} />
              <Route path="/predict" element={<ProtectedRoute><Predict /></ProtectedRoute>} />
              <Route path="/roi" element={<ProtectedRoute><ROI /></ProtectedRoute>} />
              <Route path="/university-detail" element={<ProtectedRoute><UniversityDetail /></ProtectedRoute>} />
              <Route path="/saved" element={<ProtectedRoute><Saved /></ProtectedRoute>} />
              <Route path="/eligibility-result" element={<ProtectedRoute><EligibilityResult /></ProtectedRoute>} />
              <Route path="/essay-helper" element={<ProtectedRoute><EssayHelper /></ProtectedRoute>} />
            </Routes>
          </Suspense>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
