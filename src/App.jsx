import React from 'react';

// Layout components
import { Navbar }         from './components/Navbar';
import { Footer }         from './components/Footer';

// Page sections
import { HeroSection }    from './sections/HeroSection';
import { TeamSection }    from './sections/TeamSection';
import { ProjectsSection } from './sections/ProjectsSection';

// Smooth-scroll hook (Locomotive Scroll v5 / Lenis)
import { useLocomotiveScroll } from './hooks/useLocomotiveScroll';

/**
 * App — root component.
 *
 * Responsible only for:
 *   1. Initialising Locomotive Scroll (smooth inertia, slower wheel speed)
 *   2. Composing the page from its section components
 *
 * All animation logic lives inside individual section files under src/sections/.
 * All shared UI components live in src/components/.
 * Static data (team members, events) lives in src/data/.
 */
export default function App() {
  // Lenis options — lower wheelMultiplier = slower, more cinematic scroll feel
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

      {/* 400vh — scroll-pinned hero with logo scale + text fade */}
      <HeroSection />

      {/* 800vh — scroll-pinned team cards, two rows with opposing directions */}
      <TeamSection />

      {/* 600vh — scroll-pinned events with card grow/shrink transitions */}
      <ProjectsSection />

      <Footer />
    </div>
  );
}