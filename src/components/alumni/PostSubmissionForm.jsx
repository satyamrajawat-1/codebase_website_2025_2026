import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Send, Loader2, User, Mail, FileText, Tag, Link } from 'lucide-react';
import { alumniData, DOMAIN_TAGS } from '../../data/alumniData';

const INPUT_STYLE = {
  width: '100%',
  background: '#f8f7f0',
  border: '1.5px solid rgba(0,0,0,0.18)',
  borderRadius: 10,
  padding: '12px 16px',
  color: '#111',
  fontSize: 13,
  fontWeight: 500,
  outline: 'none',
  fontFamily: 'Inter, sans-serif',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
};

const LABEL_STYLE = {
  fontSize: 11,
  fontWeight: 800,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'rgba(0,0,0,0.5)',
  marginBottom: 7,
  display: 'flex',
  alignItems: 'center',
  gap: 6,
};

export function PostSubmissionForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    title: '',
    content: '',
    tags: [],
    linkedinUrl: '',
  });
  const [status, setStatus] = useState('idle'); // idle | verifying | verified | failed | submitted
  const [verifiedAlum, setVerifiedAlum] = useState(null);
  const [nameError, setNameError] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === 'name') {
      setStatus('idle');
      setVerifiedAlum(null);
      setNameError('');
    }
  };

  const toggleTag = (tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const verifyName = () => {
    const trimmed = form.name.trim().toLowerCase();
    if (!trimmed) { setNameError('Please enter your name.'); return; }

    setStatus('verifying');
    // Simulate async backend verification
    setTimeout(() => {
      const match = alumniData.find(
        (a) => a.name.toLowerCase() === trimmed
      );
      if (match) {
        setVerifiedAlum(match);
        setStatus('verified');
        setNameError('');
      } else {
        setStatus('failed');
        setNameError('No alumni found with that exact name. Please check spelling.');
      }
    }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status !== 'verified') {
      setNameError('Please verify your name first.');
      return;
    }
    setStatus('submitted');
  };

  const resetForm = () => {
    setForm({ name: '', email: '', title: '', content: '', tags: [], linkedinUrl: '' });
    setStatus('idle');
    setVerifiedAlum(null);
    setNameError('');
  };

  const inputFocus = (field) => ({ onFocus: () => setFocusedField(field), onBlur: () => setFocusedField(null) });
  const borderColor = (field) => focusedField === field ? '#1099B7' : 'rgba(0,0,0,0.18)';

  if (status === 'submitted') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 20, padding: '60px 40px',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
        >
          <CheckCircle2 size={64} style={{ color: '#ccff00' }} />
        </motion.div>
        <h3 style={{ margin: 0, fontSize: 24, fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.03em' }}>
          Post Submitted!
        </h3>
        <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.5)', maxWidth: 360, lineHeight: 1.7 }}>
          Your article "<strong style={{ color: '#fff' }}>{form.title}</strong>" has been submitted by <strong style={{ color: '#1099B7' }}>{verifiedAlum?.name}</strong>.
          It will appear in the alumni blog after review.
        </p>
        <button
          onClick={resetForm}
          style={{
            marginTop: 10,
            background: 'transparent',
            border: '2px solid rgba(255,255,255,0.15)',
            borderRadius: 100,
            color: 'rgba(255,255,255,0.6)',
            padding: '10px 24px',
            fontSize: 12, fontWeight: 800,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            cursor: 'pointer',
          }}
        >
          Submit Another Post
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

      {/* Name + Verify */}
      <div>
        <label style={LABEL_STYLE}>
          <User size={12} style={{ color: '#1099B7' }} />
          Your Full Name <span style={{ color: '#1099B7' }}>*</span>
        </label>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            id="post-form-name"
            type="text"
            placeholder="e.g. Arjun Sharma"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); verifyName(); } }}
            style={{ ...INPUT_STYLE, flex: 1, borderColor: nameError ? '#ef4444' : borderColor('name') }}
            {...inputFocus('name')}
          />
          <motion.button
            id="post-form-verify"
            type="button"
            onClick={verifyName}
            disabled={status === 'verifying' || status === 'verified'}
            whileTap={{ scale: 0.95 }}
            style={{
              flexShrink: 0,
              background: status === 'verified' ? '#ccff00' : '#1099B7',
              color: status === 'verified' ? '#000' : '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '12px 18px',
              fontSize: 12, fontWeight: 900,
              textTransform: 'uppercase', letterSpacing: '0.08em',
              cursor: status === 'verifying' || status === 'verified' ? 'default' : 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
              opacity: status === 'verifying' ? 0.7 : 1,
              transition: 'background 0.2s',
            }}
          >
            {status === 'verifying' ? (
              <><Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} /> Verifying…</>
            ) : status === 'verified' ? (
              <><CheckCircle2 size={13} /> Verified</>
            ) : (
              'Verify'
            )}
          </motion.button>
        </div>

        <AnimatePresence>
          {nameError && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              style={{ margin: '6px 0 0', fontSize: 11, color: '#ef4444', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}
            >
              <XCircle size={11} /> {nameError}
            </motion.p>
          )}
          {status === 'verified' && verifiedAlum && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginTop: 8, padding: '8px 12px',
                background: 'rgba(204,255,0,0.08)',
                border: '1px solid rgba(204,255,0,0.2)',
                borderRadius: 8,
                display: 'flex', alignItems: 'center', gap: 10,
              }}
            >
              <img
                src={verifiedAlum.photo}
                alt={verifiedAlum.name}
                style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#ccff00' }}>✓ Verified Alumni</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginLeft: 8 }}>
                  {verifiedAlum.currentRole} @ {verifiedAlum.currentCompany} · Class of {verifiedAlum.batch}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Email */}
      <div>
        <label style={LABEL_STYLE}>
          <Mail size={12} style={{ color: '#1099B7' }} />
          Email Address
        </label>
        <input
          id="post-form-email"
          type="email"
          placeholder="yourname@example.com"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          style={{ ...INPUT_STYLE, borderColor: borderColor('email') }}
          {...inputFocus('email')}
        />
      </div>

      {/* Article Title */}
      <div>
        <label style={LABEL_STYLE}>
          <FileText size={12} style={{ color: '#1099B7' }} />
          Article Title <span style={{ color: '#1099B7' }}>*</span>
        </label>
        <input
          id="post-form-title"
          type="text"
          placeholder="e.g. How I Cracked My Dream Company"
          value={form.title}
          onChange={(e) => handleChange('title', e.target.value)}
          required
          style={{ ...INPUT_STYLE, borderColor: borderColor('title') }}
          {...inputFocus('title')}
        />
      </div>

      {/* Article Content */}
      <div>
        <label style={LABEL_STYLE}>
          <FileText size={12} style={{ color: '#1099B7' }} />
          Article Content <span style={{ color: '#1099B7' }}>*</span>
        </label>
        <textarea
          id="post-form-content"
          placeholder="Share your experience, advice, or insights with the CodeBase community…"
          value={form.content}
          onChange={(e) => handleChange('content', e.target.value)}
          required
          rows={6}
          style={{
            ...INPUT_STYLE,
            resize: 'vertical',
            lineHeight: 1.7,
            borderColor: borderColor('content'),
          }}
          {...inputFocus('content')}
        />
      </div>

      {/* Tags */}
      <div>
        <label style={LABEL_STYLE}>
          <Tag size={12} style={{ color: '#1099B7' }} />
          Tags (select all that apply)
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {DOMAIN_TAGS.map((tag) => {
            const selected = form.tags.includes(tag);
            return (
              <motion.button
                key={tag}
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => toggleTag(tag)}
                style={{
                  background: selected ? '#1099B7' : 'rgba(0,0,0,0.06)',
                  border: `1.5px solid ${selected ? '#1099B7' : 'rgba(0,0,0,0.15)'}`,
                  borderRadius: 100,
                  color: selected ? '#fff' : 'rgba(0,0,0,0.55)',
                  padding: '5px 14px',
                  fontSize: 11, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {tag}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* LinkedIn URL */}
      <div>
        <label style={LABEL_STYLE}>
          <Link size={12} style={{ color: '#1099B7' }} />
          LinkedIn Profile URL (optional)
        </label>
        <input
          id="post-form-linkedin"
          type="url"
          placeholder="https://linkedin.com/in/yourname"
          value={form.linkedinUrl}
          onChange={(e) => handleChange('linkedinUrl', e.target.value)}
          style={{ ...INPUT_STYLE, borderColor: borderColor('linkedin') }}
          {...inputFocus('linkedin')}
        />
      </div>

      {/* Submit */}
      <motion.button
        id="post-form-submit"
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          background: status === 'verified' ? '#1099B7' : 'rgba(0,0,0,0.07)',
          border: `2px solid ${status === 'verified' ? '#1099B7' : 'rgba(0,0,0,0.15)'}`,
          borderRadius: 12,
          color: status === 'verified' ? '#fff' : 'rgba(0,0,0,0.3)',
          padding: '14px 32px',
          fontSize: 13, fontWeight: 900,
          textTransform: 'uppercase', letterSpacing: '0.1em',
          cursor: status === 'verified' ? 'pointer' : 'not-allowed',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          transition: 'all 0.25s',
        }}
      >
        <Send size={14} />
        Submit Post
      </motion.button>

      {status !== 'verified' && (
        <p style={{ margin: 0, fontSize: 11, color: 'rgba(0,0,0,0.35)', textAlign: 'center' }}>
          You must verify your alumni identity before submitting.
        </p>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </form>
  );
}
