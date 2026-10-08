import { useState, type ReactNode } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  CaretRight,
  Compass,
  ClipboardText,
  Flame,
  SquaresFour,
  User,
} from '@phosphor-icons/react';
import { fields, missions, type Field, type Mission } from '../../content';
import { level, levelNames, type Profile, type Reflection } from '../../model';
import { Achievements } from '../progress/Achievements';
import { Button, Card, Icon, Label } from '../../components/AppUI';
import { MatchBadge } from '../explore/journey';

export function Direction({
  profile,
  ranked,
  top,
  headline,
  chooseField,
  build,
  explore,
  discover,
  mission,
  reflection,
  back,
}: {
  profile: Profile;
  ranked: Field[];
  top: (name: string) => ReactNode;
  headline: (title: string, sub: string) => ReactNode;
  chooseField: (id: string) => void;
  build: () => void;
  explore: () => void;
  discover: () => void;
  mission?: Mission;
  reflection?: Reflection;
  back?: () => void;
}) {
  if (mission && reflection && back) {
    const directions = mission.id === 'campaign'
      ? ['marketing', 'entrepreneurship', 'consulting'].map(id => fields.find(field => field.id === id)!)
      : ranked.slice(0, 3);
    const descriptions: Record<string, string> = {
      marketing: 'You enjoyed creative problem solving and communication.',
      entrepreneurship: 'You like building ideas and creating value.',
      consulting: 'You enjoy analyzing and finding solutions.',
    };
    return <section className="mission-flow mission-direction" aria-label="Your Direction">
      <button type="button" className="mission-back" aria-label="Go back" onClick={back}><ArrowLeft size={23} /></button>
      <h1 className="mt-3 line-clamp-4 text-[28px] leading-[1.05] font-extrabold tracking-[-.04em] break-words">
        {reflection.feeling === 'Not for me' ? 'Knowing what feels right is progress, too.' : mission.id === 'campaign' ? <>You seem to enjoy<br />planning, presenting,<br />and solving problems.</> : <>You seem to enjoy<br />{reflection.enjoyed.replace(/[.!?]+$/, '')}.</>}
      </h1>
      <p className="mt-2 text-[14px] text-[#5B6980]">That may be a sign worth exploring.</p>
      <div className="mt-4 space-y-3">
        {directions.map((field, i) => <button type="button" key={field.id} onClick={() => chooseField(field.id)} className="mission-direction-card">
          <svg viewBox="0 0 64 64" className="h-[50px] w-[50px] shrink-0" aria-hidden="true">
            <circle cx="32" cy="32" r="32" fill={['#EAE7FF', '#EEF5FA', '#EAE7FF'][i]} />
            <path d="M9 64v-8c0-12 10-19 23-19s23 7 23 19v8Z" fill={['#6557F5', '#062B49', '#6557F5'][i]} />
            <path d="M26 34h12v10l-6 5-6-5Z" fill="#BD825F" />
            <ellipse cx="32" cy="25" rx="13" ry="16" fill={['#DCA47D', '#BB7F59', '#E0B292'][i]} />
            <path d={i === 1 ? 'M18 25V15c0-12 29-13 28 4l-5 9-3-12-16 4v8Z' : 'M18 27V17c0-16 28-14 28 0v11l-5-7-5-8-13 8-2 9Z'} fill="#03233D" />
            <path d="M27 31q5 5 10 0" fill="none" stroke="#062B49" strokeWidth="1.5" strokeLinecap="round" />
            <path d="m25 44 7 5 7-5-7 17Z" fill="#C8FF00" />
          </svg>
          <span className="min-w-0 flex-1">
            <strong className="block text-[15px] font-extrabold">{field.name}</strong>
            <span className="mt-1 block text-[11px] leading-[1.35] text-[#5B6980]">{descriptions[field.id] || field.summary}</span>
            {mission.id === 'campaign' ? <MatchBadge value={[89, 76, 72][i]} /> : <span className="possibility-signal">Worth exploring</span>}
          </span>
          <ArrowRight size={20} className="shrink-0" aria-hidden="true" />
        </button>)}
      </div>
      <div className="mission-direction-actions space-y-2">
        <Button className="!bg-grit-lime !text-grit-navy" onClick={discover}>Explore These Directions</Button>
        <Button variant="outline" className="!border-grit-navy !bg-white !text-grit-navy" onClick={explore}>Keep Exploring</Button>
      </div>
    </section>;
  }
  return (
    <div className="bg-white px-5 pt-3">
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
        <Card key={f.id} className="mb-3 !p-3">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple/15 text-purple">
              <Icon name={f.icon} size={26} />
            </span>
            <div className="flex-1">
              <p className="text-[15px] font-extrabold">{f.name}</p>
              <p className="text-[11px] text-navy/55">
                Why it might fit: {f.tags.slice(0, 2).join(' + ')}
              </p>
              <span className="mt-2 inline-block rounded-full bg-lime px-2 py-0.5 text-[10px] font-bold">
                Direction {i + 1} to explore
              </span>
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
      <Button variant="outline" className="mt-2" onClick={explore}>
        Keep Exploring
      </Button>
    </div>
  );
}

function AchievementBadge({
  kind,
}: {
  kind: 'mission' | 'fields' | 'curious';
}) {
  return (
    <svg viewBox="0 0 64 64" className="mx-auto h-14 w-14" aria-hidden="true">
      <path d="M32 3 58 18v29L32 62 6 47V18Z" fill="#6557F5" />
      {kind === 'curious' ? (
        <>
          <path d="M32 5 55 18v25L32 56 9 43V18Z" fill="#C8FF00" />
          <path
            d="M27 18c-9 0-13 11-6 16-2 7 3 11 9 10v5h5v-5c7 0 11-6 8-11 6-6 1-15-6-15l-5 5Z"
            fill="#062B49"
          />
          <path d="M32 23v20" stroke="#6557F5" strokeWidth="3" />
        </>
      ) : (
        <>
          <path d="m32 9 20 12-20 12L12 21Z" fill="#03233D" />
          <path d="M12 21 32 33v23L12 44Z" fill="#062B49" />
          <path d="M32 33 52 21v23L32 56Z" fill="#071D3B" />
          {kind === 'mission' ? (
            <>
              <path d="m14 25 12 7v17l-12-7Z" fill="#9A8DFF" />
              <path
                d="M32 34v19M12 21 32 33"
                stroke="#C8FF00"
                strokeWidth="2"
              />
              <path
                d="M33 27V8l12 5-12 6"
                fill="#C8FF00"
                stroke="#062B49"
                strokeWidth="3"
                strokeLinejoin="round"
              />
            </>
          ) : (
            <>
              <path
                d="m19 26 13 7 13-7v14l-13 7-13-7ZM32 33v14M19 33l13 7 13-7"
                fill="none"
                stroke="#C8FF00"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </>
          )}
        </>
      )}
    </svg>
  );
}

export function MyPath({ profile }: { profile: Profile }) {
  const [tab, setTab] = useState<'progress' | 'achievements'>('progress');
  const currentLevel = level(profile.xp);
  const xpRequired = currentLevel * 250;
  const percentage = Math.max(
    0,
    Math.min(100, (profile.xp / xpRequired) * 100),
  );
  const stats = [
    { value: profile.streak, label: 'Day Streak', Icon: Flame },
    { value: profile.completed.length, label: 'Missions', Icon: ClipboardText },
    { value: profile.explored.length, label: 'Fields', Icon: SquaresFour },
    {
      value: new Set(
        profile.completed.flatMap(
          (id) => missions.find((m) => m.id === id)?.skills || [],
        ),
      ).size,
      label: 'Skills',
      Icon: User,
    },
  ];
  const achievements = [
    {
      kind: 'mission',
      title: 'First Mission',
      description: 'Completed your first mission',
      unlocked: profile.completed.length > 0,
    },
    {
      kind: 'fields',
      title: '3 Fields Explored',
      description: 'Explored three different fields',
      unlocked: profile.explored.length >= 3,
    },
    // ponytail: question count is not persisted; unlock once coach question tracking exists.
    {
      kind: 'curious',
      title: 'Curious Explorer',
      description: 'Asked 10+ thoughtful questions',
      unlocked: false,
    },
  ] as const;

  return (
    <section
      aria-label="My Path"
      className="min-h-full bg-white px-5 pt-[max(24px,env(safe-area-inset-top))] pb-20 text-grit-text max-[359px]:px-4"
    >
      <h1 className="text-[34px] leading-[1.05] font-extrabold tracking-[-0.045em]">
        You're getting
        <br />
        closer.
      </h1>
      <div
        role="group"
        aria-label="My Path view"
        className="mt-4 mb-4 grid h-11 grid-cols-2 rounded-full bg-grit-gray p-[3px]"
      >
        {(['progress', 'achievements'] as const).map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={tab === value}
            aria-controls="my-path-content"
            onClick={() => setTab(value)}
            className={`rounded-full text-[13px]! font-bold! transition-colors ${tab === value ? 'bg-grit-navy text-white' : 'text-grit-navy hover:bg-grit-border'}`}
          >
            {value === 'progress' ? 'Progress' : 'Achievements'}
          </button>
        ))}
      </div>
      <div id="my-path-content">
        {tab === 'achievements' ? (
          <Achievements profile={profile} />
        ) : (
          <>
            <section
              aria-label="Level progress"
              className="flex items-center gap-4 rounded-[18px] border border-grit-border p-4 max-[359px]:gap-3 max-[359px]:p-3"
            >
              <div className="relative h-[120px] w-[120px] shrink-0 max-[359px]:h-[110px] max-[359px]:w-[110px]">
                <svg
                  viewBox="0 0 120 120"
                  className="h-full w-full"
                  aria-hidden="true"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="#062B49"
                    strokeWidth="13"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="#C8FF00"
                    strokeWidth="13"
                    pathLength="100"
                    strokeDasharray={`${percentage} 100`}
                    strokeLinecap={percentage > 0 ? 'round' : 'butt'}
                    transform="rotate(90 60 60)"
                  />
                  <path d="m61 30 19 38-19 21-20-21Z" fill="#6557F5" />
                  <path d="m61 30-20 38 20-9Z" fill="#A99BFF" />
                  <path d="m61 30 19 38-19-9Z" fill="#7C6AFF" />
                  <path d="m41 68 20-9v30Z" fill="#6557F5" />
                  <path d="m61 59 19 9-19 21Z" fill="#4235BB" />
                  <path d="m61 30-10 38" stroke="#EAE7FF" strokeWidth="2" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-[26px] leading-tight font-extrabold tracking-[-0.035em]">
                  Level {currentLevel}
                </h2>
                <p className="mt-1 text-[20px] leading-tight font-extrabold text-grit-lime">
                  {levelNames[currentLevel - 1]}
                </p>
                <div className="my-3 h-[3px] w-8 rounded-full bg-grit-purple" />
                <p className="text-[13px] whitespace-nowrap tabular-nums">
                  <strong className="font-extrabold">
                    {profile.xp.toLocaleString('en-US')}
                  </strong>{' '}
                  / {xpRequired.toLocaleString('en-US')} XP
                </p>
                <div
                  role="progressbar"
                  aria-label="XP progress"
                  aria-valuemin={0}
                  aria-valuemax={xpRequired}
                  aria-valuenow={Math.min(xpRequired, Math.max(0, profile.xp))}
                  aria-valuetext={`${profile.xp} / ${xpRequired} XP`}
                  className="mt-2 h-[9px] overflow-hidden rounded-full bg-grit-gray"
                >
                  <div
                    className="h-full rounded-full bg-grit-lime"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </section>
            <div className="mt-4 grid grid-cols-4 gap-2 max-[359px]:gap-1.5">
              {stats.map(({ value, label, Icon: StatIcon }) => (
                <article
                  key={label}
                  className="flex min-w-0 flex-col items-center rounded-[13px] border border-grit-border px-1 py-3 text-center"
                >
                  <StatIcon
                    size={23}
                    weight="fill"
                    className="text-grit-purple"
                    aria-hidden="true"
                  />
                  <strong className="mt-1.5 text-[22px] leading-tight font-extrabold tabular-nums">
                    {value}
                  </strong>
                  <p className="mt-1 text-[10px] leading-tight font-medium whitespace-nowrap text-grit-muted">
                    {label}
                  </p>
                </article>
              ))}
            </div>
            <section className="mt-6" aria-labelledby="recent-achievements">
              <h2
                id="recent-achievements"
                className="text-[19px] font-extrabold tracking-[-0.025em]"
              >
                Recent Achievements
              </h2>
              <div className="mt-3 grid grid-cols-3 gap-2 max-[359px]:gap-1.5">
                {achievements.map((achievement) => (
                  <article
                    key={achievement.kind}
                    className="flex min-h-[166px] min-w-0 flex-col items-center rounded-[13px] border border-grit-border px-2 py-3 text-center max-[359px]:px-1"
                  >
                    <AchievementBadge kind={achievement.kind} />
                    <h3 className="mt-2 flex min-h-8 items-center justify-center text-[12px] leading-[1.2] font-extrabold">
                      {achievement.title}
                    </h3>
                    <p className="mt-2 text-[10px] leading-[1.35] text-grit-muted">
                      {achievement.description}
                    </p>
                    <span
                      className={`mt-auto pt-2 text-[9px] font-semibold ${achievement.unlocked ? 'text-grit-purple' : 'text-grit-muted'}`}
                    >
                      {achievement.unlocked ? 'Unlocked' : 'Locked'}
                    </span>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </section>
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
