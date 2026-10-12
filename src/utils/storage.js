const STORAGE_KEY = "flex_workout_tracker_data_v1";

const getInitialData = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse local storage workout data", e);
    }
  }
  return {
    completedDays: {}, // { "2026-10-05": { routineId: "workout_a", completedAt: timestamp, notes: "" } }
    setLogs: {},       // { "2026-10-05": { "bench_press": { sets: [{ weight: 25, reps: 12, done: true }, ...] } } }
    customSchedules: {}, // { "2026-10-05": "workout_b" } if rescheduled
  };
};

export const getStoredData = () => getInitialData();

export const saveStoredData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save workout data to local storage", e);
  }
};

export const toggleDayCompletion = (dateStr, routineId) => {
  const data = getInitialData();
  if (data.completedDays[dateStr]) {
    delete data.completedDays[dateStr];
  } else {
    data.completedDays[dateStr] = {
      routineId,
      completedAt: new Date().toISOString(),
      notes: ""
    };
  }
  saveStoredData(data);
  return data;
};

export const saveSetLog = (dateStr, exerciseId, setIndex, setDetails) => {
  const data = getInitialData();
  if (!data.setLogs[dateStr]) {
    data.setLogs[dateStr] = {};
  }
  if (!data.setLogs[dateStr][exerciseId]) {
    data.setLogs[dateStr][exerciseId] = { sets: [] };
  }

  data.setLogs[dateStr][exerciseId].sets[setIndex] = {
    ...data.setLogs[dateStr][exerciseId].sets[setIndex],
    ...setDetails
  };

  saveStoredData(data);
  return data;
};

export const saveDayNotes = (dateStr, notes) => {
  const data = getInitialData();
  if (data.completedDays[dateStr]) {
    data.completedDays[dateStr].notes = notes;
  } else {
    data.completedDays[dateStr] = {
      routineId: "custom",
      completedAt: new Date().toISOString(),
      notes
    };
  }
  saveStoredData(data);
  return data;
};

export const calculateStats = (completedDays) => {
  const dateKeys = Object.keys(completedDays).sort();
  const totalCompleted = dateKeys.filter(k => completedDays[k].routineId !== 'rest').length;
  
  // Calculate current active streak
  let streak = 0;
  const today = new Date();
  let checkDate = new Date(today);

  for (let i = 0; i < 30; i++) {
    const formatted = checkDate.toISOString().split('T')[0];
    if (completedDays[formatted]) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else if (i === 0) {
      // Check if yesterday was completed
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return {
    totalCompleted,
    streak,
    totalSessionsThisMonth: totalCompleted
  };
};
