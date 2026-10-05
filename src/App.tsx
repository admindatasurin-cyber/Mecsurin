import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MECNavbar from './components/MECNavbar';
import MECHero from './components/MECHero';
import MECAboutSection from './components/MECAboutSection';
import AcademicConferencesSection from './components/AcademicConferencesSection';
import CurriculumAndRotations from './components/CurriculumAndRotations';
import FacilitiesShowcase from './components/FacilitiesShowcase';
import DownloadCenter from './components/DownloadCenter';
import FacultyDirectory from './components/FacultyDirectory';
import MECAnnouncements from './components/MECAnnouncements';
import MECFooter from './components/MECFooter';
import MECAdminPortal from './pages/MECAdminPortal';

// --- Home Page Root for Medical Education Center ---
const MECHomePage = () => {
  const [conferences, setConferences] = useState<any[]>([]);
  const [rotations, setRotations] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [faculty, setFaculty] = useState<any[]>([]);
  const [facilities, setFacilities] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/conferences')
      .then(res => res.json())
      .then(data => setConferences(data))
      .catch(() => {});

    fetch('/api/rotations')
      .then(res => res.json())
      .then(data => setRotations(data))
      .catch(() => {});

    fetch('/api/resources')
      .then(res => res.json())
      .then(data => setResources(data))
      .catch(() => {});

    fetch('/api/faculty')
      .then(res => res.json())
      .then(data => setFaculty(data))
      .catch(() => {});

    fetch('/api/facilities')
      .then(res => res.json())
      .then(data => setFacilities(data))
      .catch(() => {});

    fetch('/api/announcements')
      .then(res => res.json())
      .then(data => setAnnouncements(data))
      .catch(() => {});
  }, []);

  return (
    <>
      <MECNavbar />
      <main>
        <MECHero />
        <MECAboutSection />
        <AcademicConferencesSection conferences={conferences} />
        <CurriculumAndRotations rotations={rotations} />
        <FacilitiesShowcase facilities={facilities} />
        <DownloadCenter resources={resources} />
        <FacultyDirectory faculty={faculty} />
        <MECAnnouncements announcements={announcements} />
      </main>
      <MECFooter />
    </>
  );
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-slate-900 antialiased flex flex-col">
        <Routes>
          <Route path="/" element={<MECHomePage />} />
          <Route path="/admin" element={<MECAdminPortal />} />
        </Routes>
      </div>
    </Router>
  );
}
