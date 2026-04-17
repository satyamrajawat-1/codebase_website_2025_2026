import { useRef, useState, useEffect } from 'react';
import { projectsData } from '../data/eventsData';

/**
 * ProjectsSection (labelled "Our Events" on-screen) — 600vh scroll-pinned.
 *
 * Animation phases (progress 0 → 1):
 *   0.00 – 0.06  "Our Events" title visible
 *   0.06 – 0.12  Title fades, card 0 enters from NEXT position (bottom-right)
 *   0.12 – 0.90  Card transitions: NEXT → BIG → PREV (cycling through all events)
 *   0.90 – 1.00  Section unpins
 *
 * Card position presets (equal ~2% gap on both sides of BIG):
 *   PREV  center (20%, 20%), w=12vw  — top-left thumbnail
 *   BIG   center (50%, 53%), w=44vw  — main feature card
 *   NEXT  center (80%, 82%), w=12vw  — bottom-right thumbnail
 */
export function ProjectsSection() {
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

  const N = projectsData.length;
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeInOut = (x) => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;

  // Title fades out before card animation begins
  const titleOpacity = progress < 0.06 ? 1
    : progress < 0.10 ? 1 - (progress - 0.06) / 0.04
      : 0;

  // First card enters from NEXT position (bottom-right) and grows to BIG
  const firstGrow = progress < 0.06 ? 0
    : progress < 0.12 ? (progress - 0.06) / 0.06
      : 1;
  const firstGrowEased = easeInOut(firstGrow);

  // Continuous project index (0 → N-1) across the 0.12 → 0.90 scroll window
  const projStart = 0.12;
  const projEnd   = 0.90;
  const rawIdx = progress <= projStart ? 0
    : progress >= projEnd ? N - 1
      : ((progress - projStart) / (projEnd - projStart)) * (N - 1);

  const stepIdx = Math.min(Math.floor(rawIdx), N - 2);
  const t  = Math.max(0, Math.min(1, rawIdx - stepIdx));
  const et = easeInOut(t);

  // Card position presets
  //   BIG  left edge 28%, right edge 72%   (44vw wide, centered at 50%)
  //   PREV right edge 26%                  (12vw wide, centered at 20%) → 2% gap to BIG
  //   NEXT left edge 74%                   (12vw wide, centered at 80%) → 2% gap to BIG
  const BIG  = { x: 50, y: 53, w: 44, h: 76 };
  const PREV = { x: 20, y: 20, w: 12, h: 20 };
  const NEXT = { x: 80, y: 82, w: 12, h: 20 };

  const getCardState = (i) => {
    // Intro: card 0 enters from NEXT position and grows to BIG
    if (progress < projStart) {
      if (i === 0) {
        return {
          x: lerp(NEXT.x, BIG.x, firstGrowEased),
          y: lerp(NEXT.y, BIG.y, firstGrowEased),
          w: lerp(NEXT.w, BIG.w, firstGrowEased),
          h: lerp(NEXT.h, BIG.h, firstGrowEased),
          opacity: firstGrow > 0 ? 1 : 0,
          radius: lerp(16, 24, firstGrowEased),
          zIndex: 5,
        };
      }
      // Card 1 preview at NEXT (bottom-right) appears near end of intro
      if (i === 1 && firstGrow > 0.7) {
        const a = (firstGrow - 0.7) / 0.3;
        return {
          x: NEXT.x, y: NEXT.y,
          w: lerp(0, NEXT.w, a), h: lerp(0, NEXT.h, a),
          opacity: a, radius: 16, zIndex: 3,
        };
      }
      return null;
    }

    // Transitions
    if (i === stepIdx) {
      // Current BIG → shrinks to PREV (top-left)
      return {
        x: lerp(BIG.x, PREV.x, et), y: lerp(BIG.y, PREV.y, et),
        w: lerp(BIG.w, PREV.w, et), h: lerp(BIG.h, PREV.h, et),
        opacity: 1, radius: lerp(24, 16, et),
        zIndex: Math.round(lerp(5, 2, et)),
      };
    }
    if (i === stepIdx + 1) {
      // NEXT → grows to BIG (center)
      return {
        x: lerp(NEXT.x, BIG.x, et), y: lerp(NEXT.y, BIG.y, et),
        w: lerp(NEXT.w, BIG.w, et), h: lerp(NEXT.h, BIG.h, et),
        opacity: 1, radius: lerp(16, 24, et),
        zIndex: Math.round(lerp(3, 5, et)),
      };
    }
    if (i === stepIdx + 2 && et > 0.5) {
      // Next-next card appears at NEXT (bottom-right)
      const a = (et - 0.5) / 0.5;
      return {
        x: NEXT.x, y: NEXT.y,
        w: lerp(0, NEXT.w, a), h: lerp(0, NEXT.h, a),
        opacity: a, radius: 16, zIndex: 1,
      };
    }
    if (i === stepIdx - 1) {
      // Old PREV fades out quickly
      return {
        x: PREV.x, y: PREV.y, w: PREV.w, h: PREV.h,
        opacity: Math.max(0, 1 - et * 3), radius: 16, zIndex: 1,
      };
    }
    return null;
  };

  // Description text shown beside the BIG card
  const descIdx = Math.min(Math.round(rawIdx), N - 1);
  const descOpacity = progress < projStart ? firstGrow
    : progress > projEnd ? 0
      : (t < 0.2 || t > 0.8) ? 1
        : Math.max(0, 1 - Math.abs(t - 0.5) * 0.5);

  return (
    <div
      id="events"
      ref={containerRef}
      style={{ position: 'relative', height: '600vh', background: '#f0edd4' }}
    >
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden' }}>

        {/* Section label */}
        <div style={{ position: 'absolute', bottom: 30, left: 40, zIndex: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#888' }}>
            Our Events
          </span>
        </div>

        {/* Title */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: titleOpacity, zIndex: 10, pointerEvents: 'none',
        }}>
          <h2 style={{
            fontSize: 'clamp(48px, 8vw, 120px)',
            fontWeight: 900, lineHeight: 0.95,
            textTransform: 'uppercase', letterSpacing: '-0.05em',
            color: '#1a1a1a', margin: 0, textAlign: 'center',
          }}>
            Our<br />
            <span style={{ color: '#555' }}>Events</span>
          </h2>
        </div>

        {/* Event cards */}
        {projectsData.map((project, i) => {
          const state = getCardState(i);
          if (!state || state.opacity <= 0.01) return null;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${state.x}%`, top: `${state.y}%`,
                width: `${state.w}vw`, height: `${state.h}vh`,
                transform: 'translate(-50%, -50%)',
                opacity: state.opacity,
                borderRadius: state.radius,
                overflow: 'hidden',
                zIndex: state.zIndex,
                willChange: 'width, height, left, top, opacity',
                boxShadow: state.w > 20
                  ? '0 25px 80px rgba(0,0,0,0.18)'
                  : '0 8px 24px rgba(0,0,0,0.12)',
              }}
            >
              <img
                src={project.img}
                alt={project.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Name overlay — only shown on the BIG card */}
              {state.w > 30 && (
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '40px 30px 30px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                }}>
                  <h3 style={{
                    fontSize: 'clamp(18px, 2.5vw, 32px)',
                    fontWeight: 900, color: '#fff',
                    textTransform: 'uppercase', letterSpacing: '-0.03em', margin: 0,
                  }}>
                    {project.name}
                  </h3>
                </div>
              )}
            </div>
          );
        })}

        {/* Description — right-side panel beside BIG card */}
        {progress >= 0.10 && progress < projEnd && (
          <div style={{
            position: 'absolute', right: '5%', top: '42%',
            transform: 'translateY(-50%)',
            maxWidth: 240,
            opacity: descOpacity, zIndex: 8,
            transition: 'opacity 0.3s ease',
          }}>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#555', fontWeight: 500, margin: 0 }}>
              {projectsData[descIdx].desc}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
