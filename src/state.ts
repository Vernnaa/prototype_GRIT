export const KEY = 'grit-exploration-v2';

export type Answers = { interests: string[]; strengths: string[]; values: string[] };
export type Reflection = { mission: string; enjoyment: string; enjoyed: string; challenge: string; again: string };
export type State = {
  name: string; startingPoint: string; dreamField: string; answers: Answers; savedFields: string[];
  question: number; missionProgress: Record<string, number[]>; completedMissions: string[]; reflections: Reflection[];
  direction: string; xp: number;
};
export type Action =
  | { type: 'start'; value: string }
  | { type: 'dreamField'; id: string }
  | { type: 'answer'; question: keyof Answers; values: string[] }
  | { type: 'question'; value: number }
  | { type: 'saveField'; id: string }
  | { type: 'missionStep'; id: string; step: number }
  | { type: 'completeMission'; id: string; xp: number }
  | { type: 'reflect'; reflection: Reflection }
  | { type: 'direction'; id: string }
  | { type: 'name'; value: string }
  | { type: 'reset' };

export const initialState: State = {
  name: 'Alex', startingPoint: '', dreamField: '', answers: { interests: [], strengths: [], values: [] },
  question: 0,
  savedFields: [], missionProgress: {}, completedMissions: [], reflections: [], direction: '', xp: 0,
};

export function loadState(): State {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return initialState;
    const saved: Partial<State> = JSON.parse(raw);
    if (!saved || typeof saved !== 'object') return initialState;
    return {
      ...initialState, ...saved,
      answers: { ...initialState.answers, ...saved.answers },
      savedFields: Array.isArray(saved.savedFields) ? saved.savedFields : [],
      missionProgress: saved.missionProgress && typeof saved.missionProgress === 'object' ? saved.missionProgress : {},
      completedMissions: Array.isArray(saved.completedMissions) ? saved.completedMissions : [],
      reflections: Array.isArray(saved.reflections) ? saved.reflections : [],
    };
  } catch { return initialState; }
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'start': return { ...state, startingPoint: action.value };
    case 'dreamField': return { ...state, dreamField: action.id };
    case 'answer': return { ...state, answers: { ...state.answers, [action.question]: action.values } };
    case 'question': return { ...state, question: Math.max(0, Math.min(2, action.value)) };
    case 'saveField': return { ...state, savedFields: state.savedFields.includes(action.id) ? state.savedFields.filter(id => id !== action.id) : [...state.savedFields, action.id] };
    case 'missionStep': {
      const current = state.missionProgress[action.id] || [];
      return { ...state, missionProgress: { ...state.missionProgress, [action.id]: current.includes(action.step) ? current.filter(n => n !== action.step) : [...current, action.step] } };
    }
    case 'completeMission': return state.completedMissions.includes(action.id) ? state : { ...state, completedMissions: [...state.completedMissions, action.id], xp: state.xp + action.xp };
    case 'reflect': return { ...state, reflections: [...state.reflections.filter(r => r.mission !== action.reflection.mission), action.reflection] };
    case 'direction': return { ...state, direction: action.id };
    case 'name': return { ...state, name: action.value.trim().slice(0, 40) || 'Alex' };
    case 'reset': return initialState;
    default: return state;
  }
}
