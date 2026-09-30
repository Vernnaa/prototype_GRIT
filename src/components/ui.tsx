import type { PropsWithChildren, ReactNode } from 'react';
import { fields, fieldReason, type Field, type Mission } from '../data';
import type { State } from '../state';
import { navigate } from '../router';

export function Gritty({ mood = 'happy', size = 94 }: { mood?: 'happy' | 'thinking'; size?: number }) {
  const face = mood === 'thinking'
    ? <path d="M38 54h12m22 0h12M57 72h12" stroke="#B7F34A" strokeWidth="5" strokeLinecap="round"/>
    : <><rect x="38" y="47" width="13" height="17" rx="6" fill="#B7F34A"/><rect x="70" y="47" width="13" height="17" rx="6" fill="#B7F34A"/><path d="M53 72q7 7 15 0" stroke="#B7F34A" strokeWidth="4" strokeLinecap="round"/></>;
  return <svg role="img" aria-label="Gritty, your friendly robot companion" width={size} height={size} viewBox="0 0 120 120" fill="none"><path d="M24 100 15 111m81-11 9 11M60 21V9" stroke="#172033" strokeWidth="8" strokeLinecap="round"/><circle cx="60" cy="8" r="5" fill="#B7F34A"/><rect x="20" y="23" width="80" height="72" rx="29" fill="#172033"/><rect x="24" y="28" width="72" height="52" rx="22" fill="#26344C"/>{face}<path d="M20 53H9v18m91-18h11v18" stroke="#172033" strokeWidth="8" strokeLinecap="round"/><rect x="34" y="94" width="52" height="17" rx="8" fill="#172033"/><path d="M42 94v15m36-15v15" stroke="#B7F34A" strokeWidth="3"/></svg>;
}

export function Arrow({ children, onClick, kind = 'primary', disabled = false }: PropsWithChildren<{ onClick: () => void; kind?: 'primary' | 'dark'; disabled?: boolean }>) { return <button className={`button ${kind}`} type="button" onClick={onClick} disabled={disabled}>{children}<span aria-hidden="true">↗</span></button>; }
export function Top({ title, back, side }: { title: string; back: () => void; side?: ReactNode }) { return <header className="top"><button className="back" type="button" onClick={back} aria-label="Go back">←</button><span>{title}</span>{side || <span className="top-end"/>}</header>; }
const tabs = [['home', '⌂', 'Home'], ['explore', '✳', 'Explore'], ['missions', '◈', 'Missions'], ['path', '↗', 'My Path'], ['profile', '○', 'Profile']] as const;
type Page = typeof tabs[number][0] | 'field' | 'mission' | 'workspace' | 'reflection' | 'insight' | 'direction' | 'progress';
export function Nav({ page }: { page: Page }) { return <nav className="tabbar" aria-label="Main navigation">{tabs.map(([id, icon, label]) => <button type="button" className={page === id || (page === 'field' && id === 'explore') || (['mission', 'workspace', 'reflection'].includes(page) && id === 'missions') || (['direction', 'progress'].includes(page) && id === 'path') ? 'active' : ''} onClick={() => navigate(id)} key={id}><span aria-hidden="true">{icon}</span><small>{label}</small></button>)}</nav>; }
export function Section({ eyebrow, title, children }: PropsWithChildren<{ eyebrow: string; title?: string }>) { return <section className="section"><div className="eyebrow">{eyebrow}</div>{title && <h2>{title}</h2>}{children}</section>; }
export function FieldCard({ field, state, onClick }: { field: Field; state: State; onClick: () => void }) { return <button type="button" className="field-card" onClick={onClick}><span className="field-icon">{field.symbol}</span><span className="field-content"><strong>{field.name}</strong><small>{field.summary}</small><em>{fieldReason(field, state)}</em></span><span className="chevron">↗</span></button>; }
export function MissionCard({ mission, done, onClick }: { mission: Mission; done: boolean; onClick: () => void }) { return <button type="button" className="mission-card" onClick={onClick}><span className="mission-art">{mission.symbol}</span><span className="mission-text"><small>{fields.find(f => f.id === mission.field)?.name} · Beginner</small><strong>{mission.title}</strong><span>{mission.time} <b>✦ +{mission.xp} XP</b></span></span><span className="chevron">{done ? '✓' : '↗'}</span></button>; }
export function BottomAction({ children, error }: PropsWithChildren<{ error?: string }>) { return <div className="bottom-action">{error && <p className="error" role="alert">{error}</p>}{children}</div>; }
export function CoachNote({ children }: PropsWithChildren) { return <div className="coach-note"><Gritty size={46}/><p>{children}</p></div>; }
