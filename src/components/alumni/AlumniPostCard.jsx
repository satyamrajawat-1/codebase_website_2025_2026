import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function AlumniPostCard({ post, index }) {
  return (
    <motion.article
      id={`post-card-${post.id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      style={{
        background: '#111',
        border: '1.5px solid rgba(255,255,255,0.07)',
        borderRadius: 18,
        padding: '24px 26px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        cursor: 'default',
        transition: 'border-color 0.25s',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(16,153,183,0.3)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
    >
      {/* Accent strip */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 3,
        background: 'linear-gradient(90deg, #1099B7, #ccff00)',
        borderRadius: '18px 18px 0 0',
      }} />

      {/* Tags — single minimal style */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, paddingTop: 4 }}>
        {(post.tags || []).map((tag) => (
          <span key={tag} style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.14)',
            color: 'rgba(255,255,255,0.6)',
            fontSize: 9, fontWeight: 800,
            padding: '2px 8px', borderRadius: 100,
            textTransform: 'uppercase', letterSpacing: '0.06em',
          }}>
            {tag}
          </span>
        ))}
      </div>


      {/* Title */}
      <h3 style={{
        margin: 0,
        fontSize: 'clamp(15px, 1.5vw, 18px)',
        fontWeight: 900,
        color: '#fff',
        letterSpacing: '-0.02em',
        lineHeight: 1.25,
      }}>
        {post.title}
      </h3>

      {/* Excerpt */}
      <p style={{
        margin: 0,
        fontSize: 13, lineHeight: 1.7,
        color: 'rgba(255,255,255,0.5)',
        fontWeight: 400,
        flex: 1,
      }}>
        {post.excerpt}
      </p>

      {/* Author + Date row */}
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        paddingTop: 14,
        gap: 12,
        flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img
            src={post.authorPhoto}
            alt={post.authorName}
            style={{
              width: 28, height: 28,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '1.5px solid rgba(16,153,183,0.5)',
            }}
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(post.authorName)}&background=1099B7&color=fff&size=56`;
            }}
          />
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#fff' }}>{post.authorName}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>
              Class of {post.authorBatch}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'rgba(255,255,255,0.3)' }}>
          <Calendar size={11} />
          <span style={{ fontSize: 11, fontWeight: 600 }}>{formatDate(post.date)}</span>
        </div>
      </div>
    </motion.article>
  );
}
