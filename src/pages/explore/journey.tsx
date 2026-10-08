import { useState } from 'react';
import { ArrowLeft, CaretRight, ChartPieSlice, Check, Clock, Cube, Gear, Heart, Leaf, MagnifyingGlass, Palette, PaperPlaneTilt, Sparkle, Target, Monitor } from '@phosphor-icons/react';
import { fields, type Field, type Mission } from '../../content';
import type { Profile } from '../../model';
import { Icon, Mascot } from '../../components/AppUI';
import workspaceImage from '../../marketing-workspace.jpg';
import creativeImage from '../../creative-workspace.jpg';

const possibilities = [
  { id: 'marketing', title: 'Marketing', category: 'Business', description: 'Connect products and people through ideas and communication.', Icon: PaperPlaneTilt, match: 92 },
  { id: 'ux', title: 'Design & Creative', category: 'Creative', description: 'Turn ideas into visual and meaningful experiences.', Icon: Palette, match: 78 },
  { id: 'technology', title: 'Technology & Data', category: 'Tech', description: 'Use data and technology to solve real problems.', Icon: Monitor, match: 74 },
  { id: 'healthcare', title: 'Health & Lifesciences', category: 'Health', description: 'Improve lives through science and care.', Icon: Leaf, match: 71 },
  { id: 'engineering', title: 'Engineering & Making', category: 'Tech', description: 'Design, build and create solutions for the future.', Icon: Gear, match: 68 },
];
const campaignDirections = [
  { id: 'marketing', title: 'Marketing', category: 'Business', description: 'You enjoyed creative problem solving and communication.', Icon: PaperPlaneTilt, match: 89 },
  { id: 'entrepreneurship', title: 'Entrepreneurship', category: 'Business', description: 'You like building ideas and creating value.', Icon: ChartPieSlice, match: 76 },
  { id: 'consulting', title: 'Consulting', category: 'Business', description: 'You enjoy analyzing and finding solutions.', Icon: Target, match: 72 },
];

export function Tags({ values }: { values: string[] }) {
  return <div className="explore-tags">{values.map(value => <span key={value}>{value}</span>)}</div>;
}

export function MatchBadge({ value }: { value: number }) {
  return <span className="possibility-signal">{value}% match</span>;
}

export function DetailTopBar({ back, saved, toggleSaved }: { back: () => void; saved: boolean; toggleSaved: () => void }) {
  return <div className="explore-top"><button type="button" aria-label="Go back" onClick={back}><ArrowLeft size={23} /></button><div className="flex items-center gap-1"><button type="button" aria-label={saved ? 'Unsave field' : 'Save field'} aria-pressed={saved} onClick={toggleSaved}><Heart size={23} weight={saved ? 'fill' : 'regular'} /></button><span className="explore-status" aria-label="Exploration, not a final decision"><Check size={16} weight="bold" /></span></div></div>;
}

function WorkspaceImage({ mission = false }: { mission?: boolean }) {
  return <img src={mission ? creativeImage : workspaceImage} alt={mission ? 'Campaign planning workspace with laptops and handwritten ideas' : 'Collaborators reviewing ideas on a laptop'} className={`explore-hero ${mission ? 'mission-preview-image' : ''}`} />;
}

export function Explore({ discover }: { discover: () => void }) {
  const interests = [
    { name: 'Business', Icon: ChartPieSlice, match: 85 },
    { name: 'Creative', Icon: Target, match: 72 },
    { name: 'Technology', Icon: Cube, match: 66 },
  ];
  return <section className="explore-journey explorer-profile" aria-label="Explore">
    <header className="explore-profile-header"><h1>Here’s what we’re<br />discovering<br />about you.</h1><Mascot size={100} className="explore-profile-robot !filter-none" /></header>
    <p className="explore-lead">Your results show your top interests,<br />strengths, and values. This is your<br />starting point, not a limit.</p>
    <h2>Top Interests</h2>
    <div className="explore-interests">{interests.map(({ name, Icon: InterestIcon, match }) => <article key={name} className="explore-interest"><InterestIcon size={31} weight="duotone" aria-hidden="true" /><strong>{name}</strong><span>{match}%</span></article>)}</div>
    <h2>Key Strengths</h2><Tags values={['Problem Solving', 'Communication', 'Leadership']} />
    <h2>Core Values</h2><Tags values={['Impact', 'Growth', 'Independence']} />
    <aside className="explore-support"><Mascot size={66} className="shrink-0 !filter-none" /><p>You're not defined by one result.<br />Think of this as your starting point. <Sparkle size={12} className="inline" /></p></aside>
    <button type="button" className="explore-primary" onClick={discover}>Explore My Possibilities</button>
  </section>;
}

export function DiscoverPossibilities({ directions = false, filter, setFilter, search, setSearch, chooseField, back }: { directions?: boolean; filter: string; setFilter: (value: string) => void; search: string; setSearch: (value: string) => void; chooseField: (id: string) => void; back: () => void }) {
  const results = (directions ? campaignDirections : possibilities).filter(item => {
    const field = fields.find(f => f.id === item.id)!;
    return (filter === 'All' || item.category === filter) && `${item.title} ${item.description} ${field.name} ${field.careers.join(' ')}`.toLowerCase().includes(search.trim().toLowerCase());
  });
  return <section className="explore-journey discover-possibilities" aria-label="Discover Possibilities">
    <header className="discover-header"><h1>Your possibilities<br />are bigger than<br />you think.</h1><button type="button" className="discover-back" aria-label="Go back" onClick={back}><ArrowLeft size={20} /></button></header>
    <p className="explore-lead">Explore fields that connect with what<br />you’ve discovered about yourself.</p>
    <label className="explore-search"><MagnifyingGlass size={21} /><input aria-label="Search fields or careers" placeholder="Search fields or careers..." value={search} onChange={event => setSearch(event.target.value)} /></label>
    <div className="explore-filters">{['All', 'Business', 'Creative', 'Tech'].map(value => <button type="button" key={value} aria-pressed={value === filter} onClick={() => setFilter(value)}>{value}</button>)}</div>
    <div className="possibility-list">{results.map(({ id, title, description, Icon: FieldIcon, match }) => <button type="button" className="possibility-card" key={id} onClick={() => chooseField(id)}><span className="possibility-icon" data-field={id}><FieldIcon size={28} aria-hidden="true" /></span><span className="min-w-0 flex-1"><strong>{title}</strong><span className="possibility-description">{description}</span><MatchBadge value={match} /></span><CaretRight size={18} weight="bold" className="shrink-0" /></button>)}</div>
    {!results.length && <p className="py-6 text-center text-sm text-grit-muted">No matches yet. Try another search or category.</p>}
  </section>;
}

export function CareerDetail({ field, profile, update, chooseMission, back }: { field: Field; profile: Profile; update: (part: Partial<Profile>) => void; chooseMission: (id: string) => void; back: () => void }) {
  const saved = profile.saved.includes(field.id);
  const toggleSaved = () => update({ saved: saved ? profile.saved.filter(id => id !== field.id) : [...profile.saved, field.id] });
  const tags = field.id === 'marketing' ? ['Creative', 'Communication', 'Business'] : field.tags.slice(0, 3);
  const reasons = field.id === 'marketing' ? ['You enjoy communicating', 'You like creative problem solving', 'You enjoy understanding people'] : field.activities.slice(0, 3).map(activity => `Try ${activity.toLowerCase()}`);
  return <section className="explore-journey career-detail" aria-label="Career Detail">
    <DetailTopBar back={back} saved={saved} toggleSaved={toggleSaved} />
    <header className="career-heading"><span className="career-icon"><Icon name={field.icon} size={32} /></span><div><h1>{field.name}</h1><Tags values={tags} /></div></header>
    <WorkspaceImage />
    <h2>What is it?</h2><p className="explore-body">{field.id === 'marketing' ? 'Marketing connects products and people through ideas, strategy, and communication.' : field.summary}</p>
    <h2>Why it may fit you</h2><ul className="career-reasons">{reasons.map(reason => <li key={reason}><Check size={16} weight="bold" aria-hidden="true" />{reason}</li>)}</ul>
    <h2>Related careers</h2><Tags values={field.careers} />
    <div className="explore-actions"><button type="button" className="explore-primary" onClick={() => chooseMission(field.mission)}>Try This Field</button><button type="button" className="explore-secondary" aria-pressed={saved} onClick={toggleSaved}>{saved ? 'Saved for Later' : 'Save for Later'}</button></div>
  </section>;
}

export function TryMission({ mission, field, profile, update, back, start }: { mission: Mission; field: Field; profile: Profile; update: (part: Partial<Profile>) => void; back: () => void; start: () => void }) {
  const [filter, setFilter] = useState('All');
  const saved = profile.saved.includes(field.id);
  const visible = filter !== 'Creative' || mission.skills.some(skill => ['Creativity', 'Design'].includes(skill));
  return <section className="explore-journey try-mission" aria-label="Try a Mission"><DetailTopBar back={back} saved={saved} toggleSaved={() => update({ saved: saved ? profile.saved.filter(id => id !== field.id) : [...profile.saved, field.id] })} />
    <h1>Don’t just imagine it.<br />Try it.</h1><p className="explore-lead">Real experiences help you understand<br />what fits you.</p>
    <div className="explore-filters">{['All', 'Popular', 'Beginner', 'Creative'].map(value => <button type="button" key={value} aria-pressed={value === filter} onClick={() => setFilter(value)}>{value}</button>)}</div>
    {visible ? <><article className="try-mission-card"><WorkspaceImage mission /><div className="mission-preview-content"><h2>{mission.title}</h2><Tags values={[field.name, 'Beginner']} /><div className="mission-preview-meta"><span><Clock size={20} />{mission.time}</span><strong><Sparkle size={21} />+{mission.xp} XP</strong></div><p className="explore-body">{mission.goal}</p><h3>Skills you’ll practice</h3><Tags values={mission.skills} /></div></article><button type="button" className="explore-primary" onClick={start}>Start Mission</button></> : <p className="py-6 text-sm text-grit-muted">This mission focuses on other skills. Choose All to try it.</p>}
  </section>;
}
