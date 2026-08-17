import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Github, Linkedin, Twitter, Building2, MapPin, Calendar, Code2, Briefcase, User } from 'lucide-react';

export function AlumniModal({ alum, onClose }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!alum) return null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        id="alumni-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 16px',
        }}
      >
        {/* Card shell — matches ExhibitCard: cream bg, thick black border, shadow */}
        <motion.div
          id="alumni-modal-content"
          initial={{ opacity: 0, y: 48, scale: 0.93 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 48, scale: 0.93 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          onClick={(e) => e.stopPropagation()}
          ref={scrollRef}
          style={{
            background: '#f0edd4',           // same cream as events/ExhibitCard bg
            border: '4px solid #000',        // same thick border as ExhibitCard
            borderRadius: 20,
            boxShadow: '10px 10px 0px 0px rgba(0,0,0,1)', // same offset shadow
            width: '100%',
            maxWidth: 860,
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
            color: '#000',
          }}
        >
          {/* ── Header: photo left + info right ── */}
          <div style={{
            display: 'flex',
            gap: 16,
            borderRadius: '16px 16px 0 0',
            overflow: 'hidden',
            background: '#f0edd4',
            minHeight: 260,
            padding: 16,
          }}>
            {/* Left — square photo */}
            <div style={{
              position: 'relative',
              flexShrink: 0,
              width: 220,
              minHeight: 228,
              borderRadius: 12,
              overflow: 'hidden',
              background: '#222',
            }}>
              <img
                src={alum.photo}
                alt={alum.name}
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                }}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(alum.name)}&background=1099B7&color=fff&size=400`;
                }}
              />
            </div>

            {/* Right — info panel */}
            <div style={{
              flex: 1,
              padding: '16px 16px 16px 12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 12,
              background: '#f0edd4',
              borderRadius: 10,
            }}>
              {/* Batch badge */}
              <div style={{
                display: 'inline-flex',
                alignSelf: 'flex-start',
                background: 'rgba(16,153,183,0.12)',
                border: '1px solid rgba(16,153,183,0.3)',
                borderRadius: 8,
                padding: '3px 10px',
                fontSize: 10, fontWeight: 800,
                color: '#1099B7',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                BATCH '{String(alum.batch).slice(2)}
              </div>

              {/* Icon + Name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: '#1099B7',
                  border: '2px solid #000',
                  boxShadow: '2px 2px 0px 0px rgba(0,0,0,1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <User size={18} color="#000" />
                </div>
                <h2 style={{
                  margin: 0,
                  fontSize: 'clamp(22px, 3vw, 32px)',
                  fontWeight: 900,
                  color: '#000',
                  letterSpacing: '-0.04em',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                }}>
                  {alum.name}
                </h2>
              </div>

              {/* Role & Company */}
              <p style={{
                margin: 0,
                fontSize: 12, fontWeight: 700,
                color: '#555',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}>
                {alum.currentRole} · {alum.currentCompany}
              </p>

              {/* Location */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <MapPin size={12} color="#888" />
                <span style={{ fontSize: 11, color: '#777', fontWeight: 500 }}>
                  {alum.location}
                </span>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {alum.tags.map((tag) => (
                  <span key={tag} style={{
                    background: 'rgba(0,0,0,0.07)',
                    border: '1px solid rgba(0,0,0,0.14)',
                    color: '#333',
                    fontSize: 8, fontWeight: 800,
                    padding: '2px 8px', borderRadius: 100,
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                  }}>{tag}</span>
                ))}
              </div>

              {/* Social links */}
              <div style={{ display: 'flex', gap: 16, marginTop: 4 }}>
                {alum.linkedin && (
                  <a href={alum.linkedin} target="_blank" rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{ color: 'rgba(0,0,0,0.4)', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#1099B7')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(0,0,0,0.4)')}
                  ><Linkedin size={18} /></a>
                )}
                {alum.github && (
                  <a href={alum.github} target="_blank" rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{ color: 'rgba(0,0,0,0.4)', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#000')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(0,0,0,0.4)')}
                  ><Github size={18} /></a>
                )}
                {alum.twitter && (
                  <a href={alum.twitter} target="_blank" rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{ color: 'rgba(0,0,0,0.4)', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#1099B7')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(0,0,0,0.4)')}
                  ><Twitter size={18} /></a>
                )}
              </div>
            </div>
          </div>

          {/* ── Body — cream bg, dark text ── */}
          <div style={{
            padding: '32px 32px 40px',
            display: 'flex', flexDirection: 'column', gap: 32,
            background: '#f0edd4',
            borderRadius: '0 0 16px 16px',
          }}>



            {/* Bio */}
            <section>
              <SectionTitle label="About" />
              <p style={{
                margin: 0, fontSize: 14, lineHeight: 1.85,
                color: '#333', fontWeight: 400,
              }}>
                {alum.bio}
              </p>
            </section>

            {/* Journey */}
            <section>
              <SectionTitle label="Journey" icon={<Calendar size={13} />} />
              <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 8 }}>
                {alum.journey.map((step, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 20 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 20 }}>
                      <div style={{
                        width: 10, height: 10, borderRadius: '50%',
                        background: idx === 0 ? '#1099B7' : '#ccc',
                        border: `2px solid ${idx === 0 ? '#1099B7' : '#bbb'}`,
                        flexShrink: 0, marginTop: 4,
                      }} />
                      {idx < alum.journey.length - 1 && (
                        <div style={{
                          width: 1, flex: 1,
                          background: '#ddd',
                          margin: '4px 0', minHeight: 24,
                        }} />
                      )}
                    </div>
                    <div style={{ paddingBottom: 24, flex: 1 }}>
                      <span style={{
                        display: 'inline-block',
                        fontSize: 10, fontWeight: 800,
                        color: '#1099B7', letterSpacing: '0.06em',
                        textTransform: 'uppercase', marginBottom: 4,
                      }}>{step.year}</span>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 3 }}>
                        {step.title}
                      </div>
                      <div style={{ fontSize: 12, color: '#555', lineHeight: 1.6 }}>
                        {step.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Tech Stack */}
            <section>
              <SectionTitle label="Tech Stack" icon={<Code2 size={13} />} />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {alum.techStack.map((tech) => (
                  <span key={tech} style={{
                    background: 'rgba(0,0,0,0.07)',
                    border: '1px solid rgba(0,0,0,0.15)',
                    color: '#222',
                    fontSize: 11, fontWeight: 700,
                    padding: '5px 12px', borderRadius: 8,
                    fontFamily: 'monospace',
                    letterSpacing: '0.02em',
                  }}>{tech}</span>
                ))}
              </div>
            </section>

            {/* Companies */}
            <section>
              <SectionTitle label="Companies" icon={<Briefcase size={13} />} />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {alum.companies.map((company) => (
                  <div key={company.name} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    background: 'rgba(0,0,0,0.05)',
                    border: '1px solid rgba(0,0,0,0.12)',
                    borderRadius: 12, padding: '10px 16px',
                  }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: 7,
                      overflow: 'hidden', background: '#e8e4cd', flexShrink: 0,
                    }}>
                      <img
                        src={`https://logo.clearbit.com/${company.name.toLowerCase().replace(/\s+/g, '')}.com`}
                        alt={company.name}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=e8e4cd&color=1099B7&size=64&bold=true`;
                        }}
                      />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#222' }}>
                      {company.name}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Close button */}
          <button
            id="alumni-modal-close"
            onClick={onClose}
            style={{
              position: 'absolute', top: 16, right: 16, zIndex: 20,
              background: 'rgba(0,0,0,0.65)',
              border: '2px solid #000',
              borderRadius: '50%',
              width: 36, height: 36,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#fff',
              boxShadow: '2px 2px 0px 0px rgba(0,0,0,1)',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.9)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.65)')}
          >
            <X size={16} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function SectionTitle({ label, icon }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      marginBottom: 14,
    }}>
      {icon && <span style={{ color: '#1099B7' }}>{icon}</span>}
      <h4 style={{
        margin: 0, fontSize: 10, fontWeight: 900,
        textTransform: 'uppercase', letterSpacing: '0.18em',
        color: '#888',
      }}>{label}</h4>
      <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.12)' }} />
    </div>
  );
}
