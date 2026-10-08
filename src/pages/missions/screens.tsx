import { useState, type ReactNode } from 'react';
import {
  ArrowRight,
  Smiley,
  SmileyMeh,
  SmileySad,
  SmileyWink,
  Lightbulb,
  CaretRight,
  Clock,
  Sparkle,
} from '@phosphor-icons/react';
import { fields, missions, type Field, type Mission } from '../../content';
import { completeMission, type Profile, type Reflection } from '../../model';
import { Button, Card, Icon, Label, Mascot } from '../../components/AppUI';

type SetProfile = (update: (profile: Profile) => Profile) => void;

export function MissionWorkspace({
  mission,
  profile,
  setProfile,
  go,
  top,
  bottom,
}: {
  mission: Mission;
  profile: Profile;
  setProfile: SetProfile;
  go: (screen: 'reflection' | 'missions') => void;
  top: (name: string) => ReactNode;
  bottom: (content: ReactNode) => ReactNode;
}) {
  const steps = mission.steps.map((_, i) => i).filter(i => profile.steps[mission.id]?.includes(i));
  const currentStep = mission.steps.findIndex((_, i) => !steps.includes(i));
  return (
    <div className="mission-flow mission-workspace">
      {top('')}
      <h1 className="mt-3 text-[28px] font-extrabold leading-[1.05] tracking-[-.04em]">
        {mission.title}
      </h1>
      <p className="mt-2 text-[15px] text-[#5B6980]">
        {steps.length} / {mission.steps.length} Steps completed
      </p>
      <div className="mission-progress" role="progressbar" aria-label="Mission progress" aria-valuemin={0} aria-valuemax={mission.steps.length} aria-valuenow={steps.length}>
        <div style={{ width: `${steps.length / mission.steps.length * 100}%` }} />
      </div>
      <div className="space-y-2">
        {mission.steps.map((s, i) => (
          <button
            key={s}
            type="button"
            aria-pressed={steps.includes(i)}
            onClick={() =>
              setProfile((p) => {
                const current = p.steps[mission.id] || [];
                return {
                  ...p,
                  steps: {
                    ...p.steps,
                    [mission.id]: current.includes(i)
                      ? current.filter((n) => n !== i)
                      : [...current, i],
                  },
                };
              })
            }
            className="mission-step"
            data-status={steps.includes(i) ? 'completed' : i === currentStep ? 'current' : 'upcoming'}
          >
            <span
              className="mission-step-number"
            >
              {i + 1}
            </span>
            <span className="mission-step-card">
              {s}
              <small>
                  {steps.includes(i) ? 'Completed' : i === currentStep ? 'In progress' : 'Not started'}
              </small>
            </span>
          </button>
        ))}
      </div>
      <div className="mission-encouragement">
        <Mascot size={90} className="shrink-0 !filter-none" />
        <p>You're doing great.<br />One step at a time!</p>
      </div>
      {bottom(
        <>
          <Button
            variant="navy"
            onClick={() => {
              // ponytail: Continue simulates remaining work for the jury demo; require real submissions in production.
              setProfile((p) => completeMission({ ...p, steps: { ...p.steps, [mission.id]: mission.steps.map((_, i) => i) } }, mission.id, mission.xp));
              go('reflection');
            }}
          >
            Continue
          </Button>
        </>,
      )}
    </div>
  );
}

export function MissionReflection({
  mission,
  feeling,
  setFeeling,
  enjoyed,
  setEnjoyed,
  challenge,
  setChallenge,
  again,
  setAgain,
  setError,
  setProfile,
  go,
  top,
  bottom,
}: {
  mission: Mission;
  feeling: string;
  setFeeling: (value: string) => void;
  enjoyed: string;
  setEnjoyed: (value: string) => void;
  challenge: string;
  setChallenge: (value: string) => void;
  again: string;
  setAgain: (value: string) => void;
  setError: (value: string) => void;
  setProfile: SetProfile;
  go: (screen: 'mission-direction' | 'discover') => void;
  top: (name: string) => ReactNode;
  bottom: (content: ReactNode) => ReactNode;
}) {
  return (
    <div className="mission-flow mission-reflection">
      {top('')}
      <h1 className="mt-3 text-[30px] font-extrabold leading-[1.05] tracking-[-.04em]">How did that feel?</h1>
      <p className="mt-2 mb-5 text-[14px] leading-[1.35] text-[#5B6980]">Your experience matters. Let's reflect<br />on what you just did.</p>
      <h2 className="mb-2 text-[14px] font-extrabold">Did you enjoy this?</h2>
      <div className="mb-5 grid grid-cols-4 gap-2">
        {['Loved it', 'Liked it', 'It was okay', 'Not for me'].map((x, i) => {
          const Face = [SmileyWink, Smiley, SmileyMeh, SmileySad][i];
          return (
          <button
            aria-pressed={feeling === x}
            onClick={() => { setFeeling(x); setError(''); }}
            key={x}
            type="button"
            className="emotion-option"
          >
            <Face size={30} aria-hidden="true" />
            {x}
          </button>
        );})}
      </div>
      <label className="block text-[14px] font-extrabold">
        What did you enjoy most?
        <textarea
          value={enjoyed}
          onChange={(e) => { setEnjoyed(e.target.value); setError(''); }}
          placeholder="The part that felt good..."
          className="mt-2 h-20 w-full resize-none rounded-xl border border-navy/10 bg-white p-3 text-xs font-medium"
        />
      </label>
      <label className="mt-5 block text-[14px] font-extrabold">
        What felt challenging?
        <textarea
          value={challenge}
          onChange={(e) => { setChallenge(e.target.value); setError(''); }}
          placeholder="The tricky part..."
          className="mt-2 h-20 w-full resize-none rounded-xl border border-navy/10 bg-white p-3 text-xs font-medium"
        />
      </label>
      <div className="mt-5">
        <h2 className="mb-2 text-[14px] font-extrabold">Do you sure to choose this path?</h2>
        <div className="grid grid-cols-2 gap-2">
          {['Yes, I choose this path', 'No, Explore Again'].map((x) => (
            <button type="button" key={x} aria-pressed={again === x} onClick={() => { setAgain(x); setError(''); }} className="similar-option">
              {x}
            </button>
          ))}
        </div>
      </div>
      {bottom(
        <Button
          variant="navy"
          onClick={() => {
            if (!feeling || !enjoyed.trim() || !challenge.trim() || !again) {
              setError('Add your thoughts to continue.');
              return;
            }
            const result: Reflection = {
              mission: mission.id,
              feeling,
              enjoyed: enjoyed.trim(),
              challenge: challenge.trim(),
              again,
            };
            setProfile((p) => ({
              ...p,
              direction: again === 'Yes, I choose this path' ? mission.field : p.direction,
              reflections: [
                ...p.reflections.filter((r) => r.mission !== mission.id),
                result,
              ],
            }));
            go(again === 'No, Explore Again' ? 'discover' : 'mission-direction');
          }}
        >
          See What We Learned
        </Button>,
      )}
    </div>
  );
}

export function Missions({
  profile,
  chooseMission,
}: {
  profile: Profile;
  chooseMission: (id: string) => void;
}) {
  const [filter, setFilter] = useState('All');
  const results = missions.filter(m => filter === 'All' || (filter === 'For you' ? m.id === 'campaign' : profile.completed.includes(m.id)));
  return <section className="explore-journey mission-list" aria-label="Mission list">
    <h1>Don’t just imagine it.<br />Try it.</h1>
    <p className="explore-lead">Real experiences help you understand what fits you.</p>
    <div className="explore-filters !grid-cols-3">{['All', 'For you', 'Completed'].map(value => <button type="button" key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{value}</button>)}</div>
    <div className="possibility-list">{results.map(m => <button type="button" key={m.id} className="possibility-card mission-list-card" onClick={() => chooseMission(m.id)}>
      <span className="possibility-icon" data-field={m.field}><Icon name={m.icon} size={27} /></span>
      <span className="min-w-0 flex-1"><strong>{m.title}</strong><span className="possibility-description">{fields.find(f => f.id === m.field)?.name} · Beginner</span><span className="mission-list-meta"><span><Clock size={14} />{m.time}</span><span><Sparkle size={14} />+{m.xp} XP</span></span>{m.id === 'campaign' && <span className="possibility-signal">Demo example</span>}{profile.completed.includes(m.id) && <span className="mission-list-status">Completed</span>}</span>
      <CaretRight size={18} className="shrink-0" />
    </button>)}</div>
    {!results.length && <p className="explore-body">No completed missions yet. Try the Marketing campaign first.</p>}
  </section>;
}

export function Insight({
  reflection,
  mission,
  ranked,
  fieldCard,
  top,
  headline,
  bottom,
  continueJourney,
}: {
  reflection?: Reflection;
  mission: Mission;
  ranked: Field[];
  fieldCard: (field: Field) => ReactNode;
  top: (title: string) => ReactNode;
  headline: (text: string, sub: string) => ReactNode;
  bottom: (content: ReactNode) => ReactNode;
  continueJourney: () => void;
}) {
  return (
    <div className="relative h-full bg-white px-5 pt-3">
      {top('Your insight')}
      <div className="mb-5 mt-8 flex h-24 w-24 items-center justify-center rounded-[26px] bg-lime">
        <Lightbulb size={52} weight="duotone" />
      </div>
      {headline(
        reflection?.feeling === 'Not for me'
          ? 'That’s useful to know, too.'
          : `You enjoyed ${reflection?.enjoyed || 'trying something new'}.`,
        'That may be a sign worth exploring. No single experience defines your future.',
      )}
      <Card className="mb-5">
        <Label>WHAT YOUR EXPERIENCE TELLS US</Label>
        <p className="text-xs leading-relaxed">
          {reflection?.feeling === 'Not for me'
            ? 'Knowing what does not energize you helps narrow what to try next.'
            : `You felt “${reflection?.feeling.toLowerCase()}” about ${mission.title.toLowerCase()}. You noticed a challenge: ${reflection?.challenge || 'something new'}.`}
        </p>
      </Card>
      <Label>POSSIBLE DIRECTIONS</Label>
      {ranked.slice(0, 3).map(fieldCard)}
      {bottom(
        <Button onClick={continueJourney}>
          Explore These Directions <ArrowRight size={17} />
        </Button>,
      )}
    </div>
  );
}
