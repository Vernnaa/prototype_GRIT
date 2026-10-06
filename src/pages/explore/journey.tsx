import { useState } from 'react';
import { ArrowLeft, CaretRight, Check, Clock, Cube, Gear, Heart, Leaf, MagnifyingGlass, Palette, PaperPlaneTilt, Sparkle, Monitor } from '@phosphor-icons/react';
import { fields, type Field, type Mission } from '../../content';
import type { Profile } from '../../model';
import { Icon, Mascot } from '../../components/AppUI';

const possibilities = [
  { id: 'marketing', title: 'Business & Entrepreneurship', category: 'Business', description: 'Build ideas, solve problems and create value.', Icon: PaperPlaneTilt, color: '#6557F5', tags: ['Leading', 'Building', 'Communicating', 'Business challenges', 'Strategy'] },
  { id: 'ux', title: 'Design & Creative', category: 'Creative', description: 'Turn ideas into visual and meaningful experiences.', Icon: Palette, color: '#D68AE5', tags: ['Creating', 'Designing', 'Design', 'Creativity', 'Writing'] },
  { id: 'technology', title: 'Technology & Data', category: 'Tech', description: 'Use data and technology to solve real problems.', Icon: Monitor, color: '#8C9CF5', tags: ['Coding', 'Technology', 'Analyzing', 'Technical puzzles', 'Data'] },
  { id: 'healthcare', title: 'Health & Lifesciences', category: 'Health', description: 'Improve lives through science and care.', Icon: Leaf, color: '#DDF8E8', tags: ['Helping people', 'Empathy', 'Scientific questions', 'Impact'] },
  { id: 'engineering', title: 'Engineering & Making', category: 'Tech', description: 'Design, build and create solutions for the future.', Icon: Gear, color: '#F5EBAA', tags: ['Building', 'A product', 'Problem solving', 'Hands-on work'] },
];

function signal(profile: Profile, tags: string[]) {
  const choices = new Set(profile.answers.flat().map(value => value.toLowerCase()));
  return choices.size ? Math.round(tags.filter(tag => choices.has(tag.toLowerCase())).length / tags.length * 100) : null;
}

function Tags({ values }: { values: string[] }) {
  return <div className="explore-tags">{values.map(value => <span key={value}>{value}</span>)}</div>;
}

export function DetailTopBar({ back, saved, toggleSaved }: { back: () => void; saved: boolean; toggleSaved: () => void }) {
  return <div className="explore-top"><button type="button" aria-label="Go back" onClick={back}><ArrowLeft size={23} /></button><div className="flex items-center gap-2"><button type="button" aria-label={saved ? 'Unsave field' : 'Save field'} aria-pressed={saved} onClick={toggleSaved}><Heart size={23} weight={saved ? 'fill' : 'regular'} /></button><span className="flex h-7 w-7 items-center justify-center rounded-full bg-grit-lime" aria-label="Exploration, not a final decision"><Check size={17} /></span></div></div>;
}

function HeroPlaceholder({ label }: { label: string }) {
  return <div role="img" aria-label={label} className="explore-hero"><Monitor size={32} aria-hidden="true" /><span>{label}</span></div>;
}

export function Explore({ profile, discover }: { profile: Profile; discover: () => void }) {
  const interests = [
    { name: 'Business', Icon: PaperPlaneTilt, tags: possibilities[0].tags, color: 'text-grit-purple' },
    { name: 'Creative', Icon: Palette, tags: possibilities[1].tags, color: 'text-[#557500]' },
    { name: 'Technology', Icon: Cube, tags: possibilities[2].tags, color: 'text-grit-navy' },
  ];
  return <section className="explore-journey" aria-label="Explore">
    <div className="relative"><h1>Here’s what we’re<br />discovering<br />about you.</h1><Mascot size={96} className="pointer-events-none absolute right-[-8px] bottom-[-4px] !filter-none max-[359px]:!w-20 max-[359px]:!h-20" /></div>
    <p className="explore-lead">Your results show your top interests, strengths, and values. This is your starting point, not a limit.</p>
    <h2>Top Interests</h2>
    <div className="grid grid-cols-3 gap-2">{interests.map(({ name, Icon: InterestIcon, tags, color }) => <article key={name} className="explore-interest"><InterestIcon size={30} weight="duotone" className={color} aria-hidden="true" /><strong>{name}</strong><span>{signal(profile, tags) === null ? 'Still exploring' : `${signal(profile, tags)}%`}</span></article>)}</div>
    <p className="mt-2 text-[10px] text-grit-muted">Signals from your selected interests, not a career match.</p>
    <h2>Key Strengths</h2><Tags values={profile.answers[1]?.length ? profile.answers[1] : ['Discover strengths through a mission']} />
    <h2>Core Values</h2><Tags values={profile.answers[2]?.length ? profile.answers[2] : ['Your values can grow as you explore']} />
    <div className="explore-support"><Mascot size={60} className="shrink-0 !filter-none" /><p>You're not defined by one result.<br />Think of this as your starting point. <Sparkle size={12} className="inline" /></p></div>
    <button type="button" className="explore-primary" onClick={discover}>Explore My Possibilities</button>
  </section>;
}

export function DiscoverPossibilities({ profile, filter, setFilter, search, setSearch, chooseField, back }: { profile: Profile; filter: string; setFilter: (value: string) => void; search: string; setSearch: (value: string) => void; chooseField: (id: string) => void; back: () => void }) {
  const results = possibilities.filter(item => {
    const field = fields.find(f => f.id === item.id)!;
    return (filter === 'All' || item.category === filter) && `${item.title} ${item.description} ${field.name} ${field.careers.join(' ')}`.toLowerCase().includes(search.trim().toLowerCase());
  });
  return <section className="explore-journey" aria-label="Discover Possibilities">
    <div className="explore-top"><button type="button" aria-label="Go back" onClick={back}><ArrowLeft size={23} /></button></div>
    <h1>Your possibilities<br />are bigger than<br />you think.</h1><p className="explore-lead">Explore fields that connect with what you’ve discovered about yourself.</p>
    <label className="explore-search"><MagnifyingGlass size={20} /><input aria-label="Search fields or careers" placeholder="Search fields or careers..." value={search} onChange={event => setSearch(event.target.value)} /></label>
    <div className="explore-filters">{['All', 'Business', 'Creative', 'Tech'].map(value => <button type="button" key={value} aria-pressed={value === filter} onClick={() => setFilter(value)}>{value}</button>)}</div>
    <div className="space-y-2.5">{results.map(({ id, title, description, Icon: FieldIcon, color, tags }) => <button type="button" className="possibility-card" key={id} onClick={() => chooseField(id)}><span className="possibility-icon" style={{ backgroundColor: color }}><FieldIcon size={27} aria-hidden="true" /></span><span className="min-w-0 flex-1"><strong>{title}</strong><span className="possibility-description">{description}</span><span className="possibility-signal">{signal(profile, tags) === null ? 'Worth exploring' : `${signal(profile, tags)}% interest signal`}</span></span><CaretRight size={18} className="shrink-0" /></button>)}</div>
    {!results.length && <p className="py-6 text-center text-sm text-grit-muted">No matches yet. Try another search or category.</p>}
  </section>;
}

export function CareerDetail({ field, profile, update, chooseMission, back }: { field: Field; profile: Profile; update: (part: Partial<Profile>) => void; chooseMission: (id: string) => void; back: () => void }) {
  const saved = profile.saved.includes(field.id);
  const toggleSaved = () => update({ saved: saved ? profile.saved.filter(id => id !== field.id) : [...profile.saved, field.id] });
  const tags = field.id === 'marketing' ? ['Creative', 'Communication', 'Business'] : field.tags.slice(0, 3);
  const choices = new Set(profile.answers.flat().map(value => value.toLowerCase()));
  const reasons = field.tags.filter(tag => choices.has(tag.toLowerCase())).slice(0, 3);
  return <section className="explore-journey" aria-label="Career Detail">
    <DetailTopBar back={back} saved={saved} toggleSaved={toggleSaved} />
    <div className="mt-3 flex items-center gap-3"><span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-grit-purple text-white"><Icon name={field.icon} size={30} /></span><h1>{field.name}</h1></div>
    <div className="mt-3"><Tags values={tags} /></div><HeroPlaceholder label={`${field.name} collaboration workspace — image preview`} />
    <h2>What is it?</h2><p className="explore-body">{field.id === 'marketing' ? 'Marketing connects products and people through ideas, strategy, and communication.' : field.summary}</p>
    <h2>Why it may fit you</h2><ul className="space-y-2 text-[13px] text-grit-muted">{(reasons.length ? reasons.map(reason => `You selected ${reason.toLowerCase()}`) : field.activities.slice(0, 3).map(activity => `Try ${activity.toLowerCase()}`)).map(reason => <li key={reason} className="flex items-center gap-2"><Check size={16} weight="bold" className="shrink-0 rounded-full bg-grit-navy p-0.5 text-white" />{reason}</li>)}</ul>
    <h2>Related careers</h2><Tags values={field.careers} />
    <div className="mt-6 space-y-2"><button type="button" className="explore-primary" onClick={() => chooseMission(field.mission)}>Try This Field</button><button type="button" className="explore-secondary" aria-pressed={saved} onClick={toggleSaved}>{saved ? 'Saved for Later' : 'Save for Later'}</button></div>
  </section>;
}

export function TryMission({ mission, field, profile, update, back, start }: { mission: Mission; field: Field; profile: Profile; update: (part: Partial<Profile>) => void; back: () => void; start: () => void }) {
  const [filter, setFilter] = useState('All');
  const saved = profile.saved.includes(field.id);
  const visible = filter !== 'Creative' || mission.skills.some(skill => ['Creativity', 'Design'].includes(skill));
  return <section className="explore-journey" aria-label="Try a Mission"><DetailTopBar back={back} saved={saved} toggleSaved={() => update({ saved: saved ? profile.saved.filter(id => id !== field.id) : [...profile.saved, field.id] })} />
    <h1>Don’t just imagine it.<br />Try it.</h1><p className="explore-lead">Real experiences help you understand what fits you.</p>
    <div className="explore-filters">{['All', 'Popular', 'Beginner', 'Creative'].map(value => <button type="button" key={value} aria-pressed={value === filter} onClick={() => setFilter(value)}>{value}</button>)}</div>
    {visible ? <><article className="try-mission-card"><HeroPlaceholder label={`${field.name} creative workspace — image preview`} /><div className="p-4"><h2 className="!mt-0 !text-[24px] !leading-[1.08]">{mission.id === 'campaign' ? <>Create a Marketing<br />Campaign</> : mission.title}</h2><Tags values={[field.name, 'Beginner']} /><div className="my-4 flex items-center gap-6 text-[13px]"><span className="flex items-center gap-1.5"><Clock size={19} />{mission.time}</span><strong className="flex items-center gap-1.5"><Sparkle size={19} />+{mission.xp} XP</strong></div><p className="explore-body">{mission.id === 'campaign' ? 'Create a simple campaign for a product you choose and present your ideas.' : mission.goal}</p><h3 className="mt-5 mb-2 text-[14px] font-bold">Skills you’ll practice</h3><Tags values={mission.skills} /></div></article><button type="button" className="explore-primary mt-6" onClick={start}>Start Mission</button></> : <p className="py-6 text-sm text-grit-muted">This mission focuses on other skills. Choose All to try it.</p>}
  </section>;
}
