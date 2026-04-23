
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import GalleryPage from '@/pages/GalleryPage';
import AboutUsPage from '@/pages/AboutUsPage';
import ContactUsPage from '@/pages/ContactUsPage';
import BookingPage from '@/pages/BookingPage';
import PrivacyPage from '@/pages/PrivacyPage';
import TermsPage from '@/pages/TermsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        {/* Catch all redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
