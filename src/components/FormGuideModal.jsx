import React from 'react';
import { X, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function FormGuideModal({ exercise, onClose }) {
  if (!exercise) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass-card modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '750px' }}>
        <div className="modal-header">
          <div>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--color-cyan)' }}>{exercise.name}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Target: {exercise.target} • {exercise.badge}</p>
          </div>
          <button className="btn-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* High Res Graphic Display */}
        <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-card)', marginBottom: '24px' }}>
          <img 
            src={exercise.image} 
            alt={exercise.name} 
            style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* Step-by-Step Cues */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <h4 style={{ color: 'var(--color-cyan)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <ShieldCheck size={18} /> Setup Position
            </h4>
            <p style={{ color: 'var(--text-main)', fontSize: '0.92rem', lineHeight: '1.6' }}>{exercise.setup}</p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <h4 style={{ color: 'var(--color-emerald)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <CheckCircle size={18} /> Movement Execution
            </h4>
            <p style={{ color: 'var(--text-main)', fontSize: '0.92rem', lineHeight: '1.6' }}>{exercise.movement}</p>
          </div>

          {exercise.awareness && (
            <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
              <h4 style={{ color: 'var(--color-amber)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <AlertTriangle size={18} /> Crucial Form Awareness
              </h4>
              <p style={{ color: '#fef3c7', fontSize: '0.92rem', lineHeight: '1.6' }}>{exercise.awareness}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
