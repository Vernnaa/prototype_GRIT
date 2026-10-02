import {
  ArrowLeft,
  ArrowRight,
  CalendarBlank,
  ChartBar,
  ChatCircleDots,
  Compass,
  Cube,
  Heart,
  Lightbulb,
  Palette,
  PaperPlaneTilt,
  Rocket,
  Sparkle,
  UsersThree,
} from '@phosphor-icons/react';
import { fields, questions } from '../../content';
import type { Profile } from '../../model';
import {
  Button,
  Card,
  Icon,
  Label,
  Logo,
  Mascot,
} from '../../components/AppUI';
import type { ReactNode } from 'react';

export function Splash({ onContinue }: { onContinue: () => void }) {
  return (
    <button
      onClick={onContinue}
      type="button"
      aria-label="Continue to welcome screen"
      className="onboarding-splash relative flex h-full w-full flex-col items-center overflow-hidden bg-navy text-white"
    >
      <div className="onboarding-splash-brand relative z-10">
        <Logo light />
        <p className="mt-1 text-[13px] font-extrabold tracking-[-.03em]">
          FROM DREAM <span className="text-lime">TO DIRECTION</span>
        </p>
      </div>
      <div
        className="onboarding-splash-art relative w-full flex-1"
        aria-hidden="true"
      >
        <span className="absolute bottom-[15%] left-[-5%] h-28 w-28 -rotate-12 rounded-[42%] bg-lime" />
        <span className="absolute right-[-7%] top-[22%] h-44 w-24 rotate-[-24deg] rounded-[50%] bg-lime" />
        <span className="absolute left-[12%] top-[25%] h-8 w-8 rounded-full border-l-2 border-t-2 border-lime" />
        <Mascot
          size={500}
          className="onboarding-splash-mascot absolute left-1/2 max-w-none -translate-x-1/2"
        />
      </div>
      <p className="onboarding-splash-tagline relative z-10 -rotate-6 text-center text-[22px] font-semibold italic leading-tight">
        A brighter you.
        <br />A bigger tomorrow.
      </p>
    </button>
  );
}

export function Welcome({
  onContinue,
  onDream,
}: {
  onContinue: () => void;
  onDream: () => void;
}) {
  return (
    <div className="onboarding-welcome relative flex h-full flex-col overflow-hidden bg-white">
      <div className="relative z-10 px-7 pt-16">
        <h1 className="text-[clamp(32px,9vw,40px)] font-extrabold leading-[1.04] tracking-[-.065em]">
          You don’t
          <br />
          have to know
          <br />
          your{' '}
          <mark className="rounded-md bg-lime px-1 text-navy">future yet.</mark>
        </h1>
        <p className="mt-5 max-w-[300px] text-[15px] leading-[1.5] text-navy/75">
          Explore who you are, try new possibilities, and find a direction that
          feels right for you.
        </p>
      </div>
      <div
        className="onboarding-welcome-art relative min-h-[150px] flex-1 overflow-hidden"
        aria-hidden="true"
      >
        <span className="absolute bottom-0 left-[-13%] h-24 w-40 -rotate-[25deg] rounded-3xl bg-navy" />
        <span className="absolute bottom-3 right-[-9%] h-28 w-36 rotate-[-34deg] rounded-3xl bg-purple" />
        <span className="absolute right-[9%] top-[17%] text-6xl font-light text-lime">
          ↗
        </span>
        <p className="absolute right-[7%] top-[4%] z-10 -rotate-12 text-right text-[13px] font-bold italic leading-tight">
          Same journey
          <br />
          brighter you!
        </p>
        <Mascot
          size={430}
          phone
          className="onboarding-welcome-mascot absolute left-1/2 max-w-none -translate-x-1/2"
        />
      </div>
      <div className="relative z-10 bg-navy px-5 pb-[max(32px,env(safe-area-inset-bottom))] pt-5">
        <Button onClick={onContinue} className="!rounded-full !text-[16px]">
          Start Exploring
        </Button>
        <button
          className="mt-4 w-full text-center text-xs font-bold text-white underline underline-offset-4"
          onClick={onDream}
        >
          I already know what I want
        </button>
      </div>
    </div>
  );
}

export function StartingPoint({
  profile,
  update,
  setError,
  back,
  bottom,
  go,
}: {
  profile: Profile;
  update: (part: Partial<Profile>) => void;
  setError: (message: string) => void;
  back: () => void;
  bottom: (content: ReactNode) => ReactNode;
  go: (screen: 'noidea' | 'interests' | 'quiz') => void;
}) {
  const choices = [
    {
      id: 'dream',
      name: 'I have a dream',
      desc: 'I know what I want to become.',
      Icon: Rocket,
    },
    {
      id: 'ideas',
      name: 'I have a few ideas',
      desc: 'I know what interests me, but I’m not sure yet.',
      Icon: Lightbulb,
    },
    {
      id: 'none',
      name: 'I have no idea',
      desc: 'I’m still figuring out what I want.',
      Icon: Compass,
    },
  ] as const;
  return (
    <div className="onboarding-start h-full bg-white px-5 pt-4">
      <div className="flex h-11 items-center gap-3">
        <button
          type="button"
          aria-label="Go back"
          onClick={back}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white"
        >
          <ArrowLeft size={19} />
        </button>
        <span className="text-xs font-extrabold" />
      </div>
      <div className="mb-6 mt-3">
        <h1 className="max-w-[310px] text-[34px] font-extrabold leading-[1.06] tracking-[-.06em]">
          Where are you
          <br />
          right now?
        </h1>
        <p className="mt-3 text-[14px] leading-relaxed text-navy/70">
          Everyone’s journey is different.
          <br />
          Tell us where you are so we can support you better.
        </p>
      </div>
      <div className="space-y-3">
        {choices.map(({ id, name, desc, Icon: ChoiceIcon }) => (
          <button
            type="button"
            key={id}
            aria-pressed={profile.start === id}
            onClick={() => {
              update({ start: id });
              setError('');
            }}
            className={`flex min-h-[116px] w-full items-center justify-between gap-2 overflow-hidden rounded-[18px] border-2 py-3 pl-5 pr-2 text-left ${profile.start === id ? 'border-lime bg-white' : 'border-navy/6 bg-white shadow-sm'}`}
          >
            <div className="min-w-0 flex-1">
              <strong className="text-[17px] font-extrabold tracking-[-.04em]">
                {name}
              </strong>
              <p className="mt-1 text-[13px] leading-snug text-navy/75">
                {desc}
              </p>
            </div>
            <span
              className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-[18px] ${id === 'dream' ? 'bg-[#e9eff8] text-navy' : id === 'ideas' ? 'bg-purple/10 text-purple' : 'bg-lime/15 text-purple'}`}
              aria-hidden="true"
            >
              <ChoiceIcon size={46} weight="duotone" />
            </span>
          </button>
        ))}
      </div>
      {profile.start === 'dream' && (
        <label className="mt-5 block text-xs font-bold">
          What’s your dream?
          <select
            className="mt-2 h-12 w-full rounded-xl border border-navy/20 bg-white px-3"
            value={profile.dream}
            onChange={(e) => update({ dream: e.target.value })}
          >
            <option value="">Choose a direction to explore</option>
            {fields.map((f) => (
              <option value={f.id} key={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </label>
      )}
      {bottom(
        <Button
          variant="navy"
          className="!rounded-full !text-[16px]"
          onClick={() => {
            if (!profile.start) {
              setError('Choose a starting point.');
              return;
            }
            if (profile.start === 'dream' && !profile.dream) {
              setError('Choose a direction to explore.');
              return;
            }
            go(
              profile.start === 'none'
                ? 'noidea'
                : profile.start === 'ideas'
                  ? 'interests'
                  : 'quiz',
            );
          }}
        >
          Continue
        </Button>,
      )}
    </div>
  );
}

export function Quiz({
  profile,
  q,
  setQ,
  setProfile,
  setError,
  onBack,
  bottom,
  onComplete,
}: {
  profile: Profile;
  q: number;
  setQ: (value: number) => void;
  setProfile: (update: (profile: Profile) => Profile) => void;
  setError: (value: string) => void;
  onBack: () => void;
  bottom: (content: ReactNode) => ReactNode;
  onComplete: () => void;
}) {
  const item = questions[q],
    choices = profile.answers[q];
  const activityIcons = [
    Palette,
    Lightbulb,
    Heart,
    UsersThree,
    ChartBar,
    Cube,
    ChatCircleDots,
    CalendarBlank,
    PaperPlaneTilt,
  ];
  return (
    <div className="onboarding-quiz relative h-full bg-white px-5 pt-4">
      <div className="flex items-center justify-between text-[13px] font-semibold text-navy/70">
        <span>
          Question {q + 1} of {questions.length}
        </span>
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg px-2 py-1 text-xs font-bold text-purple"
        >
          Back
        </button>
      </div>
      <div
        className="onboarding-quiz-progress mt-4 h-3 overflow-hidden rounded-full bg-navy/10"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={questions.length}
        aria-valuenow={q + 1}
        aria-label="Quiz progress"
      >
        <div
          className="h-full rounded-full bg-lime"
          style={{ width: `${((q + 1) / questions.length) * 100}%` }}
        />
      </div>
      <div className="mb-7 mt-7">
        <h1 className="text-[clamp(26px,8vw,32px)] font-extrabold leading-[1.1] tracking-[-.06em]">
          {item.title}
        </h1>
        <p className="mt-3 text-[14px] text-navy/70">Select up to 3 options</p>
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {item.choices.map((x, i) => {
          const ActivityIcon = activityIcons[i];
          return (
            <button
              type="button"
              aria-pressed={choices.includes(x)}
              onClick={() => {
                setError('');
                const next = choices.includes(x)
                  ? choices.filter((c) => c !== x)
                  : choices.length < 3
                    ? [...choices, x]
                    : choices;
                if (choices.length === 3 && !choices.includes(x)) {
                  setError('Choose up to 3 options.');
                  return;
                }
                setProfile((p) => ({
                  ...p,
                  answers: p.answers.map((v, j) => (j === q ? next : v)),
                }));
              }}
              key={x}
              className={`flex min-h-[112px] flex-col items-center justify-center gap-2 rounded-[18px] border-2 p-2 text-center text-[12px] font-semibold leading-tight ${choices.includes(x) ? 'border-lime bg-navy text-white' : 'border-navy/8 bg-white text-navy'}`}
            >
              {q === 0 ? (
                <ActivityIcon
                  size={32}
                  weight="duotone"
                  className={choices.includes(x) ? 'text-lime' : 'text-purple'}
                />
              ) : (
                <Icon
                  name={
                    [
                      'pen',
                      'lightbulb',
                      'heart',
                      'users',
                      'chart',
                      'code',
                      'chat',
                      'book',
                      'paperPlane',
                    ][i]
                  }
                  size={32}
                  className={choices.includes(x) ? 'text-lime' : 'text-purple'}
                />
              )}
              {x}
            </button>
          );
        })}
      </div>
      {bottom(
        <Button
          variant="navy"
          className="!rounded-full !text-[16px]"
          onClick={() => {
            if (!choices.length) {
              setError('Pick at least one option.');
              return;
            }
            if (q < questions.length - 1) {
              setQ(q + 1);
              setError('');
            } else onComplete();
          }}
        >
          {q === questions.length - 1 ? 'See My Explorer Profile' : 'Next'}
        </Button>,
      )}
    </div>
  );
}

export function NoIdea({
  top,
  bottom,
  onContinue,
}: {
  top: () => ReactNode;
  bottom: (content: ReactNode) => ReactNode;
  onContinue: () => void;
}) {
  return (
    <div className="relative h-full overflow-hidden bg-navy px-6 pt-8 text-white">
      {top()}
      <div className="mt-8">
        <h1 className="text-[32px] font-extrabold leading-[1.05] tracking-[-.055em]">That’s okay.<br />Let’s start small.</h1>
        <p className="mt-4 text-[14px] leading-relaxed text-white/80">You don’t need all the answers today.<br />Just take the first step.</p>
      </div>
      <div className="mt-9 space-y-4">
        {[
          ['Discover yourself', 'Find out what you enjoy'],
          ['Try something', 'Experience real activities'],
          ['Reflect', 'Learn what feels right'],
          ['Explore possibilities', 'See fields and careers'],
          ['Build a direction', 'Create your personal path'],
        ].map(([x, desc], i) => (
          <div key={x} className="flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime text-[19px] font-extrabold text-navy">
              {i + 1}
            </span>
            <div>
              <p className="text-[14px] font-extrabold">{x}</p>
              <p className="text-[12px] text-white/70">{desc}</p>
            </div>
          </div>
        ))}
      </div>
      <Mascot size={170} className="pointer-events-none absolute bottom-20 right-[-36px]" />
      {bottom(
        <Button onClick={onContinue}>
          Start My First Exploration <ArrowRight size={17} />
        </Button>,
      )}
    </div>
  );
}

export function Interests({
  top,
  headline,
  sections,
  bottom,
  onContinue,
}: {
  top: () => ReactNode;
  headline: (title: string, sub: string) => ReactNode;
  sections: (items: string[]) => ReactNode;
  bottom: (content: ReactNode) => ReactNode;
  onContinue: () => void;
}) {
  return (
    <div className="relative h-full bg-white px-5 pt-3">
      {top()}
      {headline(
        'You don’t have to choose just yet.',
        'Your interests might connect in ways you haven’t tried yet.',
      )}
      <div className="relative mb-6 flex h-52 items-center justify-center">
        <div className="absolute left-3 top-8 flex h-32 w-32 items-center justify-center rounded-full bg-lime/75 text-sm font-extrabold">
          Business
        </div>
        <div className="absolute right-3 top-8 flex h-32 w-32 items-center justify-center rounded-full bg-purple/75 text-sm font-extrabold text-white">
          Creative
        </div>
        <div className="absolute bottom-0 flex h-32 w-32 items-center justify-center rounded-full bg-navy/85 text-sm font-extrabold text-white">
          Technology
        </div>
      </div>
      <Card className="mb-4 !bg-navy text-white">
        <Sparkle size={22} className="text-lime" />
        <h2 className="mt-2 text-lg font-extrabold">
          The interesting stuff happens in between.
        </h2>
        <p className="mt-2 text-xs text-white/75">
          Business + Technology could lead you to product management,
          entrepreneurship, or product marketing.
        </p>
      </Card>
      <Label>Directions to explore</Label>
      {sections([
        'Product Management',
        'Entrepreneurship',
        'Product Marketing',
        'Business Analytics',
      ])}
      {bottom(
        <Button onClick={onContinue}>
          Explore Combinations <ArrowRight size={17} />
        </Button>,
      )}
    </div>
  );
}

export function ExplorerProfile({
  profile,
  headline,
  sections,
  coaching,
  bottom,
  continueJourney,
}: {
  profile: Profile;
  headline: (title: string, sub: string) => ReactNode;
  sections: (items: string[]) => ReactNode;
  coaching: (text: string) => ReactNode;
  bottom: (content: ReactNode) => ReactNode;
  continueJourney: () => void;
}) {
  return (
    <div className="relative h-full bg-white px-5 pt-5">
      <div className="relative">
      {headline(
        'Here’s what we’re discovering about you.',
        'Your results show your interests, strengths, and values. This is your starting point, not a limit.',
      )}
      <Mascot size={90} className="absolute right-0 top-4" />
      </div>
      <h2 className="mb-3 text-[15px] font-extrabold">Top Interests</h2>
      <div className="mb-6 flex gap-2">
        {profile.answers[0].slice(0, 3).map((x, i) => (
          <Card key={x} className="flex-1 !p-3 text-center">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-lime">
              <Icon name={['chart', 'pen', 'code'][i]} size={22} />
            </div>
            <p className="text-[12px] font-extrabold leading-tight">{x}</p>
          </Card>
        ))}
      </div>
      <h2 className="mb-3 text-[15px] font-extrabold">Key Strengths</h2>
      {sections(profile.answers[1])}
      <div className="mt-6">
        <h2 className="mb-3 text-[15px] font-extrabold">Core Values</h2>
        {sections(profile.answers[2])}
      </div>
      <div className="mt-7">
        {coaching(
          'You’re not defined by one result. Think of this as your starting point.',
        )}
      </div>
      {bottom(
        <Button onClick={continueJourney}>
          {profile.start === 'dream'
            ? 'Explore My Dream'
            : 'Explore My Possibilities'}{' '}
          <ArrowRight size={17} />
        </Button>,
      )}
    </div>
  );
}
