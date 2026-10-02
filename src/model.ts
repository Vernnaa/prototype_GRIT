export type Start = 'dream' | 'ideas' | 'none';
export type Reflection = { mission: string; feeling: string; enjoyed: string; challenge: string; again: string };
export type Profile = {
  name: string; start: Start | ''; dream: string; answers: string[][]; saved: string[]; explored: string[];
  steps: Record<string, number[]>; completed: string[]; reflections: Reflection[]; direction: string;
  xp: number; lastActive: string; streak: number; milestones: string[];
};
export const initial: Profile = { name: 'Alex', start: '', dream: '', answers: Array.from({ length: 10 }, () => []), saved: [], explored: [], steps: {}, completed: [], reflections: [], direction: '', xp: 0, lastActive: '', streak: 0, milestones: [] };
export const storageKey = 'grit-fresh-v1';
export function load(): Profile {
  try {
    const raw = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (!raw || typeof raw !== 'object') return initial;
    return { ...initial, ...raw, answers: Array.from({ length: 10 }, (_, i) => Array.isArray(raw.answers?.[i]) ? raw.answers[i] : []), saved: Array.isArray(raw.saved) ? raw.saved : [], explored: Array.isArray(raw.explored) ? raw.explored : [], completed: Array.isArray(raw.completed) ? raw.completed : [], reflections: Array.isArray(raw.reflections) ? raw.reflections : [], steps: raw.steps && typeof raw.steps === 'object' ? raw.steps : {}, milestones: Array.isArray(raw.milestones) ? raw.milestones : [] };
  } catch { return initial; }
}
export function completeMission(profile: Profile, id: string, xp: number): Profile {
  if (profile.completed.includes(id)) return profile;
  return { ...profile, completed: [...profile.completed, id], xp: profile.xp + xp };
}
export function recordVisit(profile: Profile, today: string): Profile {
  if (profile.lastActive === today) return profile;
  const yesterday = new Date(`${today}T12:00:00`); yesterday.setDate(yesterday.getDate() - 1);
  return { ...profile, lastActive: today, streak: profile.lastActive === yesterday.toLocaleDateString('en-CA') ? profile.streak + 1 : 1 };
}
export function level(xp: number) { return Math.min(6, Math.floor(xp / 250) + 1); }
export const levelNames = ['Curious', 'Explorer', 'Experimenter', 'Pathfinder', 'Builder', 'Direction Maker'];
