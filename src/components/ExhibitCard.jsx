import { motion } from 'motion/react';
import { User, Github, Linkedin } from 'lucide-react';

/**
 * ExhibitCard — Team member card with hover reveal for social links.
 *
 * Props:
 *   title       — member name
 *   description — role / position
 *   color       — Tailwind bg class for the avatar dot (e.g. "bg-[#ccff00]")
 *   image       — src for the member photo
 *   rotation    — CSS rotate value in degrees (scroll-driven wobble)
 *   github      — GitHub profile URL
 *   linkedin    — LinkedIn profile URL
 */
export const ExhibitCard = ({
  title,
  description,
  color,
  image,
  rotation = 0,
  github = '#',
  linkedin = '#',
}) => (
  <motion.div
    whileHover={{ scale: 1.05, zIndex: 10 }}
    style={{ rotate: rotation }}
    className="relative group cursor-pointer bg-black border-4 border-black rounded-2xl overflow-hidden w-75 h-100 shrink-0 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
  >
    {/* Member photo */}
    <img
      src={image}
      alt={title}
      className="absolute inset-0 w-full h-full object-cover opacity-100 transition-all duration-500 z-0"
      referrerPolicy="no-referrer"
      onError={(e) => {
        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(title)}&background=random&color=fff&size=400`;
      }}
    />

    {/* Dark gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 pointer-events-none" />

    {/* Card footer */}
    <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
      {/* Avatar dot */}
      <div className={`w-10 h-10 rounded-full mb-3 flex items-center justify-center ${color} border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
        <User size={20} className="text-black" />
      </div>

      <h3 className="text-2xl font-black text-white mb-1 uppercase leading-none tracking-tighter drop-shadow-md">
        {title}
      </h3>
      <p className="text-white/90 text-xs leading-tight font-bold uppercase drop-shadow-sm">
        {description}
      </p>

      {/* Social links — revealed on hover */}
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
