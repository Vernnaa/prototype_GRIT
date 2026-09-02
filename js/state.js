const GRIT_STATE_KEY = 'grit-prototype-state-v1';

function createDefaultState() {
  return {
    profile: {
      name: 'Angela',
      email: '',
      age: '',
      education: '',
      institution: '',
      careerInterest: 'Marketing',
      experience: '',
    },
    careerGoal: 'Marketing Staff',
    assessmentCompleted: false,
    initialScores: {},
    skillScores: Object.fromEntries(
      SKILLS.map((skill) => [skill.name, skill.current]),
    ),
    readiness: 78,
    completedLessons: [],
    completedMissions: [],
    finalAssessmentCompleted: false,
    finalScores: {},
    xp: 2450,
    level: 12,
    streak: 7,
    subscription: 'free',
    billingPlan: 'monthly',
    portfolio: [],
    lastPracticeScore: 78,
  };
}

function getGritState() {
  const fallback = createDefaultState();

  try {
    const stored = JSON.parse(localStorage.getItem(GRIT_STATE_KEY));
    if (!stored) return fallback;

    const storedState = { ...stored };
    const storedProfile = { ...(stored.profile || {}) };
    delete storedState.registered;
    delete storedState.onboardingComplete;
    delete storedProfile.name;
    delete storedProfile.email;

    return {
      ...fallback,
      ...storedState,
      profile: { ...fallback.profile, ...storedProfile },
      skillScores: { ...fallback.skillScores, ...(stored.skillScores || {}) },
      initialScores: { ...(stored.initialScores || {}) },
      finalScores: { ...(stored.finalScores || {}) },
      completedLessons: [...(stored.completedLessons || [])],
      completedMissions: [...(stored.completedMissions || [])],
      portfolio: [...(stored.portfolio || [])],
    };
  } catch (error) {
    return fallback;
  }
}

function saveGritState(state) {
  try {
    localStorage.setItem(GRIT_STATE_KEY, JSON.stringify(state));
  } catch (error) {
    // The prototype remains usable when browser storage is unavailable.
  }
  return state;
}

function updateGritState(updater) {
  const current = getGritState();
  const next = typeof updater === 'function' ? updater(current) : {
    ...current,
    ...updater,
  };
  return saveGritState(next);
}

function getCurrentSkills() {
  const state = getGritState();
  const requirements = CAREER_REQUIREMENTS[state.careerGoal] || {};
  return SKILLS.map((skill) => ({
    ...skill,
    current: state.skillScores[skill.name] ?? skill.current,
    required: requirements[skill.name] ?? skill.required,
  }));
}

function calculateReadiness(skillScores) {
  const values = SKILLS.map((skill) => skillScores[skill.name] ?? 0);
  return Math.round(values.reduce((total, value) => total + value, 0) / values.length);
}

function addExperiencePoints(state, points) {
  const xp = state.xp + points;
  const today = new Date().toISOString().slice(0, 10);
  const previous = state.lastActivityDate;
  const elapsedDays = previous
    ? Math.round((new Date(today) - new Date(previous)) / 86400000)
    : 1;
  const streak = previous === today
    ? state.streak
    : elapsedDays === 1
      ? state.streak + 1
      : 1;
  return {
    ...state,
    xp,
    level: Math.max(state.level, Math.floor(xp / 250) + 3),
    streak,
    lastActivityDate: today,
  };
}
