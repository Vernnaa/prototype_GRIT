export type Start = 'dream' | 'ideas' | 'none';
export type Reflection = { mission: string; feeling: string; enjoyed: string; challenge: string; again: string };
export type JourneyScreen = 'explore' | 'discover' | 'field' | 'mission' | 'missions' | 'workspace' | 'reflection' | 'mission-direction';
export type Journey = { screen: JourneyScreen; fieldId: string; missionId: string };
export type Profile = {
  name: string; start: Start | ''; dream: string; answers: string[][]; saved: string[]; explored: string[];
  steps: Record<string, number[]>; completed: string[]; reflections: Reflection[]; direction: string;
  xp: number; lastActive: string; streak: number; milestones: string[];
  activeMission?: string; journey?: Journey; reflectionDraft?: Reflection;
};
export const initial: Profile = { name: 'Alex', start: '', dream: '', answers: Array.from({ length: 10 }, () => []), saved: [], explored: [], steps: {}, completed: [], reflections: [], direction: '', xp: 0, lastActive: '', streak: 0, milestones: [] };
export const storageKey = 'grit-fresh-v1';
export function load(): Profile {
  try {
    const raw = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (!raw || typeof raw !== 'object') return initial;
    const journey = raw.journey && ['explore', 'discover', 'field', 'mission', 'missions', 'workspace', 'reflection', 'mission-direction'].includes(raw.journey.screen) && typeof raw.journey.fieldId === 'string' && typeof raw.journey.missionId === 'string' ? { screen: raw.journey.screen, fieldId: raw.journey.fieldId, missionId: raw.journey.missionId } : undefined;
    const draft = raw.reflectionDraft;
    return { ...initial, ...raw, journey, activeMission: typeof raw.activeMission === 'string' ? raw.activeMission : undefined, reflectionDraft: draft && ['mission', 'feeling', 'enjoyed', 'challenge', 'again'].every(key => typeof draft[key] === 'string') ? draft : undefined, answers: Array.from({ length: 10 }, (_, i) => Array.isArray(raw.answers?.[i]) ? raw.answers[i] : []), saved: Array.isArray(raw.saved) ? raw.saved : [], explored: Array.isArray(raw.explored) ? raw.explored : [], completed: Array.isArray(raw.completed) ? raw.completed : [], reflections: Array.isArray(raw.reflections) ? raw.reflections : [], steps: raw.steps && typeof raw.steps === 'object' ? raw.steps : {}, milestones: Array.isArray(raw.milestones) ? raw.milestones : [] };
  } catch { return initial; }
}
export function completeDemoOnboarding(profile: Profile): Profile {
  // ponytail: scripted Marketing demo; replace seeded answers with full quiz for real assessments.
  const answers = [
    profile.answers[0]?.length ? profile.answers[0] : ['Communicating'],
    ['Problem solving', 'Communication', 'Leadership'],
    ['Impact', 'Growth', 'Independence'],
    ['Writing', 'Designing', 'Presenting'],
    ['Creative briefs', 'Business challenges'],
    ['Collaborating', 'Meeting people'],
    ['A campaign'],
    ['Creating', 'Talking'],
    ['Marketing', 'Strategy', 'Writing'],
    ['Create a campaign'],
  ];
  return { ...profile, dream: 'marketing', answers };
}
export function demoReflection(profile: Profile, id: string): Reflection {
  const templates: Record<string, [string, string]> = {
    campaign: ['Writing the content and designing the visuals.', 'Defining the target audience.'],
    product: ['Sketching ideas and making a useful prototype.', 'Understanding what users need most.'],
    dataset: ['Finding patterns in the data and creating a chart.', 'Choosing which data to focus on.'],
    business: ['Exploring solutions and presenting my recommendation.', 'Choosing the most practical solution.'],
    website: ['Designing the layout and building the page.', 'Making the page work well on mobile.'],
    lesson: ['Explaining ideas and helping someone learn.', 'Making a difficult topic easy to understand.'],
    event: ['Planning activities and bringing people together.', 'Coordinating everyone’s schedules.'],
    prototype: ['Building a solution and testing how it works.', 'Improving the prototype after testing.'],
  };
  const [enjoyed, challenge] = templates[id] || ['Trying new ideas and sharing my result.', 'Choosing the best approach.'];
  const saved = profile.reflectionDraft?.mission === id ? profile.reflectionDraft : profile.reflections.find(r => r.mission === id);
  return { mission: id, feeling: saved?.feeling || 'Liked it', enjoyed: saved?.enjoyed?.trim() ? saved.enjoyed : enjoyed, challenge: saved?.challenge?.trim() ? saved.challenge : challenge, again: saved?.again || 'Yes, I choose this path' };
}
export function startMission(profile: Profile, id: string): Profile {
  // Reference demo starts midway through the campaign; existing checklists always win.
  return { ...profile, activeMission: id, steps: { ...profile.steps, [id]: profile.steps[id] ?? (id === 'campaign' ? [0, 1] : []) } };
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
