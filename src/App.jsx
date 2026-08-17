import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Navbar }          from './components/Navbar';
import { Footer }          from './components/Footer';

import { HeroSection }     from './sections/HeroSection';
import { TeamSection }     from './sections/TeamSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { AlumniPage }      from './pages/AlumniPage';

import { useLocomotiveScroll } from './hooks/useLocomotiveScroll';

function HomePage() {
  useLocomotiveScroll({
    lerp: 0.06,
    wheelMultiplier: 0.65,
    touchMultiplier: 1.5,
  });

  return (
    <div style={{
      background: '#000',
      color: '#fff',
      fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
      minHeight: '100vh',
    }}>
      <Navbar />
      <HeroSection />
      <TeamSection />
      <ProjectsSection />
      <Footer />
    </div>
  );
}

function AlumniPageWrapper() {
  return (
    <div style={{
      background: '#000',
      color: '#fff',
      fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
      minHeight: '100vh',
    }}>
      <Navbar />
      <AlumniPage />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/"       element={<HomePage />} />
      <Route path="/alumni" element={<AlumniPageWrapper />} />
    </Routes>
  );
}