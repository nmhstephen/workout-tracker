import React, { useState } from 'react';
import Header from './components/Header';
import CalendarView from './components/CalendarView';
import DayDetailModal from './components/DayDetailModal';
import FormGuideModal from './components/FormGuideModal';
import { 
  getStoredData, 
  toggleDayCompletion, 
  saveDayNotes, 
  calculateStats 
} from './utils/storage';

export default function App() {
  const [storedData, setStoredData] = useState(() => getStoredData());
  const [selectedDay, setSelectedDay] = useState(null); // { dateObj, routine }
  const [activeFormGuide, setActiveFormGuide] = useState(null); // exercise object

  const stats = calculateStats(storedData.completedDays || {});

  // Handle Day Selection from Calendar Grid
  const handleSelectDay = (dateObj, routine) => {
    setSelectedDay({ dateObj, routine });
  };

  // Toggle Day Completion Checkmark
  const handleToggleCompletion = (dateStr, routineId) => {
    const updated = toggleDayCompletion(dateStr, routineId);
    setStoredData(updated);
  };

  // Save Day Session Notes
  const handleSaveNotes = (dateStr, notes) => {
    const updated = saveDayNotes(dateStr, notes);
    setStoredData(updated);
  };

  // Trigger Form Guide Lightbox
  const handleOpenFormGuide = (exercise) => {
    setActiveFormGuide(exercise);
  };

  return (
    <div className="app-container">
      {/* Header & Overview Stats */}
      <Header stats={stats} />

      {/* Main Interactive Calendar View */}
      <main>
        <CalendarView 
          storedData={storedData} 
          onSelectDay={handleSelectDay} 
        />
      </main>

      {/* Day Detail Modal */}
      {selectedDay && (
        <DayDetailModal
          dateObj={selectedDay.dateObj}
          routine={selectedDay.routine}
          storedData={storedData}
          onClose={() => setSelectedDay(null)}
          onToggleCompletion={handleToggleCompletion}
          onSaveNotes={handleSaveNotes}
          onOpenFormGuide={handleOpenFormGuide}
        />
      )}

      {/* Exercise Form Guide Lightbox Modal */}
      {activeFormGuide && (
        <FormGuideModal
          exercise={activeFormGuide}
          onClose={() => setActiveFormGuide(null)}
        />
      )}
    </div>
  );
}
