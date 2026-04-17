import { motion } from 'motion/react';

export const Navbar = () => (
  <nav style={{
    position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100,
    padding: '16px 24px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    background: '#000',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <img src="./codebase.svg" alt="CodeBase Logo" style={{ width: 32, height: 32 }} />
      <span style={{ fontWeight: 900, fontSize: 20, letterSpacing: '-0.05em', color: '#fff' }}>
        CodeBase
      </span>
    </div>

    <div
      className="hidden md:flex"
      style={{
        gap: 32, fontSize: 12, fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.15em',
        color: 'rgba(255,255,255,0.7)',
      }}
    >
      <a href="#home"    style={{ color: 'inherit', textDecoration: 'none' }}>Home</a>
      <a href="#members" style={{ color: 'inherit', textDecoration: 'none' }}>Members</a>
      <a href="#events"  style={{ color: 'inherit', textDecoration: 'none' }}>Events</a>
    </div>

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        background: '#1099B7', color: '#fff', padding: '8px 24px', borderRadius: 999,
        fontWeight: 900, fontSize: 13, textTransform: 'uppercase',
        display: 'flex', alignItems: 'center', gap: 8,
        border: '2px solid #000',
        boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
        cursor: 'pointer',
      }}
    >
      Join Us
    </motion.button>
  </nav>
);
