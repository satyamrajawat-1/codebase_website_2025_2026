import { Zap, Lightbulb } from 'lucide-react';

/**
 * Footer — full-width site footer with marquee, links, and copyright.
 * The marquee animation is driven by the CSS class `marquee-track`
 * defined in src/index.css (pure @keyframes, no JS required).
 */
export const Footer = () => (
  <footer id="about" className="bg-black py-20 border-t border-white/10 overflow-hidden">

    {/* Scrolling marquee */}
    <div className="flex whitespace-nowrap mb-20" style={{ overflow: 'hidden' }}>
      <div className="marquee-track flex gap-20 items-center text-[15vw] font-black uppercase leading-none text-white/5 select-none">
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

        {/* Logo + tagline */}
        <div className="col-span-1 md:col-span-2" data-scroll data-scroll-reveal="fade-up" data-scroll-delay="1">
          <div className="flex items-center gap-2 mb-8">
            <img src="./codebase.svg" alt="CodeBase Logo" className="w-10 h-10" />
            <span className="font-black text-3xl tracking-tighter">CodeBase</span>
          </div>
          <p className="text-white/50 max-w-sm text-lg font-bold uppercase tracking-tighter">
            The Free and Open Source Club of IIIT Kota. Building a better future through code.
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
            <li><a href="https://github.com/ikcb"                                                          className="hover:text-[#1099B7]">GitHub</a></li>
            <li><a href="https://www.linkedin.com/company/codebase-iiitkota/posts/?feedView=all"           className="hover:text-[#1099B7]">LinkedIn</a></li>
            <li><a href="https://www.instagram.com/iiitkota_codebase?igsh=MXNiMjc3dmJneXQybQ=="           className="hover:text-[#1099B7]">Instagram</a></li>
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
