import { useRef, useState, useEffect } from 'react';
import { ExhibitCard } from '../components/ExhibitCard';
import { row1Members, row2Members, cardRotations } from '../data/teamData';

/**
 * TeamSection — 800vh scroll-pinned section.
 *
 * Animation timeline (progress 0 → 1):
 *   0.00 – 0.03  Title "Meet the CodeBase Team" fully visible
 *   0.03 – 0.42  Row 1 (2k23) sweeps RIGHT → LEFT
 *   0.42 – 0.46  Clean 4% pause (≈32vh gap between rows)
 *   0.46 – 0.86  Row 2 (2k24) sweeps LEFT → RIGHT
 *                Starts at translateX -3500px so all 10 cards are fully
 *                off-screen on the left from the very first frame.
 *   0.70 – 0.86  Ending heading fades in BEHIND the last cards (zIndex 3 < 5)
 *                → last card acts as a curtain that reveals the heading
 *   0.86 – 1.00  Section unpins
 */
export function TeamSection() {
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

  // --- Title ---
  const titleOpacity = progress < 0.12 ? 1
    : progress < 0.20 ? 1 - (progress - 0.12) / 0.08
      : 0;

  // --- Row 1: right → left (0.03 → 0.42) ---
  const row1Progress = progress < 0.03 ? 0 : progress < 0.42 ? (progress - 0.03) / 0.39 : 1;
  const row1X = 2600 - row1Progress * 5200; // +2600 → -2600

  const row1Opacity = progress < 0.03 ? 0
    : progress < 0.07 ? (progress - 0.03) / 0.04
      : progress < 0.38 ? 1
        : progress < 0.42 ? 1 - (progress - 0.38) / 0.04
          : 0;

  // --- Row 2: left → right (0.46 → 0.86) ---
  // Starting at -3500 ensures all 10 cards (≈3300px total) are fully off-screen left.
  const row2Progress = progress < 0.46 ? 0 : progress < 0.86 ? (progress - 0.46) / 0.40 : 1;
  const row2X = -3500 + row2Progress * 6800; // -3500 → +3300

  const row2Opacity = progress < 0.46 ? 0
    : progress < 0.82 ? 1
      : progress < 0.86 ? 1 - (progress - 0.82) / 0.04
        : 0;

  // --- Ending heading (zIndex 3, behind cards at zIndex 5) ---
  // Reaches opacity 1 at 0.86 while the last card is still covering it.
  const endingOpacity = progress < 0.70 ? 0
    : progress < 0.86 ? (progress - 0.70) / 0.16
      : 1;

  // Scroll-driven card wobble rotation
  const getCardRotation = (index, rowProgress, rotations) => {
    const base   = rotations[index % rotations.length];
    const sweep  = Math.sin(rowProgress * Math.PI * 2 + index * 0.8) * 5;
    const wobble = Math.cos(rowProgress * Math.PI * 3 + index * 1.2) * 2;
    return base + sweep + wobble;
  };

  return (
    <div
      id="members"
      ref={containerRef}
      style={{ position: 'relative', height: '800vh', background: '#f5f5f5' }}
    >
      {/* Sticky viewport */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden' }}>

        {/* Title */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: titleOpacity, zIndex: 2, pointerEvents: 'none',
        }}>
          <h2 style={{
            fontSize: 'clamp(40px, 7vw, 100px)',
            fontWeight: 900, lineHeight: 0.95,
            textTransform: 'uppercase', letterSpacing: '-0.05em',
            color: '#000', margin: 0, textAlign: 'center',
          }}>
            Meet the <br />
            <span style={{ color: '#1099B7' }}>CodeBase </span>
            <span style={{ color: '#000' }}>Team</span>
          </h2>
        </div>

        {/* Row 1 — 2k23 batch, RIGHT → LEFT */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex', alignItems: 'center',
          opacity: row1Opacity, zIndex: 5,
          pointerEvents: row1Opacity > 0 ? 'auto' : 'none',
        }}>
          <div style={{
            display: 'flex', gap: 32, padding: '0 40px',
            transform: `translateX(${row1X}px)`,
            willChange: 'transform',
          }}>
            {row1Members.map((member, i) => (
              <ExhibitCard
                key={i}
                title={member.name}
                description={member.role}
                color={member.color}
                image={member.img}
                rotation={getCardRotation(i, row1Progress, cardRotations)}
                github={member.github}
                linkedin={member.linkedin}
              />
            ))}
          </div>
        </div>

        {/* Row 2 — 2k24 batch, LEFT → RIGHT */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex', alignItems: 'center',
          opacity: row2Opacity, zIndex: 5,
          pointerEvents: row2Opacity > 0 ? 'auto' : 'none',
        }}>
          <div style={{
            display: 'flex', gap: 32, padding: '0 40px',
            transform: `translateX(${row2X}px)`,
            willChange: 'transform',
          }}>
            {row2Members.map((member, i) => (
              <ExhibitCard
                key={i}
                title={member.name}
                description={member.role}
                color={member.color}
                image={member.img}
                rotation={getCardRotation(i, row2Progress, cardRotations)}
                github={member.github}
                linkedin={member.linkedin}
              />
            ))}
          </div>
        </div>

        {/* Ending message — sits BEHIND cards (zIndex 3 < 5) */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          opacity: endingOpacity, zIndex: 3,
          pointerEvents: 'none', padding: '0 24px',
        }}>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 72px)',
            fontWeight: 900, lineHeight: 1.05,
            textTransform: 'uppercase', letterSpacing: '-0.04em',
            color: '#000', margin: 0, textAlign: 'center', maxWidth: 900,
          }}>
            You've met the minds.<br />
            <span style={{ color: '#1099B7' }}>Now join the action.</span>
          </h2>
          <p style={{
            fontSize: 'clamp(14px, 1.5vw, 20px)',
            color: '#444', textAlign: 'center',
            maxWidth: 600, marginTop: 24,
            fontWeight: 500, lineHeight: 1.6,
          }}>
            From late-night hackathons to skill-building workshops,
            we're always building something new.
          </p>
        </div>

        {/* Background column grid (subtle decorative) */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          pointerEvents: 'none', opacity: 0.05,
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', height: '100%' }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ borderRight: '1px solid #000' }} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
