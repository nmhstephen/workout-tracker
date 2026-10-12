import React, { useState, useEffect } from 'react';
import { X, Utensils, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { POST_DINNER_ADVICE } from '../data/workoutPlan';

export default function PostDinnerTimer({ isOpen, onClose }) {
  const [targetMinutes, setTargetMinutes] = useState(60);
  const [secondsLeft, setSecondsLeft] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  if (!isOpen) return null;

  const startTimer = (mins) => {
    setTargetMinutes(mins);
    setSecondsLeft(mins * 60);
    setIsActive(true);
  };

  const mins = secondsLeft !== null ? Math.floor(secondsLeft / 60) : targetMinutes;
  const secs = secondsLeft !== null ? secondsLeft % 60 : 0;
  const formattedTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  const isReady = secondsLeft === 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass-card modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Utensils size={24} style={{ color: 'var(--color-purple)' }} />
            <div>
              <h2 style={{ fontSize: '1.4rem', color: '#fff' }}>Post-Dinner Digestive Safety Timer</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Evening Workout Pre-Routine</p>
            </div>
          </div>
          <button className="btn-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Advice Banner */}
        <div style={{ background: 'rgba(168, 85, 247, 0.1)', borderLeft: '4px solid var(--color-purple)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-purple)', fontWeight: '700', marginBottom: '4px' }}>
            <ShieldAlert size={18} /> Post-Dinner Rule (Gemini Guidance)
          </div>
          <p style={{ color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: '1.5' }}>
            {POST_DINNER_ADVICE.description}
          </p>
        </div>

        {/* Timer Display */}
        <div style={{ textAlignment: 'center', textAlign: 'center', margin: '20px 0' }}>
          <div style={{ fontSize: '3.5rem', fontFamily: 'Outfit, sans-serif', fontWeight: '800', color: isReady ? 'var(--color-emerald)' : 'var(--color-purple)', letterSpacing: '0.05em' }}>
            {formattedTime}
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '6px' }}>
            {isReady ? "✨ Perfect timing! Safe to start your workout." : isActive ? "Digestive rest in progress..." : "Select how long ago you finished dinner:"}
          </p>
        </div>

        {/* Quick Selection Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '20px' }}>
          <button className="btn-secondary" onClick={() => startTimer(60)}>
            <Clock size={16} /> Just Ate (Wait 60m)
          </button>
          <button className="btn-secondary" onClick={() => startTimer(75)}>
            <Clock size={16} /> Moderate Meal (Wait 75m)
          </button>
          <button className="btn-secondary" onClick={() => startTimer(90)}>
            <Clock size={16} /> Heavy Dinner (Wait 90m)
          </button>
        </div>

        {isActive && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button className="btn-primary" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.4)' }} onClick={() => setIsActive(false)}>
              Cancel Timer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
