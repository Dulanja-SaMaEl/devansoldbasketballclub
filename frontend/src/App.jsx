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
import AchievementDetailPage from './pages/AchievementDetailPage';
import LegendsPage from './pages/LegendsPage';
import LegendDetailPage from './pages/LegendDetailPage';
import GenerationsPage from './pages/GenerationsPage';
import GenerationDetailPage from './pages/GenerationDetailPage';
import GalleryPage from './pages/GalleryPage';
import StoriesPage from './pages/StoriesPage';
import StoryDetailPage from './pages/StoryDetailPage';
import NewsPage from './pages/NewsPage';
import NewsDetailPage from './pages/NewsDetailPage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

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
          
          {/* Achievements Routes */}
          <Route path="achievements" element={<AchievementsPage />} />
          <Route path="achievements/:slug" element={<AchievementDetailPage />} />
          
          {/* Legends Routes */}
          <Route path="legends" element={<LegendsPage />} />
          <Route path="legends/:slug" element={<LegendDetailPage />} />
          
          {/* Generations Routes */}
          <Route path="generations" element={<GenerationsPage />} />
          <Route path="generations/:slug" element={<GenerationDetailPage />} />
          
          {/* Gallery Routes */}
          <Route path="gallery" element={<GalleryPage />} />
          
          {/* Stories Routes */}
          <Route path="stories" element={<StoriesPage />} />
          <Route path="stories/:slug" element={<StoryDetailPage />} />
          
          {/* News Routes */}
          <Route path="news" element={<NewsPage />} />
          <Route path="news/:slug" element={<NewsDetailPage />} />
          
          {/* Events Routes */}
          <Route path="events" element={<EventsPage />} />
          <Route path="events/:slug" element={<EventDetailPage />} />
          
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

        {/* SEO-Safe 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
