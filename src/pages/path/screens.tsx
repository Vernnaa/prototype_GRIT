import type { ReactNode } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CaretRight,
  Check,
  Compass,
  PencilSimple,
} from '@phosphor-icons/react';
import { fields, missions, type Field, type Mission } from '../../content';
import type { Profile } from '../../model';
import { Button, Card, Icon, Label } from '../../components/AppUI';
import type { Screen } from '../../components/AppShell';

export function Direction({
  profile,
  ranked,
  top,
  headline,
  chooseField,
  build,
  explore,
}: {
  profile: Profile;
  ranked: Field[];
  top: (name: string) => ReactNode;
  headline: (title: string, sub: string) => ReactNode;
  chooseField: (id: string) => void;
  build: () => void;
  explore: () => void;
}) {
  return (
    <div className="px-5 pt-3">
      {top('My direction')}
      {headline(
        'You’re starting to see your direction.',
        'What you’ve tried is giving you clues. Your direction can always change.',
      )}
      <div className="mb-5 flex items-center justify-between rounded-2xl bg-navy p-4 text-[10px] font-bold text-white">
        {['YOU', 'EXPERIENCES', 'INTERESTS', 'POSSIBILITIES'].map((x, i) => (
          <span key={x} className="flex items-center gap-1">
            {i > 0 && <span className="text-lime">→</span>}
            {x}
          </span>
        ))}
      </div>
      <Label>YOUR TOP DIRECTIONS</Label>
      {ranked.slice(0, 3).map((f, i) => (
        <Card key={f.id} className="mb-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple/15 text-sm font-extrabold text-purple">
              {i + 1}
            </span>
            <div className="flex-1">
              <p className="text-sm font-extrabold">{f.name}</p>
              <p className="text-[11px] text-navy/55">
                Why it might fit: {f.tags.slice(0, 2).join(' + ')}
              </p>
            </div>
            <button
              onClick={() => chooseField(f.id)}
              aria-label={`Explore ${f.name}`}
            >
              <ArrowUpRight size={18} />
            </button>
          </div>
          <p className="mt-3 text-[11px]">
            Tried:{' '}
            {profile.completed
              .map((id) => missions.find((m) => m.id === id)?.title)
              .filter(Boolean)
              .join(', ') || 'Your first experience is waiting'}
          </p>
          <p className="mt-1 text-[11px] text-purple">
            Next: {missions.find((m) => m.id === f.mission)?.title}
          </p>
        </Card>
      ))}
      <Button onClick={build}>Build My Path</Button>
      <button className="mt-3 w-full p-2 text-xs font-bold" onClick={explore}>
        Keep Exploring
      </button>
    </div>
  );
}

export function MyPath({
  profile,
  mission,
  headline,
  go,
}: {
  profile: Profile;
  mission: Mission;
  headline: (title: string, sub: string) => ReactNode;
  go: (screen: Screen) => void;
}) {
  const chosen = fields.find((f) => f.id === profile.direction);
  const nodes = [
    [
      'EXPLORE',
      'Discover your interests',
      profile.answers[0].length > 0,
      'explore',
    ],
    [
      'EXPERIENCE',
      `Complete ${mission.title.toLowerCase()}`,
      profile.completed.length > 0,
      'missions',
    ],
    [
      'REFLECT',
      'Identify what you enjoyed',
      profile.reflections.length > 0,
      'direction',
    ],
    [
      'BUILD',
      `Develop ${chosen?.name || 'your'} fundamentals`,
      profile.milestones.includes('build'),
      'recommend',
    ],
    [
      'EXPERIENCE',
      'Try another challenge',
      profile.completed.length > 1,
      'missions',
    ],
    [
      'PROGRESS',
      'Build your first portfolio project',
      profile.milestones.includes('portfolio'),
      'recommend',
    ],
  ] as const;
  return (
    <div className="px-5 pt-5">
      {headline('Your Path', 'Your path can change as you grow.')}
      <div className="mb-4 flex items-center justify-between rounded-2xl bg-navy p-4 text-white">
        <div>
          <p className="text-[10px] font-bold text-lime">POSSIBLE DIRECTION</p>
          <p className="text-lg font-extrabold">
            {chosen?.name || 'Still exploring'}
          </p>
        </div>
        <button aria-label="Change direction" onClick={() => go('direction')}>
          <PencilSimple size={19} />
        </button>
      </div>
      <div className="mt-7">
        {nodes.map(([name, desc, done, target], i) => (
          <button
            type="button"
            key={i}
            onClick={() => go(target)}
            className="road-line relative flex w-full gap-4 pb-6 text-left"
          >
            <span
              className={`relative z-[1] flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${done ? 'bg-lime' : 'bg-white ring-2 ring-purple/40'}`}
            >
              {done ? <Check size={17} weight="bold" /> : i + 1}
            </span>
            <div className="flex-1 rounded-2xl bg-white p-3">
              <p className="text-[10px] font-extrabold text-purple">
                {name} · {done ? 'DONE' : '+50 XP'}
              </p>
              <p className="mt-1 text-xs font-bold">{desc}</p>
            </div>
          </button>
        ))}
      </div>
      <Button onClick={() => go('recommend')}>
        Continue My Path <ArrowRight size={17} />
      </Button>
      <button
        onClick={() => go('roadmap')}
        className="w-full py-4 text-xs font-bold text-purple"
      >
        View career roadmap ↗
      </button>
    </div>
  );
}

export function Recommend({
  suggested,
  ranked,
  top,
  headline,
  chooseMission,
  learn,
  chooseField,
}: {
  suggested: Mission;
  ranked: Field[];
  top: (name: string) => ReactNode;
  headline: (title: string, sub: string) => ReactNode;
  chooseMission: (id: string) => void;
  learn: () => void;
  chooseField: (id: string) => void;
}) {
  return (
    <div className="px-5 pt-3">
      {top('For you')}
      {headline(
        'What’s next for you?',
        'Three small moves. Pick the one that feels right.',
      )}
      <Card className="mb-4 !bg-navy text-white">
        <p className="mb-3 text-[10px] font-extrabold tracking-widest text-lime">
          RECOMMENDED NEXT STEP
        </p>
        <div className="mb-4 flex items-center gap-4">
          <span className="rounded-2xl bg-purple p-3">
            <Icon name={suggested.icon} size={28} />
          </span>
          <div>
            <h2 className="text-lg font-extrabold">{suggested.title}</h2>
            <p className="text-xs text-white/70">
              {suggested.time} · +{suggested.xp} XP
            </p>
          </div>
        </div>
        <Button onClick={() => chooseMission(suggested.id)}>
          Start Now <ArrowRight size={17} />
        </Button>
      </Card>
      <Card onClick={learn} className="mb-3 flex items-center gap-3">
        <BookOpen size={23} className="text-purple" />
        <span className="flex-1 text-sm font-bold">
          Learn {ranked[0].name} basics
          <small className="block text-navy/50">
            30 min · Mark as explored
          </small>
        </span>
        <CaretRight size={17} />
      </Card>
      <Card
        onClick={() => chooseField(ranked[1]?.id || ranked[0].id)}
        className="flex items-center gap-3"
      >
        <Compass size={23} className="text-purple" />
        <span className="flex-1 text-sm font-bold">
          Explore {ranked[1]?.name || 'another direction'}
          <small className="block text-navy/50">5 min</small>
        </span>
        <CaretRight size={17} />
      </Card>
    </div>
  );
}
