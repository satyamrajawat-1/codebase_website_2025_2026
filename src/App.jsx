import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from 'motion/react';
import {
  ArrowRight,
  Smile,
  Lightbulb,
  Zap,
  User,
  Github,
  Linkedin,
  Mail,
} from 'lucide-react';

// --- Reusable Components ---

const Navbar = () => (
  <nav style={{
    position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100,
    padding: '16px 24px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{
        width: 32, height: 32, background: '#ccff00', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ color: '#000', fontWeight: 900, fontSize: 20 }}>C</span>
      </div>
      <span style={{ fontWeight: 900, fontSize: 20, letterSpacing: '-0.05em', color: '#fff' }}>CodeBase</span>
    </div>
    <div className="hidden md:flex" style={{ gap: 32, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.7)' }}>
      <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Members</a>
      <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Projects</a>
      <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Events</a>
    </div>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        background: '#ff00ff', color: '#fff', padding: '8px 24px', borderRadius: 999,
        fontWeight: 900, fontSize: 13, textTransform: 'uppercase',
        display: 'flex', alignItems: 'center', gap: 8, border: '2px solid #000',
        boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)', cursor: 'pointer',
      }}
    >
      Join Us <Zap size={16} />
    </motion.button>
  </nav>
);

const FloatingIcon = ({ children, delay = 0, style = {} }) => (
  <motion.div
    animate={{
      y: [0, -20, 0],
      rotate: [-5, 5, -5]
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }}
    style={{ position: 'absolute', zIndex: 30, ...style }}
  >
    {children}
  </motion.div>
);

const ExhibitCard = ({ title, description, color, image, rotation = 0 }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, zIndex: 10 }}
      style={{ rotate: rotation }}
      className="relative group cursor-pointer bg-black border-4 border-black rounded-2xl overflow-hidden w-75 h-100 shrink-0 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover opacity-100 transition-all duration-500 z-0"
        referrerPolicy="no-referrer"
        onError={(e) => {
          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(title)}&background=random&color=fff&size=400`;
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
        <div className={`w-10 h-10 rounded-full mb-3 flex items-center justify-center ${color} border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
          <User size={20} className="text-black" />
        </div>
        <h3 className="text-2xl font-black text-white mb-1 uppercase leading-none tracking-tighter drop-shadow-md">{title}</h3>
        <p className="text-white/90 text-xs leading-tight font-bold uppercase drop-shadow-sm">{description}</p>
        <div className="flex gap-3 mt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <Github size={18} className="text-white hover:text-[#ccff00] cursor-pointer" />
          <Linkedin size={18} className="text-white hover:text-[#00ffff] cursor-pointer" />
          <Mail size={18} className="text-white hover:text-[#ff00ff] cursor-pointer" />
        </div>
      </div>
    </motion.div>
  );
};

// --- Team data with real images ---
const row1Members = [
  { name: "Sanidhya Madeshia", role: "Coordinator", color: "bg-[#ccff00]", img: "./2k23/sanidhya_madeshiya.jpeg" },
  { name: "Yash Agarwal", role: "Co-Coordinator", color: "bg-[#ff00ff]", img: "./2k23/yash_agrawal.jpeg" },
  { name: "Abhishek Raj", role: "Codebase Member", color: "bg-white", img: "./2k23/abhishek_raj.jpeg" },
  { name: "Dipesh Mundotiya", role: "Codebase Member", color: "bg-[#00ffff]", img: "./2k23/dipesh_mudotiya.jpeg" },
  { name: "Parth Rudrawar", role: "Codebase Member", color: "bg-[#ccff00]", img: "./2k23/parth_rudrawar.jpeg" },
  { name: "Ayush Singh", role: "Codebase Member", color: "bg-[#ff00ff]", img: "./2k23/ayush_singh.jpeg" },
  { name: "Nishika", role: "Codebase Member", color: "bg-white", img: "./2k23/nishika.jpeg" },
];

const row2Members = [
  { name: "Raghav Gupta", role: "Coordinator", color: "bg-[#ccff00]", img: "./2k24/raghav_gupta.jpeg" },
  { name: "Ayush Mittal", role: "Co-Coordinator", color: "bg-[#ff00ff]", img: "./2k24/ayush_mittal.jpeg" },
  { name: "Divyam Saraf", role: "Codebase Member", color: "bg-white", img: "./2k24/divyam_saraf.jpeg" },
  { name: "Gaurav Patil", role: "Codebase Member", color: "bg-[#00ffff]", img: "./2k24/gaurav_patil.jpeg" },
  { name: "Megh", role: "Codebase Member", color: "bg-[#ccff00]", img: "./2k24/megh.jpeg" },
  { name: "Satyam Rajawat", role: "Codebase Member", color: "bg-[#ff00ff]", img: "./2k24/satyam_rajawat.jpeg" },
  { name: "Shyam Mohan", role: "Codebase Member", color: "bg-white", img: "./2k24/shyam_mohan.jpeg" },
  { name: "Ujjawal Sharma", role: "Codebase Member", color: "bg-[#00ffff]", img: "./2k24/ujjawal_sharma.jpeg" },
];

// Seeded random rotations for cards
const cardRotations = [3, -4, 2, -3, 5, -2, 4, -5, 3, -4, 2, -3, 5, -2, 4, -5];

// ============================================================
//  TEAM SECTION — SCROLL-PINNED with manual tracking
//  Row 1: cards move right→left (2k23 batch)
//  Row 2: cards move left→right (2k24 batch)
// ============================================================
function TeamSection() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollRange = containerHeight - viewportHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / scrollRange));
      setProgress(p);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation phases:
  // 0.00 - 0.05: Title visible
  // 0.05 - 0.45: Row 1 slides right→left
  // 0.45 - 0.55: Brief pause, section slides up slightly to reveal row 2
  // 0.55 - 0.95: Row 2 slides left→right
  // 0.95 - 1.00: Section unpins

  // Row 1 translateX: starts at 600px (off-screen right), ends at -1200px (off-screen left)
  const row1Progress = progress < 0.05 ? 0 : progress < 0.45 ? (progress - 0.05) / 0.40 : 1;
  const row1X = 600 - row1Progress * 1800;

  // Vertical shift between rows: moves content up to show row 2
  const verticalShift = progress < 0.45 ? 0
    : progress < 0.55 ? ((progress - 0.45) / 0.10) * -420
    : -420;

  // Row 2 translateX: starts at -1200px (off-screen left), ends at 600px (off-screen right)
  const row2Progress = progress < 0.55 ? 0 : progress < 0.95 ? (progress - 0.55) / 0.40 : 1;
  const row2X = -1200 + row2Progress * 1800;

  // Title opacity
  const titleOpacity = progress < 0.08 ? 1 : progress < 0.15 ? 1 - (progress - 0.08) / 0.07 : 0;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        height: '500vh',
        background: '#f5f5f5',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Title */}
        <div style={{
          position: 'absolute',
          top: 60,
          left: 0,
          right: 0,
          padding: '0 48px',
          opacity: titleOpacity,
          zIndex: 5,
        }}>
          <h2 style={{
            fontSize: 'clamp(40px, 7vw, 100px)',
            fontWeight: 900,
            lineHeight: 0.95,
            textTransform: 'uppercase',
            letterSpacing: '-0.05em',
            color: '#000',
            margin: 0,
          }}>
            Meet the <br />
            <span style={{ color: '#ff00ff' }}>CodeBase Team</span>
          </h2>
        </div>

        {/* Cards container — shifts up to reveal row 2 */}
        <div style={{
          transform: `translateY(${verticalShift}px)`,
          willChange: 'transform',
          transition: 'transform 0.05s linear',
        }}>
          {/* Row 1: 2k23 batch — right to left */}
          <div style={{
            display: 'flex',
            gap: 32,
            padding: '20px 40px',
            transform: `translateX(${row1X}px)`,
            willChange: 'transform',
            transition: 'transform 0.05s linear',
          }}>
            {row1Members.map((member, i) => (
              <ExhibitCard
                key={i}
                title={member.name}
                description={member.role}
                color={member.color}
                image={member.img}
                rotation={cardRotations[i % cardRotations.length]}
              />
            ))}
          </div>

          {/* Row 2: 2k24 batch — left to right */}
          <div style={{
            display: 'flex',
            gap: 32,
            padding: '20px 40px',
            marginTop: 32,
            transform: `translateX(${row2X}px)`,
            willChange: 'transform',
            transition: 'transform 0.05s linear',
          }}>
            {row2Members.map((member, i) => (
              <ExhibitCard
                key={i}
                title={member.name}
                description={member.role}
                color={member.color}
                image={member.img}
                rotation={cardRotations[(i + 3) % cardRotations.length]}
              />
            ))}
          </div>
        </div>

        {/* Background grid decoration */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          pointerEvents: 'none',
          opacity: 0.05,
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            height: '100%',
          }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ borderRight: '1px solid #000' }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
//  HERO SECTION — MANUAL SCROLL TRACKING APPROACH
//  
//  We bypass Framer Motion's useScroll for the hero because
//  it has known issues with sticky containers. Instead, we
//  use a vanilla scroll listener with refs to compute our
//  own 0→1 progress value, then drive motion values manually.
// ============================================================

function HeroSection() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      // scrollable distance = containerHeight - viewportHeight
      const scrollRange = containerHeight - viewportHeight;
      // how far the top of the container has scrolled above the viewport top
      const scrolled = -rect.top;
      // clamp to 0-1
      const p = Math.max(0, Math.min(1, scrolled / scrollRange));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ---- Derived animation values ----
  // Phase 1: Text moves up (progress 0 → 0.30)
  const textTranslateY = progress < 0.30
    ? -(progress / 0.30) * 120 // 0 to -120vh
    : -120;

  const textOpacityVal = progress < 0.05
    ? 1
    : progress < 0.25
      ? 1 - ((progress - 0.05) / 0.20)
      : 0;

  // Floating icons fade
  const iconsOpacityVal = progress < 0.15
    ? 1 - (progress / 0.15)
    : 0;

  // Scroll indicator
  const scrollIndicatorVal = progress < 0.06
    ? 1 - (progress / 0.06)
    : 0;

  // Background fades
  const bgOpacityVal = progress < 0.20
    ? 0.15 * (1 - progress / 0.20)
    : 0;

  // Phase 2: Image scales up (progress 0.25 → 0.72)
  let imageScaleVal;
  if (progress < 0.25) {
    imageScaleVal = 1;
  } else if (progress < 0.72) {
    // Map 0.25→0.72 to scale 1→2
    const t = (progress - 0.25) / (0.72 - 0.25);
    imageScaleVal = 1 + t * 1;
  } else {
    imageScaleVal = 2;
  }

  // Image rotation: starts at -30deg, straightens to 0 during progress 0→0.30
  const imageRotation = progress < 0.30
    ? -30 * (1 - progress / 0.30)
    : 0;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        height: '400vh',
        background: '#000',
      }}
    >
      {/* The Sticky Viewport — pinned to viewport during scroll */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          background: '#000',
          overflow: 'hidden',
        }}
      >
        {/* ---- Background Decorations ---- */}
        <div
          style={{
            position: 'absolute',
            top: '25%',
            left: 40,
            pointerEvents: 'none',
            opacity: bgOpacityVal,
            transform: `translateY(${-progress * 200}px)`,
            transition: 'opacity 0.1s',
          }}
        >
          <Zap size={300} style={{ color: '#ccff00' }} />
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '25%',
            right: 40,
            pointerEvents: 'none',
            opacity: bgOpacityVal,
            transform: `translateY(${progress * 200}px) rotate(-45deg)`,
            transition: 'opacity 0.1s',
          }}
        >
          <Lightbulb size={400} style={{ color: '#ff00ff' }} />
        </div>

        {/* ---- Floating Icons ---- */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: iconsOpacityVal,
          }}
        >
          <FloatingIcon style={{ top: '33%', left: '15%' }}>
            <div style={{
              padding: 16, background: '#ff00ff', borderRadius: 16,
              transform: 'rotate(12deg)',
              boxShadow: '0 0 30px rgba(255,0,255,0.5)',
              border: '4px solid #000',
            }}>
              <Zap size={48} style={{ color: '#000' }} />
            </div>
          </FloatingIcon>
          <FloatingIcon delay={1} style={{ top: '25%', right: '20%' }}>
            <div style={{
              padding: 16, background: '#ccff00', borderRadius: '50%',
              transform: 'rotate(-12deg)',
              boxShadow: '0 0 30px rgba(204,255,0,0.5)',
              border: '4px solid #000',
            }}>
              <Smile size={48} style={{ color: '#000' }} />
            </div>
          </FloatingIcon>
        </div>

        {/* ===================================================
            LAYER 1: "IIIT KOTA" — z-index: 5 (BEHIND image)
            Positioned at top-center of the viewport area
        =================================================== */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 5,
            pointerEvents: 'none',
            transform: `translateY(${textTranslateY}vh)`,
            opacity: textOpacityVal,
            willChange: 'transform, opacity',
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(60px, 10vw, 160px)',
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: '-0.05em',
              textTransform: 'uppercase',
              margin: 0,
              textAlign: 'center',
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
              color: '#fff',
              // Push up from center so it sits just above the image
              transform: 'translateY(-80px)',
            }}
          >
            IIIT Kota
          </h1>
        </div>

        {/* ===================================================
            LAYER 2: IMAGE — z-index: 10 (MIDDLE)
            Centered, scales up, starts rotated -30deg
        =================================================== */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              width: 220,
              height: 220,
              transform: `scale(${imageScaleVal}) rotate(${imageRotation}deg)`,
              willChange: 'transform',
              transition: 'transform 0.05s linear',
            }}
          >
            <img
              src="./codebase.svg"
              alt="CodeBase Logo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        </div>

        {/* ===================================================
            LAYER 3: "CODEBASE" — z-index: 15 (ABOVE image)
            Positioned just below center
        =================================================== */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 15,
            pointerEvents: 'none',
            transform: `translateY(${textTranslateY}vh)`,
            opacity: textOpacityVal,
            willChange: 'transform, opacity',
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(70px, 11vw, 180px)',
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: '-0.05em',
              textTransform: 'uppercase',
              margin: 0,
              textAlign: 'center',
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
              // Push down from center so it sits just below the image
              transform: 'translateY(80px)',
            }}
          >
            <span style={{ color: '#ccff00' }}>Code</span>
            <span style={{ color: '#fff' }}>Base</span>
          </h1>
        </div>

        {/* ===================================================
            LAYER 4: Subtitle — z-index: 5 (BEHIND image)
        =================================================== */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 5,
            pointerEvents: 'none',
            transform: `translateY(${textTranslateY}vh)`,
            opacity: textOpacityVal,
            willChange: 'transform, opacity',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(11px, 1.2vw, 20px)',
              color: 'rgba(255,255,255,0.8)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              lineHeight: 1.8,
              textAlign: 'center',
              maxWidth: 700,
              padding: '0 24px',
              // Push well below center (below CODEBASE)
              transform: 'translateY(220px)',
            }}
          >
            The Free and Open Source Society of IIIT Kota.<br />
            Promoting open source development and coding culture.
          </p>
        </div>

        {/* ===================================================
            LAYER 5: CTA Button — z-index: 15 (ABOVE image)
        =================================================== */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 15,
            transform: `translateY(${textTranslateY}vh)`,
            opacity: textOpacityVal,
            willChange: 'transform, opacity',
          }}
        >
          <div style={{ transform: 'translateY(310px)' }}>
            <button
              style={{
                background: '#fff',
                color: '#000',
                padding: '16px 40px',
                borderRadius: 999,
                fontWeight: 900,
                fontSize: 14,
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                border: '4px solid #000',
                boxShadow: '6px 6px 0px 0px rgba(204,255,0,1)',
                cursor: 'pointer',
              }}
            >
              Explore Projects <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          style={{
            opacity: scrollIndicatorVal,
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            zIndex: 30,
          }}
        >
          <span style={{
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            fontWeight: 700,
            color: '#ccff00',
          }}>
            Scroll Down
          </span>
          <div style={{
            width: 2,
            height: 48,
            background: 'linear-gradient(to bottom, #ccff00, transparent)',
            borderRadius: 999,
          }} />
        </div>

      </div>
      {/* end sticky viewport */}
    </div>
  );
}

// --- Main App ---

export default function App() {
  return (
    <div style={{
      background: '#000',
      color: '#fff',
      fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
      minHeight: '100vh',
    }}>
      <Navbar />

      <HeroSection />

      {/* TEAM SECTION — scroll-pinned with horizontal card movement */}
      <TeamSection />

      {/* Mission Section */}
      <section className="py-32 bg-[#ccff00] text-black overflow-hidden relative">
        <div className="container mx-auto px-6 flex flex-col items-center text-center relative z-10">
          <motion.div
            initial={{ rotate: -5 }}
            whileInView={{ rotate: 0 }}
            className="bg-black text-white px-6 py-2 rounded-full font-black text-sm uppercase mb-8"
          >
            Our Mission
          </motion.div>
          <h2 className="text-6xl md:text-9xl font-black uppercase leading-none tracking-tighter mb-12 text-black drop-shadow-[6px_6px_0px_rgba(255,255,255,1)]">
            Building the <br />
            Future Together
          </h2>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="relative cursor-pointer mb-12"
          >
            <div className="absolute -inset-10 bg-white/30 blur-3xl rounded-full animate-pulse" />
            <Zap size={200} strokeWidth={1} className="relative z-10 text-black" />
            <FloatingIcon style={{ top: -40, right: -40 }}>
              <div className="bg-black text-[#ccff00] p-4 rounded-full font-black text-2xl border-4 border-white shadow-xl">FOSS</div>
            </FloatingIcon>
            <FloatingIcon delay={0.5} style={{ bottom: -20, left: -40 }}>
              <div className="bg-white text-black p-4 rounded-full font-black text-2xl border-4 border-black shadow-xl">CODE</div>
            </FloatingIcon>
          </motion.div>
          <button className="bg-black text-white px-12 py-6 rounded-full font-black text-xl uppercase hover:scale-105 transition-transform border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
            Join the Community
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-20 border-t border-white/10 overflow-hidden">
        <div className="flex whitespace-nowrap mb-20">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-20 items-center text-[15vw] font-black uppercase leading-none text-white/5 select-none"
          >
            <span>IIIT Kota CodeBase</span>
            <Zap size={120} />
            <span>Open Source Society</span>
            <Lightbulb size={120} />
            <span>IIIT Kota CodeBase</span>
          </motion.div>
        </div>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-[#ccff00] rounded-full flex items-center justify-center">
                  <span className="text-black font-black text-2xl">C</span>
                </div>
                <span className="font-black text-3xl tracking-tighter">CodeBase</span>
              </div>
              <p className="text-white/50 max-w-sm text-lg font-bold uppercase tracking-tighter">
                The Free and Open Source Society of IIIT Kota. Building a better future through code.
              </p>
            </div>
            <div>
              <h4 className="font-black uppercase text-sm tracking-widest mb-6 text-[#ccff00]">Society</h4>
              <ul className="space-y-4 text-white/60 font-black uppercase tracking-tighter">
                <li><a href="#" className="hover:text-[#ccff00]">Members</a></li>
                <li><a href="#" className="hover:text-[#ccff00]">Projects</a></li>
                <li><a href="#" className="hover:text-[#ccff00]">Events</a></li>
                <li><a href="#" className="hover:text-[#ccff00]">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase text-sm tracking-widest mb-6 text-[#ff00ff]">Connect</h4>
              <ul className="space-y-4 text-white/60 font-black uppercase tracking-tighter">
                <li><a href="#" className="hover:text-[#ff00ff]">GitHub</a></li>
                <li><a href="#" className="hover:text-[#ff00ff]">LinkedIn</a></li>
                <li><a href="#" className="hover:text-[#ff00ff]">Instagram</a></li>
                <li><a href="#" className="hover:text-[#ff00ff]">Discord</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 text-white/30 text-xs font-black uppercase tracking-widest">
            <p>© 2024 IIIT Kota CodeBase. All rights reserved.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}