
import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
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
  Bitcoin,
  Euro
} from 'lucide-react';

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-black/50 backdrop-blur-md border-b border-white/10">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-[#ccff00] rounded-full flex items-center justify-center">
        <span className="text-black font-black text-xl">C</span>
      </div>
      <span className="font-black text-xl tracking-tighter text-white">CodeBase</span>
    </div>
    <div className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest text-white/70">
      <a href="#" className="hover:text-white transition-colors">Members</a>
      <a href="#" className="hover:text-white transition-colors">Projects</a>
      <a href="#" className="hover:text-white transition-colors">Events</a>
    </div>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-[#ff00ff] text-white px-6 py-2 rounded-full font-black text-sm uppercase flex items-center gap-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
    >
      Join Us <Zap size={16} />
    </motion.button>
  </nav>
);

const FloatingIcon = ({ children, delay = 0, className = "" }) => (
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
    className={`absolute z-30 ${className}`}
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
      {/* Image Layer */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover opacity-100 transition-all duration-500 z-0"
        referrerPolicy="no-referrer"
        onError={(e) => {
          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(title)}&background=random&color=fff&size=400`;
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent z-10 pointer-events-none" />

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

const HorizontalScrollRow = ({ direction = 1, speed = 1 }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Tie horizontal movement to the section's visibility in viewport
  const xTranslation = useTransform(
    scrollYProgress,
    [0, 1],
    [direction * 600 * speed, direction * -600 * speed]
  );

  const x = useSpring(xTranslation, { stiffness: 100, damping: 30 });

  const members = [
    { name: "Sanidhya Madeshia", role: "Coordinator", color: "bg-[#ccff00]", img: "https://picsum.photos/seed/sanidhya/300/400" },
    { name: "Yash Agarwal", role: "Co-Coordinator", color: "bg-[#ff00ff]", img: "https://picsum.photos/seed/yash/300/400" },
    { name: "Ayush Kumar", role: "Codebase Member", color: "bg-white", img: "https://picsum.photos/seed/ayush/300/400" },
    { name: "Dipesh Mundotiya", role: "Codebase Member", color: "bg-[#00ffff]", img: "https://picsum.photos/seed/dipesh/300/400" },
    { name: "Harsh Raj", role: "Codebase Member", color: "bg-[#ccff00]", img: "https://picsum.photos/seed/harsh/300/400" },
    { name: "Ashmit Singh", role: "Codebase Member", color: "bg-[#ff00ff]", img: "https://picsum.photos/seed/ashmit/300/400" },
    { name: "Rudrawar Parth", role: "Codebase Member", color: "bg-white", img: "https://picsum.photos/seed/parth/300/400" },
    { name: "Nishika Roy", role: "Codebase Member", color: "bg-[#00ffff]", img: "https://picsum.photos/seed/nishika/300/400" },
    { name: "Gaurav Patil", role: "Cloud Lead", color: "bg-[#ccff00]", img: "https://picsum.photos/seed/gaurav/300/400" },
  ];

  return (
    <div ref={containerRef} className="overflow-hidden py-10">
      <motion.div
        style={{ x }}
        className="flex gap-8 px-10"
      >
        {members.map((member, i) => (
          <ExhibitCard
            key={i}
            title={member.name}
            description={member.role}
            color={member.color}
            image={member.img}
            rotation={direction * (i % 2 === 0 ? 2 : -2)}
          />
        ))}
        {/* Duplicate for seamless feel */}
        {members.map((member, i) => (
          <ExhibitCard
            key={`dup-${i}`}
            title={member.name}
            description={member.role}
            color={member.color}
            image={member.img}
            rotation={direction * (i % 2 === 0 ? 2 : -2)}
          />
        ))}
      </motion.div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  // 1. The new ref for the extended scroll container
  const scrollContainerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"]
  });

  // 2. Parallax transforms (kept from your original code)
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  // 3. New Transforms for the MoMoney transition effect
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const svgY = useTransform(scrollYProgress, [0, 0.15, 0.75], ["0vh", "0vh", "62vh"]);
const svgScale = useTransform(scrollYProgress, [0, 0.15, 0.75], [1, 1, 6]);
const svgOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <div className="bg-black text-white font-sans selection:bg-[#ccff00] selection:text-black min-h-screen overflow-x-hidden">
      <Navbar />

      {/* --- NEW HERO SCROLL CONTAINER --- */}
      {/* h-[250vh] gives us the "blank page" scroll time */}
      <div ref={scrollContainerRef} className="relative h-[250vh] bg-black">
        
        {/* The Sticky Viewport */}
        <section className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
          
          {/* Parallax Background Elements */}
          <motion.div style={{ y: y1, rotate }} className="absolute top-1/4 left-10 opacity-20 z-0">
            <Zap size={300} className="text-[#ccff00]" />
          </motion.div>
          <motion.div style={{ y: y2, rotate: -45 }} className="absolute bottom-1/4 right-10 opacity-20 z-0">
            <Lightbulb size={400} className="text-[#ff00ff]" />
          </motion.div>

          {/* Floating Icons */}
          <FloatingIcon className="top-1/3 left-[15%] text-[#ff00ff]">
            <div className="p-4 bg-[#ff00ff] rounded-2xl rotate-12 shadow-[0_0_30px_rgba(255,0,255,0.5)] border-4 border-black">
              <Zap size={48} className="text-black" />
            </div>
          </FloatingIcon>
          <FloatingIcon delay={1} className="top-1/4 right-[20%] text-[#ccff00]">
            <div className="p-4 bg-[#ccff00] rounded-full -rotate-12 shadow-[0_0_30px_rgba(204,255,0,0.5)] border-4 border-black">
              <Smile size={48} className="text-black" />
            </div>
          </FloatingIcon>

          {/* Center Content */}
          {/* Added h-full and gap-8 to manage spacing better */}
          <div className="container mx-auto px-6 relative z-20 h-full flex flex-col items-center justify-center pt-20">

            {/* --- THE TEXT & IMAGE SANDWICH --- */}
            {/* mb-12 explicitly pushes the paragraph down away from the giant text */}
            <div className="relative flex flex-col items-center justify-center w-full mb-12 md:mb-20">

              {/* 1. TOP TEXT: IIIT Kota (Z-Index 0 - BEHIND THE IMAGE) */}
              <motion.div
                style={{ opacity: textOpacity }}
                className="relative z-0 pointer-events-none"
              >
                {/* Changed leading-[0.85] to leading-none to prevent bounding box collapse */}
                <h1 className="text-[14vw] md:text-[10vw] font-black leading-none tracking-tighter uppercase drop-shadow-xl m-0">
                  IIIT Kota
                </h1>
              </motion.div>

              {/* 2. THE IMAGE (Z-Index 10 - IN THE MIDDLE) */}
              <motion.div
                style={{
                  y: svgY,
                  scale: svgScale,
                  opacity: svgOpacity,
                }}
                className="absolute top-[60%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-56 md:h-56 z-10 -rotate-30"
              >
                {/* I increased the w/h slightly to match the scale of your screenshot */}
                <img src="./hackthechain.svg" alt="HackTheChain Logo" className="w-full h-full object-contain" />
              </motion.div>

              {/* 3. BOTTOM TEXT: CodeBase (Z-Index 20 - IN FRONT OF THE IMAGE) */}
              <motion.div
                style={{ opacity: textOpacity }}
                className="relative z-20 pointer-events-none mt-2 md:mt-4"
              >
                <h1 className="text-[15vw] md:text-[11vw] font-black leading-none tracking-tighter uppercase drop-shadow-xl m-0">
                  <span className="text-[#ccff00]">Code</span>
                  <span className="relative">
                    Base
                    <motion.div
                      className="absolute -bottom-2 left-0 w-full h-4 bg-[#ff00ff] -z-10"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.5, duration: 1 }}
                    />
                  </span>
                </h1>
              </motion.div>

            </div>

            {/* --- SUBTITLE & BUTTON (NORMAL FLOW) --- */}
            {/* Removed from the sandwich div so it obeys normal CSS flow rules */}
            <motion.div 
              style={{ opacity: textOpacity }} 
              className="relative z-30 flex flex-col items-center gap-8 w-full max-w-3xl"
            >
              <p className="text-sm md:text-xl text-white/80 font-black uppercase tracking-widest leading-relaxed text-center">
                The Free and Open Source Society of IIIT Kota. <br className="hidden md:block"/> Promoting open source development and coding culture.
              </p>

              {/* Button wrapper needs pointer-events-auto so you can click it while the motion div might be intercepting */}
              <div className="pointer-events-auto mt-4">
                <button className="bg-white text-black px-8 py-4 md:px-10 md:py-5 rounded-full font-black text-sm md:text-lg uppercase hover:bg-[#ccff00] transition-colors flex items-center gap-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(204,255,0,1)]">
                  Explore Projects <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>

          </div>

          {/* Scroll Indicator */}
          <motion.div
            style={{ opacity: textOpacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#ccff00]">Scroll Down</span>
            <div className="w-0.5 h-12 bg-linear-to-b from-[#ccff00] to-transparent rounded-full" />
          </motion.div>

        </section>
      </div>

      <div className="relative h-[60vh] bg-black z-30" />

      {/* --- HORIZONTAL SCROLL SECTION (TEAM) --- */}
      {/* Added z-40 and relative to ensure it scrolls cleanly OVER the giant scaled SVG */}
      <section className="py-32 bg-white text-black relative overflow-hidden border-y-8 border-black z-40">
        <div className="container mx-auto px-6 mb-16 relative z-10">
          <h2 className="text-6xl md:text-8xl font-black leading-none uppercase tracking-tighter">
            Meet the <br />
            <span className="text-[#ff00ff] drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">CodeBase Team</span>
          </h2>
        </div>

        {/* Row 1: Right to Left */}
        <HorizontalScrollRow direction={1} speed={1.2} />

        {/* Row 2: Left to Right */}
        <HorizontalScrollRow direction={-1} speed={0.8} />

        {/* Floating elements in background */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
          <div className="grid grid-cols-6 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-white/20" />
            ))}
          </div>
        </div>
      </section>

      {/* Game Section */}
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
            <FloatingIcon className="-top-10 -right-10">
              <div className="bg-black text-[#ccff00] p-4 rounded-full font-black text-2xl border-4 border-white shadow-xl">FOSS</div>
            </FloatingIcon>
            <FloatingIcon delay={0.5} className="-bottom-5 -left-10">
              <div className="bg-white text-black p-4 rounded-full font-black text-2xl border-4 border-black shadow-xl">CODE</div>
            </FloatingIcon>
          </motion.div>

          <button className="bg-black text-white px-12 py-6 rounded-full font-black text-xl uppercase hover:scale-105 transition-transform border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
            Join the Community
          </button>
        </div>
      </section>

      {/* Footer / Marquee */}
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
