import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import HistoryPage from './pages/HistoryPage';
import AchievementsPage from './pages/AchievementsPage';
import LegendsPage from './pages/LegendsPage';
import GenerationsPage from './pages/GenerationsPage';
import GalleryPage from './pages/GalleryPage';
import StoriesPage from './pages/StoriesPage';
import NewsPage from './pages/NewsPage';
import EventsPage from './pages/EventsPage';
import ContactPage from './pages/ContactPage';

// Admin Pages
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminContentManager from './admin/AdminContentManager';
import AdminSubmissions from './admin/AdminSubmissions';
import AdminSettings from './admin/AdminSettings';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Website Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="timeline" element={<Navigate to="/history" replace />} />
          <Route path="achievements" element={<AchievementsPage />} />
          <Route path="legends" element={<LegendsPage />} />
          <Route path="generations" element={<GenerationsPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="stories" element={<StoriesPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        {/* Admin Login Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="content/:type" element={<AdminContentManager />} />
          <Route path="submissions" element={<AdminSubmissions />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Fallback 404 Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
