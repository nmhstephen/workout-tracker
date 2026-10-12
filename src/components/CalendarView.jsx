import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Calendar as CalendarIcon, Zap, HeartPulse, Moon } from 'lucide-react';
import { WORKOUT_ROUTINES, SCHEDULE_PATTERN } from '../data/workoutPlan';

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function CalendarView({ storedData, onSelectDay }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Navigation handlers
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const jumpToToday = () => setCurrentDate(new Date());

  // Helper to generate full month grid days
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Convert JavaScript getDay() (0=Sun, 1=Mon...6=Sat) to Mon=0...Sun=6
  const getMonStartingIndex = (date) => {
    const day = date.getDay();
    return day === 0 ? 6 : day - 1;
  };

  const startOffset = getMonStartingIndex(firstDayOfMonth);
  const totalDays = lastDayOfMonth.getDate();

  // Helper to determine routine assigned for a specific date
  const getRoutineForDate = (dateObj) => {
    const dateStr = dateObj.toISOString().split('T')[0];
    
    // Check if custom override exists
    if (storedData.customSchedules && storedData.customSchedules[dateStr]) {
      const routineId = storedData.customSchedules[dateStr];
      return WORKOUT_ROUTINES[routineId.toUpperCase()] || WORKOUT_ROUTINES.REST_DAY;
    }

    // Default 4-day schedule lookup based on day of week
    const dayIndex = dateObj.getDay();
    const found = SCHEDULE_PATTERN.find(p => p.dayIndex === dayIndex);
    if (found) {
      if (found.routineId === 'workout_a') return WORKOUT_ROUTINES.WORKOUT_A;
      if (found.routineId === 'workout_b') return WORKOUT_ROUTINES.WORKOUT_B;
    }
    return WORKOUT_ROUTINES.REST_DAY;
  };

  const todayStr = new Date().toISOString().split('T')[0];

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Construct grid items
  const gridCells = [];

  // Previous month padding
  for (let i = 0; i < startOffset; i++) {
    const prevDate = new Date(year, month, -startOffset + i + 1);
    gridCells.push({
      dateObj: prevDate,
      isCurrentMonth: false
    });
  }

  // Current month days
  for (let d = 1; d <= totalDays; d++) {
    const dateObj = new Date(year, month, d);
    gridCells.push({
      dateObj,
      isCurrentMonth: true
    });
  }

  // Next month padding to complete 7-column grid
  const totalGridCount = gridCells.length;
  const remaining = (7 - (totalGridCount % 7)) % 7;
  for (let r = 1; r <= remaining; r++) {
    const nextDate = new Date(year, month + 1, r);
    gridCells.push({
      dateObj: nextDate,
      isCurrentMonth: false
    });
  }

  return (
    <div className="calendar-wrapper">
      {/* Controls Bar */}
      <div className="nav-controls">
        <div className="month-navigator">
          <button className="btn-secondary" onClick={prevMonth} title="Previous Month">
            <ChevronLeft size={18} />
          </button>
          <h2>{monthNames[month]} {year}</h2>
          <button className="btn-secondary" onClick={nextMonth} title="Next Month">
            <ChevronRight size={18} />
          </button>
        </div>

        <button className="btn-secondary" onClick={jumpToToday}>
          <CalendarIcon size={16} />
          Today
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="glass-card calendar-card-container">
        <div className="calendar-grid">
          {DAYS_OF_WEEK.map(day => (
            <div key={day} className="day-header">{day}</div>
          ))}

          {gridCells.map((cell, idx) => {
            const dateStr = cell.dateObj.toISOString().split('T')[0];
            const routine = getRoutineForDate(cell.dateObj);
            const isToday = dateStr === todayStr;
            const completionRecord = storedData.completedDays ? storedData.completedDays[dateStr] : null;
            const isCompleted = !!completionRecord;

            let dotColor = "var(--color-purple)"; // rest
            if (routine.id === "workout_a") dotColor = "var(--color-cyan)";
            if (routine.id === "workout_b") dotColor = "var(--color-emerald)";

            return (
              <div
                key={idx}
                className={`calendar-cell ${!cell.isCurrentMonth ? 'other-month' : ''} ${isToday ? 'is-today' : ''}`}
                onClick={() => onSelectDay(cell.dateObj, routine)}
              >
                <div className="cell-top">
                  <span className="day-number">{cell.dateObj.getDate()}</span>
                  <span 
                    className="routine-dot" 
                    style={{ backgroundColor: dotColor, boxShadow: `0 0 6px ${dotColor}` }} 
                    title={routine.name} 
                  />
                </div>

                <div className="cell-status">
                  {isCompleted && (
                    <span className="status-check" title="Completed">
                      <CheckCircle2 size={14} />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Routine Quick Overview Cards */}
      <div className="routine-legend">
        <div className="glass-card legend-card" style={{ borderLeft: '4px solid var(--color-cyan)' }}>
          <div className="legend-icon" style={{ background: 'rgba(0, 242, 254, 0.15)', color: 'var(--color-cyan)' }}>
            <Zap size={20} />
          </div>
          <div>
            <h4 style={{ color: 'var(--color-cyan)' }}>Workout A (Mon / Thu)</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Bench Press • Single-Arm Row • Shoulder Press • Steady Rowing
            </p>
          </div>
        </div>

        <div className="glass-card legend-card" style={{ borderLeft: '4px solid var(--color-emerald)' }}>
          <div className="legend-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--color-emerald)' }}>
            <HeartPulse size={20} />
          </div>
          <div>
            <h4 style={{ color: 'var(--color-emerald)' }}>Workout B (Tue / Fri)</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Goblet Squat • Romanian Deadlift • Floor Plank • Rowing HIIT
            </p>
          </div>
        </div>

        <div className="glass-card legend-card" style={{ borderLeft: '4px solid var(--color-purple)' }}>
          <div className="legend-icon" style={{ background: 'rgba(168, 85, 247, 0.15)', color: 'var(--color-purple)' }}>
            <Moon size={20} />
          </div>
          <div>
            <h4 style={{ color: 'var(--color-purple)' }}>Rest & Recovery (Wed / Weekend)</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Active Recovery (walking, mobility stretching) & muscle rebuilding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
