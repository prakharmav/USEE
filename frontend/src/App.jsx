import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuthStore } from './store/authStore';

// Pages
import Home from './pages/Home';
import AuthForm from './pages/AuthForm';
import Dashboard from './pages/Dashboard';
import Career from './pages/Career';
import Loans from './pages/Loans';
import Chat from './pages/Chat';
import UniversitySearch from './pages/UniversitySearch';
import Predict from './pages/Predict';
import ROI from './pages/ROI';
import UniversityDetail from './pages/UniversityDetail';
import Saved from './pages/Saved';
import EligibilityResult from './pages/EligibilityResult';
import EssayHelper from './pages/EssayHelper';

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
        
        {/* Fill remaining space */}
        <div className="flex-grow flex flex-col relative w-full pt-20">
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
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
