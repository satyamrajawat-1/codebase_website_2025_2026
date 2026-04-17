import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/**
 * Footer — full-width site footer with a scroll-reactive marquee.
 *
 * Marquee behaviour:
 *   - Driven by requestAnimationFrame (not CSS animation), so direction can
 *     flip in-place without any restart or visual glitch.
 *   - Scroll DOWN → marquee moves LEFT  (ArrowLeft  icons)
 *   - Scroll UP   → marquee moves RIGHT (ArrowRight icons)
 *   - Position is always in the range [-singleWidth, 0) so the two-copy loop
 *     is seamless in both directions.
 */

const SPEED = 1.4; // px per frame @ 60 fps

export const Footer = () => {
  const trackRef      = useRef(null);
  const posRef        = useRef(0);          // current translateX in px
  const dirRef        = useRef(-1);         // -1 = left  | +1 = right
  const rafRef        = useRef(null);
  const lastScrollY   = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const singleWidthRef = useRef(0);

  // Only used to re-render the arrow icon; direction state itself lives in dirRef
  const [goingLeft, setGoingLeft] = useState(true);

  useEffect(() => {
    /* ── Animation loop ─────────────────────────────────────── */
    const tick = () => {
      const track = trackRef.current;
      if (!track) { rafRef.current = requestAnimationFrame(tick); return; }

      // Measure the single-copy width once (two identical copies are rendered)
      if (!singleWidthRef.current) {
        singleWidthRef.current = track.scrollWidth / 2;
      }

      const sw = singleWidthRef.current;
      posRef.current += SPEED * dirRef.current;

      // Seamless loop: keep position in [-sw, 0)
      if (posRef.current <= -sw) posRef.current += sw;
      if (posRef.current >= 0)   posRef.current -= sw;

      track.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    /* ── Scroll direction detector ───────────────────────────── */
    const onScroll = () => {
      const y     = window.scrollY;
      const delta = y - lastScrollY.current;
      lastScrollY.current = y;

      if (Math.abs(delta) < 2) return;          // ignore micro-jitter

      const newDir = delta > 0 ? -1 : 1;        // down → left, up → right
      if (newDir !== dirRef.current) {
        dirRef.current = newDir;
        setGoingLeft(newDir === -1);             // trigger arrow re-render
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Arrow icon faces the direction the marquee is moving
  const Arrow = goingLeft ? ArrowLeft : ArrowRight;

  // Single copy of the repeating content (rendered twice for the seamless loop)
  const Track = (
    <span className="flex gap-12 items-center shrink-0 pr-12">
      <span>IIIT Kota CodeBase</span>
      <Arrow size={72} className="text-white shrink-0" />
      <span>development community</span>
      <Arrow size={72} className="text-white shrink-0" />
    </span>
  );

  return (
    <footer id="about" className="bg-black py-20 border-t border-white/10 overflow-hidden">

      {/* ── Scroll-reactive marquee ─────────────────────────── */}
      <div className="overflow-hidden mb-20 whitespace-nowrap">
        <div
          ref={trackRef}
          className="inline-flex text-[10vw] font-black uppercase leading-none text-white select-none"
          style={{ willChange: 'transform' }}
        >
          {/* Two identical copies so the loop is seamless in both directions */}
          {Track}
          {Track}
        </div>
      </div>

      {/* ── Links grid ──────────────────────────────────────── */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">

          {/* Logo + tagline */}
          <div className="col-span-1 md:col-span-2" data-scroll data-scroll-reveal="fade-up" data-scroll-delay="1">
            <div className="flex items-center gap-2 mb-8">
              <img src="./codebase.svg" alt="CodeBase Logo" className="w-10 h-10" />
              <span className="font-black text-3xl tracking-tighter">CodeBase</span>
            </div>
            <p className="text-white/50 max-w-sm text-lg font-bold uppercase tracking-tighter">
             The core development community of IIIT Kota. Focused on real-world engineering and technical mastery.
            </p>
          </div>

          {/* Club links */}
          <div data-scroll data-scroll-reveal="fade-up" data-scroll-delay="3">
            <h4 className="font-black uppercase text-sm tracking-widest mb-6 text-[#ccff00]">Club</h4>
            <ul className="space-y-4 text-white/60 font-black uppercase tracking-tighter">
              <li><a href="#members" className="hover:text-[#ccff00]">Members</a></li>
              <li><a href="#events"  className="hover:text-[#ccff00]">Events</a></li>
              <li><a href="#about"   className="hover:text-[#ccff00]">About</a></li>
            </ul>
          </div>

          {/* Connect links */}
          <div data-scroll data-scroll-reveal="fade-up" data-scroll-delay="5">
            <h4 className="font-black uppercase text-sm tracking-widest mb-6 text-[#1099B7]">Connect</h4>
            <ul className="space-y-4 text-white/60 font-black uppercase tracking-tighter">
              <li><a href="https://github.com/ikcb"                                                        className="hover:text-[#1099B7]">GitHub</a></li>
              <li><a href="https://www.linkedin.com/company/codebase-iiitkota/posts/?feedView=all"         className="hover:text-[#1099B7]">LinkedIn</a></li>
              <li><a href="https://www.instagram.com/iiitkota_codebase?igsh=MXNiMjc3dmJneXQybQ=="         className="hover:text-[#1099B7]">Instagram</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 text-white/30 text-xs font-black uppercase tracking-widest">
          <p>© 2024 IIIT Kota CodeBase. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
