import React from 'react';
import { Dumbbell, Flame, Trophy } from 'lucide-react';

export default function Header({ stats }) {
  return (
    <header className="glass-card header-banner">
      <div className="header-title-group">
        <h1>
          <Dumbbell className="text-cyan" style={{ color: 'var(--color-cyan)' }} size={28} />
          FlexWorkout 4-Day
        </h1>
        <p className="header-subtitle">
          Gemini's Flexible Workout A/B & Cardio Tracker
        </p>
      </div>

      <div className="header-stats-group">
        <div className="stat-pill" title="Current Active Workout Streak">
          <Flame size={18} style={{ color: 'var(--color-amber)' }} />
          <span>Streak: <span className="stat-val">{stats.streak} Days</span></span>
        </div>

        <div className="stat-pill" title="Total Workouts Completed">
          <Trophy size={18} style={{ color: 'var(--color-cyan)' }} />
          <span>Sessions: <span className="stat-val">{stats.totalCompleted}</span></span>
        </div>
      </div>
    </header>
  );
}
