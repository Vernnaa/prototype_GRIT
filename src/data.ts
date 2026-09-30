import type { Answers, State } from './state';

export type Question = { id: keyof Answers; title: string; choices: string[] };
export type Field = { id: string; name: string; group: string; symbol: string; summary: string; tags: string[]; activities: string[]; careers: string[]; major: string };
export type Mission = { id: string; field: string; title: string; time: string; xp: number; symbol: string; intro: string; skills: string[]; steps: string[] };

export const questions: Question[] = [
  { id: 'interests', title: 'What do you enjoy doing?', choices: ['Creating', 'Solving problems', 'Helping people', 'Leading', 'Analyzing', 'Building', 'Communicating', 'Organizing', 'Exploring'] },
  { id: 'strengths', title: 'What comes naturally to you?', choices: ['Creative thinking', 'Problem solving', 'Communication', 'Empathy', 'Planning', 'Research', 'Leadership', 'Working with numbers'] },
  { id: 'values', title: 'What matters most to you?', choices: ['Impact', 'Growth', 'Independence', 'Helping others', 'Creativity', 'Stability', 'Curiosity', 'Collaboration'] },
];

export const fields: Field[] = [
  { id: 'marketing', name: 'Marketing', group: 'Business & Entrepreneurship', symbol: '↗', summary: 'Connect people and ideas through creativity, strategy and communication.', tags: ['Creating', 'Communicating', 'Planning', 'Creative thinking'], activities: ['Create campaigns', 'Research audiences', 'Explore what people need'], careers: ['Marketing Specialist', 'Brand Strategist', 'Content Strategist'], major: 'Business, Communication or Marketing' },
  { id: 'design', name: 'Design & Creative', group: 'Design & Creative', symbol: '✳', summary: 'Shape useful, expressive experiences for real people.', tags: ['Creating', 'Building', 'Creative thinking', 'Empathy'], activities: ['Sketch ideas', 'Design experiences', 'Test what works'], careers: ['UX Designer', 'Visual Designer', 'Creative Strategist'], major: 'Design, Communication or self-directed practice' },
  { id: 'technology', name: 'Technology & Data', group: 'Technology & Data', symbol: '⌘', summary: 'Build tools and discover patterns that solve everyday problems.', tags: ['Building', 'Analyzing', 'Problem solving', 'Research'], activities: ['Build a small website', 'Analyze information', 'Test solutions'], careers: ['Developer', 'Data Analyst', 'Product Manager'], major: 'Computer Science, Information Systems or independent projects' },
  { id: 'business', name: 'Entrepreneurship', group: 'Business & Entrepreneurship', symbol: '◈', summary: 'Turn ideas into something people want to use.', tags: ['Leading', 'Planning', 'Independence', 'Solving problems'], activities: ['Find a problem', 'Try a small idea', 'Talk to potential customers'], careers: ['Founder', 'Product Manager', 'Business Analyst'], major: 'Business, Management or hands-on experience' },
  { id: 'education', name: 'Education & Social Impact', group: 'Education & Social Impact', symbol: '✦', summary: 'Help others grow and make a difference in your community.', tags: ['Helping people', 'Empathy', 'Impact', 'Communicating'], activities: ['Teach a mini lesson', 'Listen to learners', 'Organize a community activity'], careers: ['Educator', 'Learning Designer', 'Community Organizer'], major: 'Education, Psychology or Social Sciences' },
];

export const missions: Mission[] = [
  { id: 'campaign', field: 'marketing', title: 'Create a Marketing Campaign', time: '2–3 hours', xp: 100, symbol: '↗', intro: 'Create a simple campaign for a product you choose.', skills: ['Creativity', 'Communication', 'Strategy'], steps: ['Choose a product', 'Define your audience', 'Create a campaign concept', 'Design 3 content ideas', 'Present your result'] },
  { id: 'product', field: 'design', title: 'Design a Product Idea', time: '1–2 hours', xp: 100, symbol: '✳', intro: 'Sketch an idea that makes a daily task easier.', skills: ['Creativity', 'Empathy', 'Problem solving'], steps: ['Find an everyday problem', 'Talk to someone who has it', 'Sketch 3 ideas', 'Choose one idea', 'Explain how it helps'] },
  { id: 'website', field: 'technology', title: 'Build a Simple Website', time: '2–3 hours', xp: 100, symbol: '⌘', intro: 'Make a small page about something you care about.', skills: ['Building', 'Problem solving', 'Communication'], steps: ['Choose a topic', 'Plan the content', 'Create a first page', 'Ask someone to try it', 'Improve one detail'] },
  { id: 'business-case', field: 'business', title: 'Solve a Business Case', time: '1–2 hours', xp: 100, symbol: '◈', intro: 'Find a small business problem and propose a practical solution.', skills: ['Planning', 'Analysis', 'Leadership'], steps: ['Pick a local business', 'Find a customer problem', 'Write 2 possible solutions', 'Choose one to test', 'Present your idea'] },
  { id: 'teach', field: 'education', title: 'Teach a Mini Lesson', time: '1–2 hours', xp: 100, symbol: '✦', intro: 'Explain something you know to another person.', skills: ['Empathy', 'Communication', 'Planning'], steps: ['Pick a topic', 'Set one learning goal', 'Make a simple explanation', 'Teach a friend', 'Ask what helped them'] },
];

export function suggestedFields(state: State): Field[] {
  const answers = [...state.answers.interests, ...state.answers.strengths, ...state.answers.values];
  return [...fields].sort((a, b) => {
    const score = (field: Field) => field.tags.filter((tag: string) => answers.includes(tag)).length + state.reflections.filter(r => missions.find(m => m.id === r.mission)?.field === field.id).reduce((sum, r) => sum + (['Loved it', 'Liked it'].includes(r.enjoyment) ? 2 : r.enjoyment === 'Not for me' ? -2 : 0), 0) + (state.startingPoint === 'dream' && state.dreamField === field.id ? 2 : 0);
    return score(b) - score(a) || fields.indexOf(a) - fields.indexOf(b);
  });
}

export function fieldReason(field: Field, state: State): string {
  const match = field.tags.find(tag => Object.values(state.answers).some(answers => answers.includes(tag)));
  const tried = state.reflections.some(r => missions.find(m => m.id === r.mission)?.field === field.id && ['Loved it', 'Liked it'].includes(r.enjoyment));
  return tried ? 'You enjoyed an experience in this field.' : state.startingPoint === 'dream' && state.dreamField === field.id ? 'You told us this is a direction you want to explore.' : match ? `You chose “${match}” during exploration.` : 'A new direction worth trying.';
}
