export const POST_DINNER_ADVICE = {
  title: "Post-Dinner Timing Safety Rule",
  description: "Since you work out after dinner, wait at least 60 to 90 minutes after eating before starting. Rowing on a full stomach is a recipe for severe discomfort.",
  recommendedWaitMinutes: 75,
};

export const WORKOUT_ROUTINES = {
  WORKOUT_A: {
    id: "workout_a",
    name: "Workout A",
    focus: "Upper Body & Steady Cardio",
    color: "#00f2fe", // vibrant cyan
    bgGradient: "linear-gradient(135deg, rgba(0, 242, 254, 0.15), rgba(121, 40, 202, 0.15))",
    badge: "Upper Body + Cardio",
    description: "Build upper body push & pull strength, then build endurance with steady rowing.",
    exercises: [
      {
        id: "bench_press",
        name: "Dumbbell Bench Press",
        target: "Chest & Triceps",
        badge: "Upper Body Push",
        setup: "Set your bench to a flat position. Sit on the end of the bench with a dumbbell in each hand, resting on your thighs. Kick your knees up one at a time to help bring the dumbbells to your chest as you lie back.",
        movement: "Plant your feet firmly on the floor. Press the dumbbells straight up over your chest until your arms are fully extended. Slowly lower them until the dumbbells are just outside your chest, feeling a stretch.",
        awareness: "Keep your shoulder blades squeezed together against the bench. Do not flare your elbows out to 90 degrees; keep them tucked slightly at a 45-degree angle to protect your shoulder joints.",
        volume: "3 sets of 10 to 12 reps",
        defaultSets: 3,
        defaultReps: "10-12",
        restSeconds: 90,
        image: "/images/bench_press.png"
      },
      {
        id: "single_arm_row",
        name: "Single-Arm Dumbbell Row",
        target: "Back & Biceps",
        badge: "Upper Body Pull",
        setup: "Keep the bench flat. Place your left knee and left hand on the bench, keeping your back flat like a table. Hold one dumbbell in your right hand, letting it hang straight down.",
        movement: "Pull the dumbbell up toward your hip (not your chest), squeezing your back muscles. Lower it back down with control. Complete all reps on the right arm, then switch to the left.",
        awareness: "Imagine you are starting a lawnmower. Keep your elbow close to your body and avoid twisting your torso.",
        volume: "3 sets of 10 to 12 reps per arm",
        defaultSets: 3,
        defaultReps: "10-12 / arm",
        restSeconds: 90,
        image: "/images/single_arm_row.png"
      },
      {
        id: "shoulder_press",
        name: "Seated Dumbbell Shoulder Press",
        target: "Shoulders & Upper Chest",
        badge: "Overhead Push",
        setup: "Adjust the bench so the backrest is fully upright (about 90 degrees). Sit back against the pad. Bring the dumbbells up to shoulder height, palms facing forward.",
        movement: "Press the weights straight up overhead until they almost touch. Slowly lower them back to ear level.",
        awareness: "Keep your core tight and your lower back pressed into the bench pad to avoid over-arching your spine.",
        volume: "3 sets of 10 to 12 reps",
        defaultSets: 3,
        defaultReps: "10-12",
        restSeconds: 90,
        image: "/images/shoulder_press.png"
      },
      {
        id: "rowing_steady",
        name: "Rowing Machine (Steady Cardio)",
        target: "Cardiovascular Endurance & Full Body",
        badge: "Steady Cardio",
        setup: "Strap your feet in tightly. If your rower has a resistance dial, set it to a medium level (around 4 or 5).",
        movement: "The rowing stroke is Legs, Core, Arms on the way back, and Arms, Core, Legs on the way forward. Push hard with your legs first, lean back slightly, and then pull the handle to your lower chest.",
        awareness: "Do not hunch your back. Most of the power (60%) should come from your legs, 20% from leaning your torso, and 20% from pulling with your arms.",
        volume: "15 to 20 minutes at a steady, moderate pace",
        defaultSets: 1,
        defaultReps: "15-20 min",
        restSeconds: 120,
        image: "/images/rowing_steady.png"
      }
    ]
  },
  WORKOUT_B: {
    id: "workout_b",
    name: "Workout B",
    focus: "Lower Body & Interval Cardio",
    color: "#10b981", // vibrant emerald
    bgGradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(0, 242, 254, 0.15))",
    badge: "Lower Body + HIIT",
    description: "Build strong legs and core, then incinerate fat with high-intensity rowing intervals.",
    exercises: [
      {
        id: "goblet_squat",
        name: "Dumbbell Goblet Squat",
        target: "Quads & Glutes",
        badge: "Quad Dominant",
        setup: "Stand with feet shoulder-width apart. Hold a single, heavier dumbbell vertically against your chest with both hands, cupping the top weight plate.",
        movement: "Keeping the dumbbell glued to your chest, push your hips back and bend your knees to squat down as if sitting in a chair. Go as low as is comfortable, then push through your heels to stand back up.",
        awareness: "Keep your chest up and back straight. Do not let your knees cave inward as you push back up.",
        volume: "3 sets of 10 to 15 reps",
        defaultSets: 3,
        defaultReps: "10-15",
        restSeconds: 90,
        image: "/images/goblet_squat.png"
      },
      {
        id: "romanian_deadlift",
        name: "Dumbbell Romanian Deadlift",
        target: "Hamstrings & Lower Back",
        badge: "Posterior Chain",
        setup: "Stand holding a dumbbell in each hand in front of your thighs. Feet should be hip-width apart, with a very slight, soft bend in your knees.",
        movement: "Keeping your back completely straight and the dumbbells close to your legs, push your hips backward. Lower the weights until you feel a deep stretch in the back of your thighs (usually just below the knees). Squeeze your glutes and push your hips forward to stand back up.",
        awareness: "The movement is a 'hip hinge,' not a squat. Imagine trying to close a car door with your glutes. If your lower back rounds, you are going down too far.",
        volume: "3 sets of 10 to 12 reps",
        defaultSets: 3,
        defaultReps: "10-12",
        restSeconds: 90,
        image: "/images/romanian_deadlift.png"
      },
      {
        id: "floor_plank",
        name: "Floor Plank",
        target: "Core & Abdominals",
        badge: "Core Stability",
        setup: "Get down on the floor, resting your weight on your forearms and your toes.",
        movement: "Hold your body in a perfectly straight line from your head to your heels.",
        awareness: "Squeeze your stomach, glutes, and thighs tightly. Do not let your hips sag toward the floor or pike up into the air.",
        volume: "3 sets of 30 to 45 seconds",
        defaultSets: 3,
        defaultReps: "30-45 sec",
        restSeconds: 60,
        image: "/images/floor_plank.png"
      },
      {
        id: "rowing_hiit",
        name: "Rowing Machine (HIIT Intervals)",
        target: "High-Intensity Fat Burn & Heart Rate",
        badge: "HIIT Cardio",
        setup: "Strap into the rowing machine securely. High-intensity intervals are fantastic for reducing cholesterol and burning stubborn fat.",
        movement: "Row at a light, easy pace for 3 minutes to warm up. Then, row as fast and hard as you can for 30 seconds, followed by 60 seconds of very slow, easy rowing to catch your breath. Repeat this cycle 6 to 8 times. Finish with 2 minutes of slow rowing to cool down.",
        awareness: "Maximum effort on 30s sprint intervals; focus on powerful leg drive and fast handle pulls while maintaining smooth posture.",
        volume: "3m Warmup + (30s Sprint / 60s Slow x 6-8 cycles) + 2m Cooldown",
        defaultSets: 1,
        defaultReps: "6-8 Intervals",
        restSeconds: 60,
        image: "/images/rowing_hiit.png"
      }
    ]
  },
  REST_DAY: {
    id: "rest",
    name: "Rest & Recovery",
    focus: "Active Recovery & Muscle Repair",
    color: "#a855f7", // purple
    bgGradient: "linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(59, 130, 246, 0.15))",
    badge: "Recovery",
    description: "Rest is when your muscles rebuild stronger. Keep moving lightly and rest well!",
    activities: [
      "Light 20-30 min brisk walk outdoors",
      "Full body stretching & mobility exercises",
      "Hydrate well (at least 2.5 - 3L of water)",
      "Prioritize 7-8 hours of quality sleep"
    ]
  }
};

// Default 7-day schedule pattern
export const SCHEDULE_PATTERN = [
  { dayIndex: 1, dayName: "Monday", routineId: "workout_a" },
  { dayIndex: 2, dayName: "Tuesday", routineId: "workout_b" },
  { dayIndex: 3, dayName: "Wednesday", routineId: "rest" },
  { dayIndex: 4, dayName: "Thursday", routineId: "workout_a" },
  { dayIndex: 5, dayName: "Friday", routineId: "workout_b" },
  { dayIndex: 6, dayName: "Saturday", routineId: "rest" },
  { dayIndex: 0, dayName: "Sunday", routineId: "rest" }
];
