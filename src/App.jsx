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
import { useLocomotiveScroll } from './hooks/useLocomotiveScroll';

// --- Reusable Components ---

const Navbar = () => (
  <nav style={{
    position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100,
    padding: '16px 24px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    background: '#000',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <img src="./codebase.svg" alt="CodeBase Logo" style={{ width: 32, height: 32 }} />
      <span style={{ fontWeight: 900, fontSize: 20, letterSpacing: '-0.05em', color: '#fff' }}>CodeBase</span>
    </div>
    <div className="hidden md:flex" style={{ gap: 32, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.7)' }}>
      <a href="#home" style={{ color: 'inherit', textDecoration: 'none' }}>Home</a>
      <a href="#members" style={{ color: 'inherit', textDecoration: 'none' }}>Members</a>
      <a href="#events" style={{ color: 'inherit', textDecoration: 'none' }}>Events</a>
    </div>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        background: '#1099B7', color: '#fff', padding: '8px 24px', borderRadius: 999,
        fontWeight: 900, fontSize: 13, textTransform: 'uppercase',
        display: 'flex', alignItems: 'center', gap: 8, border: '2px solid #000',
        boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)', cursor: 'pointer',
      }}
    >
      Join Us
    </motion.button>
  </nav>
);

const ExhibitCard = ({ title, description, color, image, rotation = 0, github = '#', linkedin = '#' }) => {
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
        <div className="flex gap-4 mt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <a href={github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
            <Github size={20} className="text-white hover:text-[#ccff00] transition-colors cursor-pointer" />
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
            <Linkedin size={20} className="text-white hover:text-[#00ffff] transition-colors cursor-pointer" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// --- Team data with real images ---
const row1Members = [
  { name: "Sanidhya Madeshia", role: "Coordinator", color: "bg-[#ccff00]", img: "./2k23/sanidhya_madeshiya.jpeg", github: "#", linkedin: "#" },
  { name: "Yash Agarwal", role: "Co-Coordinator", color: "bg-[#ff00ff]", img: "./2k23/yash_agrawal.jpeg", github: "https://github.com/yashag710", linkedin: "https://www.linkedin.com/in/yash-agarwalcr710/" },
  { name: "Harsh Raj", role: "Core Member", color: "bg-white", img: "./2k23/abhishek_raj.jpeg", github: "https://github.com/HarshRaj29004", linkedin: "https://www.linkedin.com/in/harsh-raj-58921728b/" },
  { name: "Dipesh Mundotiya", role: "Core Member", color: "bg-[#00ffff]", img: "./2k23/dipesh_mudotiya.jpeg", github: "https://github.com/dipeshmundotiya03", linkedin: "https://www.linkedin.com/in/deepesh-mundotiya/" },
  { name: "Parth Rudrawar", role: "Core Member", color: "bg-[#ccff00]", img: "./2k23/parth_rudrawar.jpeg", github: "https://github.com/parthrudrawar", linkedin: "www.linkedin.com/in/rudrawar-parth-737018283" },
  { name: "Ayush Singh", role: "Core Member", color: "bg-[#ff00ff]", img: "./2k23/ayush_singh.jpeg", github: "#", linkedin: "#" },
  { name: "Nishika", role: "Core Member", color: "bg-white", img: "./2k23/nishika.jpeg", github: "https://github.com/Royxnish", linkedin: "https://www.linkedin.com/in/nishika-roy-20865528b/" },
  { name: "Ashmit Singh", role: "Core Member", color: "bg-white", img: "./2k23/ashmit_singh.jpeg", github: "", linkedin: "https://www.linkedin.com/in/ashmit-singh-40180329b/" },
];

const row2Members = [
  { name: "Dhananjay Mangal", role: "Social Media Lead", color: "bg-[#00ffff]", img: "./2k24/dhananjay_mangal.jpeg", github: "#", linkedin: "#" },
  { name: "Akarsh Bibhaw", role: "UI/Ux Lead", color: "bg-[#00ffff]", img: "./2k24/akarsh_bibhaw.jpeg", github: "#", linkedin: "#" },
  { name: "Raghav Gupta", role: "App Development Lead", color: "bg-[#ccff00]", img: "./2k24/raghav_gupta.jpeg", github: "https://github.com/raghavgupta000001", linkedin: "https://www.linkedin.com/in/raghav-gupta-5192a6306/" },
  { name: "Ayush Mittal", role: "Web 3 Lead", color: "bg-[#ff00ff]", img: "./2k24/ayush_mittal.jpeg", github: "https://github.com/AayushM0", linkedin: "https://www.linkedin.com/in/aayush-mittal-5997ba31b" },
  { name: "Divyam Saraf", role: "Web Development Lead", color: "bg-white", img: "./2k24/divyam_saraf.jpeg", github: "https://github.com/Divyam0207914", linkedin: "https://www.linkedin.com/in/divyam-saraf-9a2057318/" },
  { name: "Gaurav Patil", role: "Cloud Lead", color: "bg-[#00ffff]", img: "./2k24/gaurav_patil.jpeg", github: "https://github.com/devGPP23", linkedin: "https://www.linkedin.com/in/gaurav-patil-4a48b528a/" },
  { name: "Megh", role: "Social Media Lead", color: "bg-[#ccff00]", img: "./2k24/megh.jpeg", github: "https://github.com/megh8055", linkedin: "https://www.linkedin.com/in/megh-kakadiya-04ab83311/" },
  { name: "Satyam Rajawat", role: "Web Development Lead", color: "bg-[#ff00ff]", img: "./2k24/satyam_rajawat.jpeg", github: "https://github.com/satyamrajawat-1", linkedin: "https://www.linkedin.com/in/satyam-rajawat-502466323/" },
  { name: "Shyam Mohan", role: "Web Development Lead", color: "bg-white", img: "./2k24/shyam_mohan.jpeg", github: "https://github.com/ShyamMohan45", linkedin: "https://www.linkedin.com/in/shyam-mohan-faujdaar-657997323/" },
  { name: "Ujjawal Sharma", role: "AI/ML Lead", color: "bg-[#00ffff]", img: "./2k24/ujjawal_sharma.jpeg", github: "#", linkedin: "#" },
];

// Seeded random rotations for cards
const cardRotations = [3, -4, 2, -3, 5, -2, 4, -5, 3, -4, 2, -3, 5, -2, 4, -5];

// ============================================================
//  PROJECTS SECTION — SCROLL-PINNED with card grow/shrink animation
// ============================================================

const projectsData = [
  { name: "Hack the Chain", img: "https://picsum.photos/seed/hackchain/800/1000", desc: "Our flagship 36-hour hackathon bringing coders, designers, and innovators together." },
  { name: "Open Source Day", img: "https://picsum.photos/seed/opensource/800/1000", desc: "A day dedicated to contributing to open source projects and celebrating FOSS." },
  { name: "Code Sprint", img: "https://picsum.photos/seed/codesprint/800/1000", desc: "Rapid-fire coding challenges that push your problem-solving skills to the limit." },
  { name: "Tech Talk Series", img: "https://picsum.photos/seed/techtalk/800/1000", desc: "Industry professionals and alumni sharing cutting-edge insights." },
  { name: "Workshop Week", img: "https://picsum.photos/seed/workshop/800/1000", desc: "Hands-on sessions covering everything from web dev to machine learning." },
];

function ProjectsSection() {
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

  const N = projectsData.length;
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeInOut = (x) => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;

  // --- Animation Phases ---
  // 0.00 - 0.06: Title "Our Projects" visible
  // 0.06 - 0.12: Title fades, first card grows up from bottom
  // 0.12 - 0.90: Project transitions (N-1 transitions)
  // 0.90 - 1.00: Section unpins

  const titleOpacity = progress < 0.06 ? 1 : progress < 0.10 ? 1 - (progress - 0.06) / 0.04 : 0;

  // First card grow from bottom
  const firstGrow = progress < 0.06 ? 0 : progress < 0.12 ? (progress - 0.06) / 0.06 : 1;
  const firstGrowEased = easeInOut(firstGrow);

  // Continuous index across projects
  const projStart = 0.12;
  const projEnd = 0.90;
  const rawIdx = progress <= projStart ? 0
    : progress >= projEnd ? N - 1
      : ((progress - projStart) / (projEnd - projStart)) * (N - 1);

  const stepIdx = Math.min(Math.floor(rawIdx), N - 2);
  const t = Math.max(0, Math.min(1, rawIdx - stepIdx));
  const et = easeInOut(t);

  // Position presets (% of viewport)
  const BIG = { x: 38, y: 53, w: 50, h: 80 };
  const PREV = { x: 18, y: 13, w: 9, h: 16 };
  const NEXT = { x: 80, y: 80, w: 14, h: 24 };

  // Get visual state for each card
  const getCardState = (i) => {
    // Before transitions: first card growing phase
    if (progress < projStart) {
      if (i === 0) {
        return {
          x: BIG.x, y: lerp(110, BIG.y, firstGrowEased),
          w: lerp(14, BIG.w, firstGrowEased), h: lerp(24, BIG.h, firstGrowEased),
          opacity: firstGrow > 0 ? 1 : 0, radius: 24, zIndex: 5,
        };
      }
      // Next card preview appears near end of grow phase
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

    // During transitions
    if (i === stepIdx) {
      // Current big → shrinks to prev (top-left)
      return {
        x: lerp(BIG.x, PREV.x, et), y: lerp(BIG.y, PREV.y, et),
        w: lerp(BIG.w, PREV.w, et), h: lerp(BIG.h, PREV.h, et),
        opacity: 1, radius: lerp(24, 16, et), zIndex: Math.round(lerp(5, 2, et)),
      };
    }
    if (i === stepIdx + 1) {
      // Next → grows to big (center)
      return {
        x: lerp(NEXT.x, BIG.x, et), y: lerp(NEXT.y, BIG.y, et),
        w: lerp(NEXT.w, BIG.w, et), h: lerp(NEXT.h, BIG.h, et),
        opacity: 1, radius: lerp(16, 24, et), zIndex: Math.round(lerp(3, 5, et)),
      };
    }
    if (i === stepIdx + 2 && et > 0.5) {
      // Next-next appears at bottom-right
      const a = (et - 0.5) / 0.5;
      return {
        x: NEXT.x, y: NEXT.y,
        w: lerp(0, NEXT.w, a), h: lerp(0, NEXT.h, a),
        opacity: a, radius: 16, zIndex: 1,
      };
    }
    if (i === stepIdx - 1) {
      // Old prev fades out
      return {
        x: PREV.x, y: PREV.y, w: PREV.w, h: PREV.h,
        opacity: Math.max(0, 1 - et * 3), radius: 16, zIndex: 1,
      };
    }
    return null;
  };

  // Current description text (for the big card)
  const descIdx = Math.min(Math.round(rawIdx), N - 1);
  const descOpacity = progress < projStart ? firstGrow
    : progress > projEnd ? 0
      : (t < 0.2 || t > 0.8) ? 1 : Math.max(0, 1 - Math.abs(t - 0.5) * 0.5);

  return (
    <div
      id="events"
      ref={containerRef}
      style={{ position: 'relative', height: '600vh', background: '#f0edd4' }}
    >
      <div style={{
        position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden',
      }}>
        {/* Section label — bottom left */}
        <div style={{
          position: 'absolute', bottom: 30, left: 40, zIndex: 10,
        }}>
          <span style={{
            fontSize: 12, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.15em', color: '#888',
          }}>
            Our Events
          </span>
        </div>

        {/* Title — centered */}
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

        {/* Project Cards */}
        {projectsData.map((project, i) => {
          const state = getCardState(i);
          if (!state || state.opacity <= 0.01) return null;

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${state.x}%`,
                top: `${state.y}%`,
                width: `${state.w}vw`,
                height: `${state.h}vh`,
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
              {/* Name overlay on big card */}
              {state.w > 30 && (
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '40px 30px 30px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                }}>
                  <h3 style={{
                    fontSize: 'clamp(18px, 2.5vw, 32px)',
                    fontWeight: 900, color: '#fff', textTransform: 'uppercase',
                    letterSpacing: '-0.03em', margin: 0,
                  }}>
                    {project.name}
                  </h3>
                </div>
              )}
            </div>
          );
        })}

        {/* Description text — right side */}
        {progress >= 0.10 && progress < projEnd && (
          <div style={{
            position: 'absolute',
            right: '5%',
            top: '42%',
            transform: 'translateY(-50%)',
            maxWidth: 240,
            opacity: descOpacity,
            zIndex: 8,
            transition: 'opacity 0.3s ease',
          }}>
            <p style={{
              fontSize: 16, lineHeight: 1.7, color: '#555',
              fontWeight: 500, margin: 0,
            }}>
              {projectsData[descIdx].desc}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

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

  // ---- Animation Phases (container = 800vh) ----
  // 0.00 - 0.03: Title fully visible
  // 0.03 - 0.42: Row 1 sweeps RIGHT → LEFT
  // 0.42 - 0.46: Short 4% pause (≈32vh) — screen is clean and empty
  // 0.46 - 0.86: Row 2 sweeps LEFT → RIGHT
  //              Row 2 starts at translateX -3500 so ALL 10 cards
  //              (≈3300px total) are fully off-screen left from frame 1
  // 0.86 - 0.93: Ending message fades in
  // 0.93 - 1.00: Section unpins

  // --- Title ---
  const titleOpacity = progress < 0.12
    ? 1
    : progress < 0.20
      ? 1 - (progress - 0.12) / 0.08
      : 0;

  // --- Row 1: right → left (0.03 → 0.42) ---
  const row1Progress = progress < 0.03 ? 0 : progress < 0.42 ? (progress - 0.03) / 0.39 : 1;
  const row1X = 2600 - row1Progress * 5200; // +2600 → -2600

  const row1Opacity = progress < 0.03 ? 0
    : progress < 0.07 ? (progress - 0.03) / 0.04  // fade in as first card peeks
      : progress < 0.38 ? 1
        : progress < 0.42 ? 1 - (progress - 0.38) / 0.04  // crisp exit
          : 0;

  // --- Row 2: left → right (0.46 → 0.86) ---
  // Starting translateX = -3500 ensures ALL 10 cards (≈3300px total width)
  // are completely off-screen left at t=0, so the very first visible moment
  // is the leftmost card peeking in from the left edge — no ghost fade.
  const row2Progress = progress < 0.46 ? 0 : progress < 0.86 ? (progress - 0.46) / 0.40 : 1;
  const row2X = -3500 + row2Progress * 6800; // -3500 → +3300

  // No fade-in: opacity jumps straight to 1 when row2 phase starts.
  // Cards are off-screen at that moment so nothing is visible yet;
  // they slide in physically from the left — clean, no ghost effect.
  const row2Opacity = progress < 0.46 ? 0
    : progress < 0.82 ? 1
      : progress < 0.86 ? 1 - (progress - 0.82) / 0.04  // crisp exit
        : 0;

  // --- Ending message ---
  // Heading sits BEHIND the cards (zIndex 3, cards are at 5).
  // Opacity builds from 0.70 → 0.86 so it reaches full opacity BEFORE
  // the last card has finished crossing — the card acts as a curtain:
  // when it sweeps off the right edge it fully reveals the heading.
  const endingOpacity = progress < 0.70 ? 0
    : progress < 0.86 ? (progress - 0.70) / 0.16
      : 1;

  // Dynamic card rotation: base + scroll-driven sweep + per-card offset
  const getCardRotation = (index, rowProgress, baseRotations) => {
    const base = baseRotations[index % baseRotations.length];
    // Sweep oscillates as cards fly through the viewport
    const sweep = Math.sin(rowProgress * Math.PI * 2 + index * 0.8) * 5;
    const wobble = Math.cos(rowProgress * Math.PI * 3 + index * 1.2) * 2;
    return base + sweep + wobble;
  };

  return (
    <div
      id="members"
      ref={containerRef}
      style={{
        position: 'relative',
        height: '800vh',   /* ← increased from 500vh: more scroll distance = slower, cinematic feel */
        background: '#f5f5f5',
      }}
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Title — centered in viewport */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: titleOpacity,
          zIndex: 2,
          pointerEvents: 'none',
        }}>
          <h2 style={{
            fontSize: 'clamp(40px, 7vw, 100px)',
            fontWeight: 900,
            lineHeight: 0.95,
            textTransform: 'uppercase',
            letterSpacing: '-0.05em',
            color: '#000',
            margin: 0,
            textAlign: 'center',
          }}>
            Meet the <br />
            <span style={{ color: '#1099B7' }}>CodeBase    </span>
            <span style={{ color: '#000' }}>Team</span>
          </h2>
        </div>

        {/* Row 1: 2k23 batch — enters from right, exits left */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex',
          alignItems: 'center',
          opacity: row1Opacity,
          zIndex: 5,
          pointerEvents: row1Opacity > 0 ? 'auto' : 'none',
        }}>
          <div style={{
            display: 'flex',
            gap: 32,
            padding: '0 40px',
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

        {/* Row 2: 2k24 batch — enters from RIGHT (same direction as Row 1) */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex',
          alignItems: 'center',
          opacity: row2Opacity,
          zIndex: 5,
          pointerEvents: row2Opacity > 0 ? 'auto' : 'none',
        }}>
          <div style={{
            display: 'flex',
            gap: 32,
            padding: '0 40px',
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

        {/* Ending message — zIndex 3 (BEHIND the card rows at z-index 5).
              Opacity builds while the last cards are still passing over it,
              so when the final card sweeps off the right edge it uncovers
              the heading like a curtain being pulled away. */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: endingOpacity,
          zIndex: 3,
          pointerEvents: 'none',
          padding: '0 24px',
        }}>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 72px)',
            fontWeight: 900,
            lineHeight: 1.05,
            textTransform: 'uppercase',
            letterSpacing: '-0.04em',
            color: '#000',
            margin: 0,
            textAlign: 'center',
            maxWidth: 900,
          }}>
            You've met the minds.<br />
            <span style={{ color: '#1099B7' }}>Now join the action.</span>
          </h2>
          <p style={{
            fontSize: 'clamp(14px, 1.5vw, 20px)',
            color: '#444',
            textAlign: 'center',
            maxWidth: 600,
            marginTop: 24,
            fontWeight: 500,
            lineHeight: 1.6,
          }}>
            From late-night hackathons to skill-building workshops,
            we're always building something new.
          </p>
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
      id="home"
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
            IIIT kota
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
            <span style={{ color: '#1099B7' }}>Code</span>
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
            The Free and Open Source Club of IIIT Kota.<br />
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
        </div>

      </div>
      {/* end sticky viewport */}
    </div>
  );
}

// --- Main App ---

export default function App() {
  // Initialize Locomotive Scroll v5 (Lenis-based smooth scroll).
  // This wraps the native wheel/touch events with smooth inertia while
  // preserving all window.scroll events that our sticky animations rely on.
  const { scrollRef } = useLocomotiveScroll({
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

      {/* TEAM SECTION — scroll-pinned with horizontal card movement */}
      <TeamSection />

      {/* PROJECTS SECTION — scroll-pinned with card grow/shrink animation */}
      <ProjectsSection />

      {/* Footer */}
      <footer id="about" className="bg-black py-20 border-t border-white/10 overflow-hidden">
        {/* Marquee — uses CSS animation class (marquee-track) defined in index.css */}
        <div className="flex whitespace-nowrap mb-20" style={{ overflow: 'hidden' }}>
          <div
            className="marquee-track flex gap-20 items-center text-[15vw] font-black uppercase leading-none text-white/5 select-none"
          >
            <span>IIIT Kota CodeBase</span>
            <Zap size={120} />
            <span>Open Source Club</span>
            <Lightbulb size={120} />
            <span>IIIT Kota CodeBase</span>
            {/* Duplicate for seamless loop */}
            <span>IIIT Kota CodeBase</span>
            <Zap size={120} />
            <span>Open Source Club</span>
            <Lightbulb size={120} />
            <span>IIIT Kota CodeBase</span>
          </div>
        </div>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            {/* Logo + tagline — fade up on enter */}
            <div
              className="col-span-1 md:col-span-2"
              data-scroll
              data-scroll-reveal="fade-up"
              data-scroll-delay="1"
            >
              <div className="flex items-center gap-2 mb-8">
                <img src="./codebase.svg" alt="CodeBase Logo" className="w-10 h-10" />
                <span className="font-black text-3xl tracking-tighter">CodeBase</span>
              </div>
              <p className="text-white/50 max-w-sm text-lg font-bold uppercase tracking-tighter">
                The Free and Open Source Club of IIIT Kota. Building a better future through code.
              </p>
            </div>
            {/* Club links — fade up with slight delay */}
            <div
              data-scroll
              data-scroll-reveal="fade-up"
              data-scroll-delay="3"
            >
              <h4 className="font-black uppercase text-sm tracking-widest mb-6 text-[#ccff00]">Club</h4>
              <ul className="space-y-4 text-white/60 font-black uppercase tracking-tighter">
                <li><a href="#members" className="hover:text-[#ccff00]">Members</a></li>
                <li><a href="#events" className="hover:text-[#ccff00]">Events</a></li>
                <li><a href="#about" className="hover:text-[#ccff00]">About</a></li>
              </ul>
            </div>
            {/* Connect links — fade up with more delay */}
            <div
              data-scroll
              data-scroll-reveal="fade-up"
              data-scroll-delay="5"
            >
              <h4 className="font-black uppercase text-sm tracking-widest mb-6 text-[#1099B7]">Connect</h4>
              <ul className="space-y-4 text-white/60 font-black uppercase tracking-tighter">
                <li><a href="https://github.com/ikcb" className="hover:text-[#1099B7]">GitHub</a></li>
                <li><a href="https://www.linkedin.com/company/codebase-iiitkota/posts/?feedView=all" className="hover:text-[#1099B7]">LinkedIn</a></li>
                <li><a href="https://www.instagram.com/iiitkota_codebase?igsh=MXNiMjc3dmJneXQybQ==" className="hover:text-[#1099B7]">Instagram</a></li>
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