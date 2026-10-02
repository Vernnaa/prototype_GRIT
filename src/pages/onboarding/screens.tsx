import { ArrowLeft, ArrowRight, Sparkle } from '@phosphor-icons/react';
import { fields, questions } from '../../content';
import type { Profile } from '../../model';
import { Bar, Button, Card, Icon, Label, Logo, Mascot } from '../../components/AppUI';
import type { ReactNode } from 'react';

export function Splash({ onContinue }: { onContinue: () => void }) {
  return (
    <button
      onClick={onContinue}
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-navy text-white"
    >
      <Logo light />
      <p className="mt-2 text-[11px] font-extrabold tracking-[.13em]">
        FROM DREAM <span className="text-lime">TO DIRECTION</span>
      </p>
      <div className="relative mt-8">
        <span className="absolute left-0 top-10 h-24 w-24 rounded-full bg-lime blur-2xl opacity-60" />
        <Mascot size={295} className="relative" />
      </div>
      <p className="mt-2 text-center text-lg font-bold italic leading-tight">
        A brighter you.
        <br />A bigger tomorrow.
      </p>
      <span className="absolute bottom-9 h-1 w-24 rounded-full bg-white/25">
        <span className="block h-full w-12 rounded-full bg-lime" />
      </span>
    </button>
  );
}

export function Welcome({
  onContinue,
  onDream,
  headline,
}: {
  onContinue: () => void;
  onDream: () => void;
  headline: (text: string, sub?: string) => ReactNode;
}) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-white">
      <div className="px-7 pt-11">
        {headline(
          'You don’t have to know your future yet.',
          'Explore who you are, try new possibilities, and find a direction that feels right for you.',
        )}
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <span className="absolute left-6 top-9 text-7xl font-extralight text-lime">
          ↗
        </span>
        <Mascot
          size={340}
          phone
          className="absolute bottom-[-36px] left-1/2 max-w-none -translate-x-1/2"
        />
      </div>
      <div className="relative z-10 rounded-t-[28px] bg-navy px-5 pb-9 pt-5">
        <Button onClick={onContinue}>
          Start Exploring <ArrowRight size={18} />
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
  headline,
  bottom,
  go,
}: {
  profile: Profile;
  update: (part: Partial<Profile>) => void;
  setError: (message: string) => void;
  back: () => void;
  headline: (text: string, sub?: string) => ReactNode;
  bottom: (content: ReactNode) => ReactNode;
  go: (screen: 'noidea' | 'interests' | 'quiz') => void;
}) {
  return (
    <div className="h-full bg-white px-5 pt-3">
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
      {headline(
        'Where are you right now?',
        'Everyone’s journey is different. Tell us where you are so we can support you better.',
      )}
      <div className="space-y-3">
        {(
          [
            [
              'dream',
              'I have a dream',
              'I know what I want to become.',
              'rocket',
            ],
            [
              'ideas',
              'I have a few ideas',
              'I know what interests me, but I’m not sure yet.',
              'lightbulb',
            ],
            [
              'none',
              'I have no idea',
              'I’m still figuring out what I want.',
              'compass',
            ],
          ] as const
        ).map(([id, name, desc, icon]) => (
          <button
            type="button"
            key={id}
            aria-pressed={profile.start === id}
            onClick={() => {
              update({ start: id });
              setError('');
            }}
            className={`flex min-h-[112px] w-full items-center gap-3 rounded-[20px] border-2 p-4 text-left ${profile.start === id ? 'border-lime bg-lime/10' : 'border-navy/8 bg-white shadow-sm'}`}
          >
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${profile.start === id ? 'bg-lime' : 'bg-purple/10 text-purple'}`}
            >
              <Icon name={icon} size={30} />
            </div>
            <div>
              <strong className="text-base font-extrabold">{name}</strong>
              <p className="mt-1 text-xs leading-snug text-navy/65">{desc}</p>
            </div>
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
          Continue <ArrowRight size={18} />
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
  top,
  headline,
  bottom,
  onComplete,
}: {
  profile: Profile;
  q: number;
  setQ: (value: number) => void;
  setProfile: (update: (profile: Profile) => Profile) => void;
  setError: (value: string) => void;
  top: () => ReactNode;
  headline: (text: string, sub: string) => ReactNode;
  bottom: (content: ReactNode) => ReactNode;
  onComplete: () => void;
}) {
  const item = questions[q],
    choices = profile.answers[q];
  return (
    <div className="relative h-full bg-white px-5 pt-3">
      {top()}
      <p className="mt-4 text-xs font-bold text-navy/65">
        Question {q + 1} of {questions.length}
      </p>
      <div className="mt-3">
        <Bar value={(q + 1) * 10} />
      </div>
      <div className="mt-8">
        {headline(item.title, 'Select up to 3 options')}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {item.choices.map((x, i) => (
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
            className={`flex min-h-[97px] flex-col items-center justify-center gap-2 rounded-2xl border-2 p-2 text-center text-[11px] font-bold leading-tight ${choices.includes(x) ? 'border-lime bg-navy text-white' : 'border-navy/8 bg-white text-navy'}`}
          >
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
              size={25}
              className={choices.includes(x) ? 'text-lime' : 'text-purple'}
            />
            {x}
          </button>
        ))}
      </div>
      {bottom(
        <Button
          variant="navy"
          onClick={() => {
            if (!choices.length) {
              setError('Pick at least one option.');
              return;
            }
            if (q < 9) {
              setQ(q + 1);
              setError('');
            } else onComplete();
          }}
        >
          {q === 9 ? 'See My Explorer Profile' : 'Next'}{' '}
          <ArrowRight size={18} />
        </Button>,
      )}
    </div>
  );
}

export function NoIdea({
  top,
  headline,
  bottom,
  onContinue,
}: {
  top: () => ReactNode;
  headline: (title: string, sub: string) => ReactNode;
  bottom: (content: ReactNode) => ReactNode;
  onContinue: () => void;
}) {
  return (
    <div className="relative h-full overflow-hidden bg-navy px-6 pt-8 text-white">
      {top()}
      {headline(
        'That’s okay. Let’s start small.',
        'You don’t need all the answers today. Just take the first step.',
      )}
      <div className="mt-7 space-y-4">
        {[
          'Discover yourself',
          'Try something',
          'Reflect',
          'Explore possibilities',
          'Build a direction',
        ].map((x, i) => (
          <div key={x} className="flex items-center gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime text-sm font-extrabold text-navy">
              {i + 1}
            </span>
            <div>
              <p className="text-[10px] font-bold text-lime">STEP {i + 1}</p>
              <p className="text-sm font-extrabold">{x}</p>
            </div>
          </div>
        ))}
      </div>
      <Mascot size={170} className="absolute bottom-16 right-[-22px]" />
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
  top,
  headline,
  sections,
  coaching,
  bottom,
  continueJourney,
}: {
  profile: Profile;
  top: () => ReactNode;
  headline: (title: string, sub: string) => ReactNode;
  sections: (items: string[]) => ReactNode;
  coaching: (text: string) => ReactNode;
  bottom: (content: ReactNode) => ReactNode;
  continueJourney: () => void;
}) {
  return (
    <div className="relative h-full bg-paper px-5 pt-3">
      {top()}
      {headline(
        'Here’s what we’re discovering about you.',
        'Your results show your interests, strengths, and values. This is your starting point, not a limit.',
      )}
      <div className="mb-4 flex gap-2">
        {profile.answers[0].slice(0, 3).map((x, i) => (
          <Card key={x} className="flex-1 !p-2 text-center">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-lime">
              <Icon name={['chart', 'pen', 'code'][i]} size={22} />
            </div>
            <p className="text-[10px] font-extrabold leading-tight">{x}</p>
          </Card>
        ))}
      </div>
      <Label>YOUR STRENGTHS</Label>
      {sections(profile.answers[1])}
      <div className="mt-5">
        <Label>YOUR VALUES</Label>
        {sections(profile.answers[2])}
      </div>
      <div className="mt-6">
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
