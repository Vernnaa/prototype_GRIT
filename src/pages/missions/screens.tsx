import type { ReactNode } from 'react';
import {
  ArrowRight,
  Camera,
  Check,
  Lightbulb,
} from '@phosphor-icons/react';
import { fields, missions, type Field, type Mission } from '../../content';
import { completeMission, type Profile, type Reflection } from '../../model';
import { Bar, Button, Card, Chip, Icon, Label } from '../../components/AppUI';

type SetProfile = (update: (profile: Profile) => Profile) => void;

export function MissionWorkspace({
  mission,
  profile,
  setProfile,
  go,
  top,
  bottom,
  coaching,
}: {
  mission: Mission;
  profile: Profile;
  setProfile: SetProfile;
  go: (screen: 'reflection' | 'missions') => void;
  top: (name: string) => ReactNode;
  bottom: (content: ReactNode) => ReactNode;
  coaching: (text: string) => ReactNode;
}) {
  const steps = profile.steps[mission.id] || [];
  return (
    <div className="relative h-full bg-white px-5 pt-3">
      {top('')}
      <h1 className="mt-3 text-[25px] font-extrabold leading-tight tracking-[-.05em]">
        {mission.title}
      </h1>
      <p className="mt-3 text-[13px] text-navy/65">
        {steps.length} / {mission.steps.length} steps completed · {mission.time}
      </p>
      <div className="my-5">
        <Bar value={(steps.length / mission.steps.length) * 100} />
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
            className="flex min-h-[68px] w-full items-center gap-3 rounded-2xl border border-navy/8 bg-white p-2.5 text-left shadow-sm"
          >
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-extrabold ${steps.includes(i) ? 'bg-navy text-lime' : 'bg-paper'}`}
            >
              {steps.includes(i) ? <Check size={18} /> : i + 1}
            </span>
            <span className="text-[13px] font-semibold">
              {s}
              <small className="block pt-1 font-medium text-navy/50">
                  {steps.includes(i) ? 'Completed' : 'Tap when you’re done'}
              </small>
            </span>
          </button>
        ))}
      </div>
      <div className="mt-6">
        {coaching('You’re doing great. One step at a time.')}
      </div>
      <label className="mt-4 flex min-h-11 items-center gap-2 text-xs font-bold">
        <Camera size={18} />
        <span>Optional: add a photo of your work</span>
        <input type="file" accept="image/*" className="max-w-24 text-[10px]" />
      </label>
      {bottom(
        <>
          <Button
            variant="navy"
            disabled={steps.length < mission.steps.length}
            onClick={() => {
              setProfile((p) => completeMission(p, mission.id, mission.xp));
              go('reflection');
            }}
          >
            Finish & Reflect <ArrowRight size={17} />
          </Button>
          <button
            onClick={() => go('missions')}
            className="mt-2 w-full py-2 text-xs font-bold"
          >
            Save progress & exit
          </button>
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
  headline,
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
  go: (screen: 'insight') => void;
  top: (name: string) => ReactNode;
  headline: (title: string, sub: string) => ReactNode;
  bottom: (content: ReactNode) => ReactNode;
}) {
  return (
    <div className="relative h-full bg-white px-5 pt-3">
      {top('Reflect')}
      {headline(
        'How did that feel?',
        'Your experience matters. Let’s reflect on what you just did.',
      )}
      <h2 className="mb-3 text-sm font-extrabold">Did you enjoy this?</h2>
      <div className="mb-6 grid grid-cols-4 gap-2">
        {['Loved it', 'Liked it', 'It was okay', 'Not for me'].map((x, i) => (
          <button
            aria-pressed={feeling === x}
            onClick={() => setFeeling(x)}
            key={x}
            className={`flex min-h-[92px] flex-col items-center justify-center rounded-xl border-2 p-1 text-center text-[11px] font-bold ${feeling === x ? 'border-lime bg-navy text-white' : 'border-navy/8 bg-white'}`}
          >
            <span
              className={`mb-2 text-xl ${feeling === x ? 'text-lime' : 'text-purple'}`}
            >
              {['☺', '◡', '○', '⌢'][i]}
            </span>
            {x}
          </button>
        ))}
      </div>
      <label className="block text-[13px] font-extrabold">
        What did you enjoy most?
        <textarea
          value={enjoyed}
          onChange={(e) => setEnjoyed(e.target.value)}
          placeholder="The part that felt good..."
          className="mt-2 h-20 w-full resize-none rounded-xl border border-navy/10 bg-white p-3 text-xs font-medium"
        />
      </label>
      <label className="mt-5 block text-[13px] font-extrabold">
        What felt challenging?
        <textarea
          value={challenge}
          onChange={(e) => setChallenge(e.target.value)}
          placeholder="The tricky part..."
          className="mt-2 h-20 w-full resize-none rounded-xl border border-navy/10 bg-white p-3 text-xs font-medium"
        />
      </label>
      <div className="mt-5">
        <h2 className="mb-3 text-[13px] font-extrabold">Would you like to try something similar?</h2>
        <div className="grid grid-cols-2 gap-2">
          {['Yes', 'Not sure yet'].map((x) => (
            <Chip key={x} active={again === x} onClick={() => setAgain(x)}>
              {x}
            </Chip>
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
              reflections: [
                ...p.reflections.filter((r) => r.mission !== mission.id),
                result,
              ],
            }));
            go('insight');
          }}
        >
          See What We Learned <ArrowRight size={17} />
        </Button>,
      )}
    </div>
  );
}

export function Missions({
  suggested,
  headline,
  chooseMission,
  onProgress,
  missionCard,
}: {
  suggested: Mission;
  headline: (text: string, sub: string) => ReactNode;
  chooseMission: (id: string) => void;
  onProgress: () => void;
  missionCard: (mission: Mission) => ReactNode;
}) {
  return (
    <div className="bg-white px-5 pt-5">
      {headline(
        'Don’t just imagine it. Try it.',
        'Real experiences help you understand what fits you.',
      )}
      <div className="mb-5 flex gap-2">
        <Chip active>All</Chip>
        <Chip onClick={() => chooseMission(suggested.id)}>For you</Chip>
        <Chip onClick={onProgress}>Completed</Chip>
      </div>
      <Card onClick={() => chooseMission(suggested.id)} className="mb-5 overflow-hidden !p-0">
        <div className="flex h-40 items-center justify-center bg-[#e8e4ff] text-purple"><Icon name={suggested.icon} size={92} /></div>
        <div className="p-4"><h2 className="text-[19px] font-extrabold leading-tight">{suggested.title}</h2><p className="mt-2 text-xs font-bold text-navy/60">{fields.find(f => f.id === suggested.field)?.name} · Beginner</p><p className="mt-3 text-xs text-navy/70">{suggested.time} · +{suggested.xp} XP</p><p className="mt-2 text-[13px] text-navy/70">{suggested.goal}</p></div>
      </Card>
      <Button onClick={() => chooseMission(suggested.id)} className="mb-6">Start Mission</Button>
      <h2 className="mb-3 text-[16px] font-extrabold">More to try</h2>
      {missions.map(missionCard)}
    </div>
  );
}

export function MissionDetail({
  mission,
  profile,
  top,
  headline,
  sections,
  bottom,
  onStart,
}: {
  mission: Mission;
  profile: Profile;
  top: (title: string) => ReactNode;
  headline: (text: string, sub: string) => ReactNode;
  sections: (items: string[]) => ReactNode;
  bottom: (content: ReactNode) => ReactNode;
  onStart: () => void;
}) {
  return (
    <div className="relative h-full bg-white px-5 pt-3">
      {top('Mission details')}
      <div className="mt-4 flex h-36 items-center justify-center rounded-[22px] bg-[#e8e4ff] text-purple"><Icon name={mission.icon} size={84} /></div>
      <div className="mt-5">{headline(mission.title, mission.goal)}</div>
      <div className="mb-5 flex gap-2">
        {sections([
          fields.find((f) => f.id === mission.field)?.name || '',
          'Beginner',
          mission.time,
          `+${mission.xp} XP`,
        ])}
      </div>
      <Label>WHAT YOU’LL DO</Label>
      <div className="space-y-2">
        {mission.steps.map((s, i) => (
          <div
            key={s}
            className="flex items-center gap-3 rounded-xl bg-white p-3 text-xs font-bold"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime">
              {i + 1}
            </span>
            {s}
          </div>
        ))}
      </div>
      <div className="mt-5">
        <Label>SKILLS YOU’LL EXPLORE</Label>
        {sections(mission.skills)}
      </div>
      {bottom(
        <Button onClick={onStart}>
          {profile.completed.includes(mission.id)
            ? 'View Mission'
            : 'Start Mission'}{' '}
          <ArrowRight size={17} />
        </Button>,
      )}
    </div>
  );
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
