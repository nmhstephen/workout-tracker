import React from 'react';
import { Maximize2, AlertCircle } from 'lucide-react';

export default function ExerciseCard({ exercise, onOpenFormGuide }) {
  return (
    <div className="exercise-card">
      {/* Exercise Image Thumbnail with Zoom Hint */}
      <div 
        className="exercise-img-wrapper" 
        onClick={() => onOpenFormGuide(exercise)}
        title="Click to view full form illustration & form guide"
      >
        <img src={exercise.image} alt={exercise.name} />
        <div className="img-zoom-hint">
          <Maximize2 size={16} style={{ marginRight: '4px' }} />
          Form Guide
        </div>
      </div>

      {/* Exercise Details */}
      <div className="exercise-info">
        <div className="exercise-title-row">
          <div>
            <h3>{exercise.name}</h3>
            <span className="target-muscles">Target: {exercise.target}</span>
          </div>
          <span className="exercise-badge">{exercise.badge}</span>
        </div>

        <div className="volume-pill">
          <strong>Prescribed Volume:</strong> {exercise.volume}
        </div>

        {exercise.awareness && (
          <div className="awareness-box">
            <div className="awareness-title">
              <AlertCircle size={15} style={{ color: 'var(--color-amber)' }} /> Form Awareness
            </div>
            {exercise.awareness}
          </div>
        )}
      </div>
    </div>
  );
}
