import { useRef, useState, useEffect } from 'react';

/**
 * HeroSection — fullscreen scroll-pinned hero.
 *
 * Animation layers (z-index stack):
 *   z:5   "IIIT kota" heading  (behind logo)
 *   z:10  CodeBase SVG logo    (center, scales up + un-rotates)
 *   z:15  "CodeBase" heading   (in front of logo)
 *   z:5   Subtitle paragraph
 *
 * Progress 0 → 1 tracks how far the user has scrolled through the 400vh container.
 */
export function HeroSection() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollRange = containerRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      setProgress(Math.max(0, Math.min(1, scrolled / scrollRange)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ---- Derived animation values ----

  // Phase 1 (0 → 0.30): text moves up and fades out
  const textTranslateY = progress < 0.30 ? -(progress / 0.30) * 120 : -120;
  const textOpacityVal = progress < 0.05 ? 1
    : progress < 0.25 ? 1 - (progress - 0.05) / 0.20
      : 0;

  // Scroll indicator fades first
  const scrollIndicatorVal = progress < 0.06 ? 1 - progress / 0.06 : 0;

  // Phase 2 (0.25 → 0.72): logo scales 1 → 2
  let imageScaleVal;
  if (progress < 0.25) {
    imageScaleVal = 1;
  } else if (progress < 0.72) {
    imageScaleVal = 1 + ((progress - 0.25) / (0.72 - 0.25));
  } else {
    imageScaleVal = 2;
  }

  // Logo un-rotates from -30° as user starts scrolling
  const imageRotation = progress < 0.30 ? -30 * (1 - progress / 0.30) : 0;

  return (
    <div
      id="home"
      ref={containerRef}
      style={{ position: 'relative', height: '400vh', background: '#000' }}
    >
      {/* Sticky viewport */}
      <div style={{
        position: 'sticky', top: 0, height: '100vh', width: '100%',
        background: '#000', overflow: 'hidden',
      }}>

        {/* LAYER 1 — "IIIT kota" (behind logo, z:5) */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 5, pointerEvents: 'none',
          transform: `translateY(${textTranslateY}vh)`,
          opacity: textOpacityVal,
          willChange: 'transform, opacity',
        }}>
          <h1 style={{
            fontSize: 'clamp(60px, 10vw, 160px)',
            fontWeight: 900, lineHeight: 0.9,
            letterSpacing: '-0.05em', textTransform: 'uppercase',
            margin: 0, textAlign: 'center',
            textShadow: '0 4px 20px rgba(0,0,0,0.5)', color: '#fff',
            transform: 'translateY(-80px)',
          }}>
            IIIT kota
          </h1>
        </div>

        {/* LAYER 2 — CodeBase SVG logo (middle, z:10) */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 10, pointerEvents: 'none',
        }}>
          <div style={{
            width: 220, height: 220,
            transform: `scale(${imageScaleVal}) rotate(${imageRotation}deg)`,
            willChange: 'transform',
            transition: 'transform 0.05s linear',
          }}>
            <img
              src="./codebase.svg"
              alt="CodeBase Logo"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* LAYER 3 — "CodeBase" heading (above logo, z:15) */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 15, pointerEvents: 'none',
          transform: `translateY(${textTranslateY}vh)`,
          opacity: textOpacityVal,
          willChange: 'transform, opacity',
        }}>
          <h1 style={{
            fontSize: 'clamp(70px, 11vw, 180px)',
            fontWeight: 900, lineHeight: 0.9,
            letterSpacing: '-0.05em', textTransform: 'uppercase',
            margin: 0, textAlign: 'center',
            textShadow: '0 4px 20px rgba(0,0,0,0.5)',
            transform: 'translateY(80px)',
          }}>
            <span style={{ color: '#1099B7' }}>Code</span>
            <span style={{ color: '#fff' }}>Base</span>
          </h1>
        </div>

        {/* LAYER 4 — Subtitle (behind logo, z:5) */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          zIndex: 5, pointerEvents: 'none',
          transform: `translateY(${textTranslateY}vh)`,
          opacity: textOpacityVal,
          willChange: 'transform, opacity',
        }}>
          <p style={{
            fontSize: 'clamp(11px, 1.2vw, 20px)',
            color: 'rgba(255,255,255,0.8)', fontWeight: 900,
            textTransform: 'uppercase', letterSpacing: '0.15em',
            lineHeight: 1.8, textAlign: 'center',
            maxWidth: 700, padding: '0 24px',
            transform: 'translateY(220px)',
          }}>
            The Free and Open Source Club of IIIT Kota.<br />
            Promoting open source development and coding culture.
          </p>
        </div>

        {/* Scroll indicator */}
        <div style={{
          opacity: scrollIndicatorVal,
          position: 'absolute', bottom: 40, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          zIndex: 30,
        }} />

      </div>
    </div>
  );
}
