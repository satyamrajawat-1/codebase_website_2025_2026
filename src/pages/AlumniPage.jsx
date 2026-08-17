import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, PenSquare, Filter } from 'lucide-react';

import { alumniData, allPosts, batchYears } from '../data/alumniData';
import { AlumniCard } from '../components/alumni/AlumniCard';
import { AlumniModal } from '../components/alumni/AlumniModal';
import { AlumniPostCard } from '../components/alumni/AlumniPostCard';
import { PostSubmissionForm } from '../components/alumni/PostSubmissionForm';

// ─── Animated counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutExpo
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({ eyebrow, title, accent, subtitle, dark = false }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 56 }}>
      {eyebrow && (
        <span style={{
          display: 'inline-block',
          fontSize: 10, fontWeight: 800,
          textTransform: 'uppercase', letterSpacing: '0.2em',
          color: dark ? 'rgba(255,255,255,0.45)' : '#555',
          marginBottom: 14,
          background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
          border: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`,
          borderRadius: 100, padding: '4px 14px',
        }}>
          {eyebrow}
        </span>
      )}
      <h2 style={{
        margin: 0,
        fontSize: 'clamp(32px, 5vw, 64px)',
        fontWeight: 900,
        letterSpacing: '-0.04em',
        textTransform: 'uppercase',
        lineHeight: 0.95,
        color: dark ? '#fff' : '#111',
      }}>
        {title} <span style={{ color: '#1099B7' }}>{accent}</span>
      </h2>
      {subtitle && (
        <p style={{
          margin: '16px auto 0',
          fontSize: 14,
          color: dark ? 'rgba(255,255,255,0.45)' : '#666',
          maxWidth: 480,
          lineHeight: 1.7,
          fontWeight: 400,
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export function AlumniPage() {
  const [selectedAlum, setSelectedAlum] = useState(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const heroRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const groupedByBatch = useMemo(() => {
    const groups = {};
    alumniData.forEach((a) => {
      if (!groups[a.batch]) groups[a.batch] = [];
      groups[a.batch].push(a);
    });
    return Object.entries(groups).sort(([a], [b]) => Number(b) - Number(a));
  }, []);

  // Mouse tilt handler
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    // Normalise −1..+1 relative to centre
    const nx = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
    const ny = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
    const targetRx = -ny * 14;   // pitch: mouse up → tilt back
    const targetRy =  nx * 20;   // yaw:   mouse right → tilt right
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() =>
      setTilt({ rx: targetRx, ry: targetRy })
    );
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <div style={{
      background: '#f0edd4',       // same cream as events page
      minHeight: '100vh',
      color: '#111',
      fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
    }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        id="alumni-hero"
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          minHeight: '45vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '240px 24px 40px',
          overflow: 'hidden',
          textAlign: 'center',
          background: '#f0edd4',
          cursor: 'default',
        }}
      >
        {/* Subtle grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
        }} />

        {/* Column lines — same as TeamSection */}
        <div style={{
          position: 'absolute', inset: 0,
          pointerEvents: 'none', opacity: 0.05,
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', height: '100%' }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ borderRight: '1px solid #000' }} />
            ))}
          </div>
        </div>

        {/* Tilt wrapper — perspective gives the 2D-plane feel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative', zIndex: 2,
            perspective: '600px',      // depth of the 2D plane
          }}
        >
          <motion.h1
            animate={{
              rotateX: tilt.rx,
              rotateY: tilt.ry,
            }}
            transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 0.6 }}
            style={{
              margin: 0,
              fontSize: 'clamp(52px, 9vw, 130px)',
              fontWeight: 900,
              letterSpacing: '-0.05em',
              textTransform: 'uppercase',
              lineHeight: 0.9,
              color: '#000',
              transformStyle: 'preserve-3d',
              display: 'block',
              transformOrigin: 'center center',
              // subtle shadow that shifts with tilt to reinforce 3D feel
              textShadow: `${-tilt.ry * 0.4}px ${tilt.rx * 0.4}px 0px rgba(0,0,0,0.08)`,
              willChange: 'transform',
            }}
          >
            Our <span style={{ color: '#1099B7' }}>Alumni</span>
          </motion.h1>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            position: 'relative', zIndex: 2,
            marginTop: 48,
            display: 'flex',
            alignItems: 'stretch',
            background: '#000',
            border: '4px solid #000',
            borderRadius: 20,
            boxShadow: '6px 6px 0px 0px rgba(0,0,0,0.2)',
            overflow: 'hidden',
          }}
        >
          {[
            { value: alumniData.length,    label: 'Alumni'    },
            { value: batchYears.length,    label: 'Batches'   },
            { value: new Set(alumniData.flatMap(a => a.companies.map(c => c.name))).size, label: 'Companies' },
            { value: allPosts.length,      label: 'Articles'  },
          ].map(({ value, label }, i, arr) => (
            <div key={label} style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px 32px',
              borderRight: i < arr.length - 1 ? '2px solid rgba(255,255,255,0.08)' : 'none',
            }}>
              <div style={{
                fontSize: 'clamp(28px, 4vw, 52px)',
                fontWeight: 900,
                color: '#1099B7',
                letterSpacing: '-0.04em',
                lineHeight: 1,
              }}>
                <AnimatedCounter target={value} />
              </div>
              <div style={{
                fontSize: 10, fontWeight: 700,
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginTop: 6,
              }}>
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Alumni Cards Grid ─────────────────────────────────────────────── */}
      <section id="alumni-grid" style={{
        padding: 'clamp(24px, 3vw, 48px) clamp(16px, 5vw, 60px) clamp(60px, 8vw, 100px)',
        background: '#f0edd4',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          {groupedByBatch.map(([year, members]) => (
            <div key={year} style={{ marginBottom: 80 }}>
              {/* Year divider */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 16,
                marginBottom: 36,
              }}>
                <div style={{
                  fontSize: 'clamp(44px, 7vw, 80px)',
                  fontWeight: 900,
                  letterSpacing: '-0.05em',
                  color: 'rgba(0,0,0,0.35)',
                  lineHeight: 1,
                  userSelect: 'none',
                }}>
                  {year}
                </div>
                <div style={{ flex: 1, height: 2, background: 'rgba(0,0,0,0.1)' }} />
              </div>

              {/* Cards — using ExhibitCard via AlumniCard wrapper */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 32,
              }}>
                {members.map((alum, i) => (
                  <motion.div
                    key={alum.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <AlumniCard alum={alum} onClick={() => setSelectedAlum(alum)} />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Alumni Blog / Posts ───────────────────────────────────────────── */}
      <section id="alumni-posts" style={{
        padding: 'clamp(60px, 8vw, 100px) clamp(16px, 5vw, 60px)',
        background: '#111',
        borderTop: '4px solid #000',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeading
            title="Alumni"
            accent="Blog"
            subtitle="Articles, guides, and stories written by CodeBase alumni — directly from the trenches."
            dark
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 20,
          }}>
            {allPosts.map((post, i) => (
              <AlumniPostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Post Submission ───────────────────────────────────────────────── */}
      <section id="alumni-submit" style={{
        padding: 'clamp(60px, 8vw, 100px) clamp(16px, 5vw, 60px)',
        background: '#f0edd4',
        borderTop: '4px solid #000',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'flex-start' }}>

          {/* Left — copy */}
          <div style={{ flex: '1 1 300px', minWidth: 260 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span style={{
                display: 'inline-block',
                fontSize: 10, fontWeight: 800,
                textTransform: 'uppercase', letterSpacing: '0.2em',
                color: '#555', marginBottom: 14,
                background: 'rgba(0,0,0,0.06)',
                border: '1px solid rgba(0,0,0,0.12)',
                borderRadius: 100, padding: '4px 14px',
              }}>
                Share Your Story
              </span>
              <h2 style={{
                margin: 0,
                fontSize: 'clamp(28px, 4vw, 52px)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                lineHeight: 0.95,
                color: '#000',
                marginBottom: 20,
              }}>
                Write for<br /><span style={{ color: '#1099B7' }}>CodeBase</span>
              </h2>
              <p style={{
                fontSize: 14, color: '#555',
                lineHeight: 1.8, fontWeight: 400, maxWidth: 380,
              }}>
                Are you a CodeBase alumnus with a story, guide, or insight to share? Submit a post and inspire the next generation of engineers.
              </p>

              <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { icon: <PenSquare size={14} />, text: 'Share your career journey & lessons learned' },
                  { icon: <Filter size={14} />, text: 'Write technical guides & tutorials' },
                  { icon: <Users size={14} />, text: 'Mentor the next batch of CodeBase members' },
                ].map(({ icon, text }, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 8,
                      background: '#000',
                      border: '2px solid #000',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', flexShrink: 0, marginTop: 1,
                    }}>
                      {icon}
                    </div>
                    <p style={{ margin: 0, fontSize: 13, color: '#444', fontWeight: 500, lineHeight: 1.6 }}>
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              flex: '1 1 380px',
              background: '#fff',
              border: '4px solid #000',
              borderRadius: 20,
              padding: 'clamp(24px, 4vw, 40px)',
              boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)',
            }}
          >
            <div style={{ marginBottom: 28 }}>
              <h3 style={{
                margin: 0, fontSize: 18, fontWeight: 900,
                color: '#000', letterSpacing: '-0.03em', textTransform: 'uppercase',
              }}>
                Submit a Post
              </h3>
              <p style={{ margin: '6px 0 0', fontSize: 12, color: '#888' }}>
                Enter your name exactly as registered — we'll verify your alumni status.
              </p>
            </div>
            <PostSubmissionForm />
          </motion.div>
        </div>
      </section>

      {/* ── Alumni Modal ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedAlum && (
          <AlumniModal alum={selectedAlum} onClose={() => setSelectedAlum(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
