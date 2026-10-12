import React from 'react';
import { X, CheckCircle2, Circle, Calendar, FileText, Dumbbell, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import ExerciseCard from './ExerciseCard';

export default function DayDetailModal({ 
  dateObj, 
  routine, 
  storedData, 
  onClose, 
  onToggleCompletion, 
  onSaveNotes, 
  onOpenFormGuide 
}) {
  if (!dateObj || !routine) return null;

  const dateStr = dateObj.toISOString().split('T')[0];
  const isCompleted = storedData.completedDays && !!storedData.completedDays[dateStr];
  const dayNotes = storedData.completedDays && storedData.completedDays[dateStr] ? storedData.completedDays[dateStr].notes || "" : "";

  const handleToggleDay = () => {
    onToggleCompletion(dateStr, routine.id);
    if (!isCompleted) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback
      }
    }
  };

  const formattedDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass-card modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header with Prominent Mark Day Complete Button */}
        <div className="modal-header">
          <div className="modal-title-box">
            <span className="modal-date-badge">
              <Calendar size={14} /> {formattedDate}
            </span>
            <h2>{routine.name}</h2>
            <p className="routine-focus">Focus: {routine.focus}</p>
          </div>

          <div className="modal-action-box">
            <button 
              className={`btn-primary ${isCompleted ? 'completed-btn' : ''}`}
              style={{
                background: isCompleted ? 'linear-gradient(135deg, #10b981, #059669)' : undefined,
                color: isCompleted ? '#ffffff' : undefined
              }}
              onClick={handleToggleDay}
            >
              {isCompleted ? <CheckCircle2 size={18} /> : <Circle size={18} />}
              {isCompleted ? "Completed" : "Mark Day Complete"}
            </button>

            <button className="btn-close" onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Exercises or Rest Guidance */}
        {routine.exercises && routine.exercises.length > 0 ? (
          <div className="exercise-list">
            <div className="section-subtitle-row">
              <h3>
                <Dumbbell size={18} style={{ color: routine.color }} /> Session Program ({routine.exercises.length} Exercises)
              </h3>
              <span className="hint-text">Tap image to view form guide</span>
            </div>

            {routine.exercises.map((ex) => (
              <ExerciseCard
                key={ex.id}
                exercise={ex}
                onOpenFormGuide={onOpenFormGuide}
              />
            ))}
          </div>
        ) : (
          <div className="rest-guidance-box">
            <h3>
              <Sparkles size={20} /> Active Recovery Guidelines
            </h3>
            <p>{routine.description}</p>
            <ul>
              {routine.activities && routine.activities.map((act, idx) => (
                <li key={idx}>{act}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Workout Notes */}
        <div className="notes-section">
          <label>
            <FileText size={16} style={{ color: 'var(--color-cyan)' }} /> Session Log & Personal Notes
          </label>
          <textarea
            placeholder="Record how you felt, energy levels, or notes..."
            value={dayNotes}
            onChange={(e) => onSaveNotes(dateStr, e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
