import { useEffect, useState, type ReactNode } from 'react';
import { Icon, Mascot, Card } from './components/AppUI';
import { Achievements } from './pages/progress/Achievements';
import { Coach } from './pages/coach/screens';
import {
  Splash,
  Welcome,
  StartingPoint,
  Quiz,
  NoIdea,
  Interests,
  ExplorerProfile,
} from './pages/onboarding/screens';
import { AppShell, type Screen } from './components/AppShell';
import {
  Missions,
  MissionDetail,
  MissionWorkspace,
  MissionReflection,
  Insight,
} from './pages/missions/screens';
import { ProfileDialog } from './components/ProfileDialog';
import { Explore, FieldDetail, Compare } from './pages/explore/screens';
import { ParentView } from './pages/parent/screens';
import { ProfilePage } from './pages/profile/screens';
import { ProgressPage } from './pages/progress/screens';
import { Roadmap } from './pages/path/Roadmap';
import HomeDashboard from './pages/home/page';
import { Direction, MyPath, Recommend } from './pages/path/screens';
import { ArrowLeft, ArrowUpRight, CaretRight } from '@phosphor-icons/react';
import {
  fields,
  missions,
  rankFields,
  type Field,
  type Mission,
} from './content';
import { initial, load, recordVisit, storageKey, type Profile } from './model';

export default function App() {
  const [profile, setProfile] = useState<Profile>(load);
  const [screen, setScreen] = useState<Screen>(() =>
    load().start ? 'home' : 'splash',
  );
  const [fieldId, setFieldId] = useState('marketing');
  const [missionId, setMissionId] = useState('campaign');
  const [q, setQ] = useState(0);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [feeling, setFeeling] = useState('');
  const [enjoyed, setEnjoyed] = useState('');
  const [challenge, setChallenge] = useState('');
  const [again, setAgain] = useState('');
  const [error, setError] = useState('');
  const [chat, setChat] = useState<{ who: 'me' | 'coach'; text: string }[]>([]);
  const [message, setMessage] = useState('');
  const [compare, setCompare] = useState<string[]>([
    'marketing',
    'entrepreneurship',
    'consulting',
  ]);
  const [previous, setPrevious] = useState<Screen>('explore');
  const [missionFlow, setMissionFlow] = useState(false);
  const [modal, setModal] = useState('');
  const [tab, setTab] = useState<'progress' | 'achievements'>('progress');
  const [started, setStarted] = useState(false);
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(profile));
    } catch {
      /* Browsing without storage still works. */
    }
  }, [profile]);
  useEffect(() => {
    if (screen !== 'splash') return;
    const timer = setTimeout(() => setScreen('welcome'), 2200);
    return () => clearTimeout(timer);
  }, [screen]);
  useEffect(() => {
    if (profile.start && !started) {
      setProfile((p) => recordVisit(p, new Date().toLocaleDateString('en-CA')));
      setStarted(true);
    }
  }, [profile.start, started]);
  const go = (next: Screen) => {
    if (!['workspace', 'reflection', 'direction'].includes(next)) setMissionFlow(false);
    setPrevious(screen);
    setError('');
    setModal('');
    setScreen(next);
  };
  const back = () => go(missionFlow && screen === 'direction' ? 'reflection' : screen === 'reflection' ? 'workspace' : screen === 'workspace' ? 'mission' : previous === 'splash' ? 'home' : previous);
  const update = (part: Partial<Profile>) =>
    setProfile((p) => ({ ...p, ...part }));
  const ranked = rankFields(profile.answers, profile.dream);
  const field = fields.find((f) => f.id === fieldId) || fields[0];
  const mission = missions.find((m) => m.id === missionId) || missions[0];
  const suggested =
    missions.find(
      (m) => m.field === ranked[0].id && !profile.completed.includes(m.id),
    ) ||
    missions.find((m) => !profile.completed.includes(m.id)) ||
    missions[0];
  const chooseField = (id: string) => {
    setFieldId(id);
    setProfile((p) => ({
      ...p,
      explored: p.explored.includes(id) ? p.explored : [...p.explored, id],
    }));
    go('field');
  };
  const chooseMission = (id: string) => {
    const savedReflection = profile.reflections.find(r => r.mission === id);
    setFeeling(savedReflection?.feeling || '');
    setEnjoyed(savedReflection?.enjoyed || '');
    setChallenge(savedReflection?.challenge || '');
    setAgain(savedReflection?.again || '');
    setMissionId(id);
    go('mission');
  };
  const bottom = (content: ReactNode) => (
    <div className="inset-action sticky bottom-0 z-10 -mx-5 mt-6 px-5 pt-4 pb-[max(20px,env(safe-area-inset-bottom))]">
      {error && (
        <p
          role="alert"
          className="mb-2 text-center text-xs font-bold text-navy"
        >
          {error}
        </p>
      )}
      {content}
    </div>
  );
  const fieldCard = (f: Field) => (
    <Card
      key={f.id}
      onClick={() => chooseField(f.id)}
      className="mb-3 flex items-center gap-3 !p-3.5"
    >
      <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-purple text-white">
        <Icon name={f.icon} size={26} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-extrabold leading-tight">{f.name}</p>
        <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-navy/60">
          {f.summary}
        </p>
        <span className="mt-2 inline-block rounded-full bg-lime px-2 py-0.5 text-[10px] font-extrabold text-navy">Worth exploring</span>
      </div>
      <ArrowUpRight size={18} />
    </Card>
  );
  const missionCard = (m: Mission) => (
    <Card
      key={m.id}
      onClick={() => chooseMission(m.id)}
      className="mb-3 !p-0 overflow-hidden"
    >
      <div className="flex gap-3 p-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-purple/12 text-purple">
          <Icon name={m.icon} size={30} />
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-bold text-navy/50">
            {fields.find((f) => f.id === m.field)?.name} · Beginner
          </p>
          <h3 className="mt-1 text-[15px] font-extrabold leading-tight">
            {m.title}
          </h3>
          <p className="mt-2 text-[11px] font-bold text-navy/65">
            {m.time} <span className="ml-2 text-purple">✦ +{m.xp} XP</span>
          </p>
        </div>
        <CaretRight size={17} />
      </div>
    </Card>
  );
  const top = (name?: string) => (
    <div className="flex h-11 items-center gap-3">
      <button
        type="button"
        aria-label="Go back"
        onClick={() => (screen === 'quiz' && q > 0 ? setQ(q - 1) : back())}
        className={`flex items-center justify-center ${missionFlow ? 'h-11 w-11 text-grit-navy' : 'h-10 w-10 rounded-xl bg-white'}`}
      >
        <ArrowLeft size={missionFlow ? 23 : 19} />
      </button>
      <span className="text-xs font-extrabold">{name || ''}</span>
    </div>
  );
  const coaching = (text: string) => (
    <div className="flex items-center gap-2 rounded-2xl bg-purple/8 p-3">
      <Mascot size={43} />
      <p className="text-[11px] font-semibold leading-snug">{text}</p>
    </div>
  );
  const headline = (text: string, sub?: string) => (
    <div className="mb-6">
      <h1 className="text-[32px] font-extrabold leading-[1.08] tracking-[-.06em]">
        {text}
      </h1>
      {sub && (
        <p className="mt-3 text-[14px] leading-relaxed text-navy/65">{sub}</p>
      )}
    </div>
  );
  const sections = (items: string[]) => (
    <div className="flex flex-wrap gap-2">
      {items.map((x) => (
        <span
          key={x}
          className="rounded-full bg-paper px-3 py-2 text-[11px] font-bold"
        >
          {x}
        </span>
      ))}
    </div>
  );
  const reflection = profile.reflections.find((r) => r.mission === missionId);
  const ask = (text: string) => {
    if (!text.trim()) return;
    const value = text.trim();
    const low = value.toLowerCase();
    let reply =
      'You can take your time. Try a small mission, notice what energizes you, and use that as your next clue.';
    if (low.includes('difference') || low.includes('compare'))
      reply =
        'Marketing connects ideas with people; entrepreneurship builds something new; consulting helps teams solve problems. Try one mini-project to feel the difference.';
    else if (low.includes('marketing'))
      reply =
        'Marketing could be worth exploring because you enjoy communication and creative problem solving. A campaign mission lets you test that feeling.';
    else if (low.includes('next'))
      reply = `Try “${suggested.title}”. It is a low-pressure way to learn what you enjoy next.`;
    else if (low.includes('career') || low.includes('fit'))
      reply = `Your interests point to possibilities like ${ranked
        .slice(0, 3)
        .map((f) => f.name)
        .join(', ')}. These are starting points, not a verdict.`;
    setChat((c) => [
      ...c,
      { who: 'me', text: value },
      { who: 'coach', text: reply },
    ]);
    setMessage('');
  };
  let body: ReactNode;
  switch (screen) {
    case 'splash':
      body = <Splash onContinue={() => go('welcome')} />;
      break;
    case 'welcome':
      body = (
        <Welcome
          onContinue={() => go('start')}
          onDream={() => {
            update({ start: 'dream' });
            go('start');
          }}
        />
      );
      break;
    case 'start':
      body = (
        <StartingPoint
          profile={profile}
          update={update}
          setError={setError}
          back={back}
          bottom={bottom}
          go={go}
        />
      );
      break;
    case 'noidea':
      body = (
        <NoIdea
          top={top}
          bottom={bottom}
          onContinue={() => {
            setQ(0);
            go('quiz');
          }}
        />
      );
      break;
    case 'interests':
      body = (
        <Interests
          top={top}
          headline={headline}
          sections={sections}
          bottom={bottom}
          onContinue={() => {
            setQ(0);
            go('quiz');
          }}
        />
      );
      break;
    case 'quiz': {
      body = (
        <Quiz
          profile={profile}
          q={q}
          setQ={setQ}
          setProfile={setProfile}
          setError={setError}
          onBack={() => (q > 0 ? setQ(q - 1) : back())}
          bottom={bottom}
          onComplete={() => go('explorer')}
        />
      );
      break;
    }
    case 'explorer':
      body = (
        <ExplorerProfile
          profile={profile}
          headline={headline}
          sections={sections}
          coaching={coaching}
          bottom={bottom}
          continueJourney={() =>
            profile.start === 'dream' && profile.dream
              ? chooseField(profile.dream)
              : go('explore')
          }
        />
      );
      break;
    case 'explore': {
      body = (
        <Explore
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
          fieldCard={fieldCard}
          headline={headline}
          onCompare={() => go('compare')}
        />
      );
      break;
    }
    case 'field':
      body = (
        <FieldDetail
          field={field}
          profile={profile}
          top={top}
          sections={sections}
          update={update}
          chooseMission={chooseMission}
        />
      );
      break;
    case 'compare':
      body = (
        <Compare
          compare={compare}
          setCompare={setCompare}
          top={top}
          headline={headline}
          chooseField={chooseField}
          onMissions={() => go('missions')}
        />
      );
      break;
    case 'missions':
      body = (
        <Missions
          suggested={suggested}
          headline={headline}
          chooseMission={chooseMission}
          onProgress={() => go('progress')}
          missionCard={missionCard}
        />
      );
      break;
    case 'mission':
      body = (
        <MissionDetail
          mission={mission}
          profile={profile}
          top={top}
          headline={headline}
          sections={sections}
          bottom={bottom}
          onStart={() => { setMissionFlow(true); go('workspace'); }}
        />
      );
      break;
    case 'workspace': {
      body = (
        <MissionWorkspace
          mission={mission}
          profile={profile}
          setProfile={setProfile}
          go={go}
          top={top}
          bottom={bottom}
        />
      );
      break;
    }
    case 'reflection':
      body = (
        <MissionReflection
          mission={mission}
          feeling={feeling}
          setFeeling={setFeeling}
          enjoyed={enjoyed}
          setEnjoyed={setEnjoyed}
          challenge={challenge}
          setChallenge={setChallenge}
          again={again}
          setAgain={setAgain}
          setError={setError}
          setProfile={setProfile}
          go={go}
          top={top}
          bottom={bottom}
        />
      );
      break;
    case 'insight':
      body = (
        <Insight
          reflection={reflection}
          mission={mission}
          ranked={ranked}
          fieldCard={fieldCard}
          top={top}
          headline={headline}
          bottom={bottom}
          continueJourney={() => go('direction')}
        />
      );
      break;
    case 'direction':
      body = (
        <Direction
          profile={profile}
          ranked={missionFlow ? rankFields([...profile.answers, mission.skills, [enjoyed]], mission.field) : ranked}
          top={top}
          headline={headline}
          chooseField={chooseField}
          build={() => {
            update({ direction: ranked[0].id });
            go('path');
          }}
          explore={() => go('explore')}
          mission={missionFlow ? mission : undefined}
          reflection={missionFlow ? reflection : undefined}
          back={back}
        />
      );
      break;
    case 'path': {
      body = (
        <MyPath
          profile={profile}
        />
      );
      break;
    }
    case 'recommend':
      body = (
        <Recommend
          suggested={suggested}
          ranked={ranked}
          top={top}
          headline={headline}
          chooseMission={chooseMission}
          chooseField={chooseField}
          learn={() => {
            update({
              milestones: [...new Set([...profile.milestones, 'build'])],
            });
            go('path');
          }}
        />
      );
      break;
    case 'progress':
      body = (
        <ProgressPage
          profile={profile}
          tab={tab}
          setTab={setTab}
          headline={headline}
          onAchievements={() => go('achievements')}
        />
      );
      break;
    case 'achievements':
      body = (
        <div className="px-5 pt-3">
          {top('Achievements')}
          {headline('Every step counts.', 'Your curiosity looks good on you.')}
          <Achievements profile={profile} />
        </div>
      );
      break;
    case 'coach':
      body = (
        <Coach
          back={back}
          chat={chat}
          ask={ask}
          message={message}
          setMessage={setMessage}
        />
      );
      break;
    case 'roadmap': {
      const goal =
        fields.find(
          (f) => f.id === profile.dream || f.id === profile.direction,
        ) || field;
      body = (
        <Roadmap
          goal={goal}
          top={top}
          headline={headline}
          sections={sections}
          missionCard={missionCard}
          start={() => {
            update({ direction: goal.id });
            go('path');
          }}
          explore={() => go('explore')}
        />
      );
      break;
    }
    case 'parent':
      body = (
        <ParentView
          profile={profile}
          ranked={ranked}
          top={top}
          headline={headline}
          sections={sections}
        />
      );
      break;
    case 'profile':
      body = <ProfilePage profile={profile} go={go} setModal={setModal} />;
      break;
    case 'home':
    default:
      body = (
        <HomeDashboard
          profile={profile}
          suggested={suggested}
          chooseMission={chooseMission}
        />
      );
  }
  return (
    <AppShell
      missionFlow={missionFlow}
      screen={screen}
      go={go}
      modal={
        <ProfileDialog
          modal={modal}
          close={() => setModal('')}
          profile={profile}
          update={update}
          sections={sections}
          restart={() => {
            setProfile(initial);
            setQ(0);
            setStarted(false);
            setModal('');
            go('welcome');
          }}
        />
      }
    >
      {body}
    </AppShell>
  );
}
