import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, X, Bell } from 'lucide-react';

export default function RestTimer({ secondsLeft, setSecondsLeft, onClose }) {
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let timer = null;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            // Timer complete chime visual
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft, setSecondsLeft]);

  if (secondsLeft === null) return null;

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  const isComplete = secondsLeft === 0;

  return (
    <div className={`rest-timer-widget ${isComplete ? 'timer-finished' : ''}`}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Bell 
          size={22} 
          style={{ 
            color: isComplete ? 'var(--color-emerald)' : 'var(--color-cyan)',
            animation: isComplete ? 'pulse 1s infinite' : 'none' 
          }} 
        />
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {isComplete ? "Rest Complete! Start Next Set" : "Rest Timer"}
          </span>
          <div className="timer-digits">{formatted}</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {!isComplete && (
          <button 
            className="btn-secondary" 
            style={{ padding: '8px 12px' }} 
            onClick={() => setIsRunning(!isRunning)}
            title={isRunning ? "Pause" : "Resume"}
          >
            {isRunning ? <Pause size={16} /> : <Play size={16} />}
          </button>
        )}

        <button 
          className="btn-secondary" 
          style={{ padding: '8px 12px' }} 
          onClick={() => { setSecondsLeft(90); setIsRunning(true); }}
          title="Reset to 90s"
        >
          <RotateCcw size={16} />
        </button>

        <button className="btn-close" onClick={onClose} title="Close Timer">
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
