import { useEffect, useState, type ReactNode } from 'react';
import { Icon, Card } from './components/AppUI';
import { Achievements } from './pages/progress/Achievements';
import { Coach } from './pages/coach/screens';
import {
  Splash,
  Welcome,
  StartingPoint,
  Quiz,
  NoIdea,
} from './pages/onboarding/screens';
import { AppShell, type Screen } from './components/AppShell';
import {
  Missions,
  MissionWorkspace,
  MissionReflection,
  Insight,
} from './pages/missions/screens';
import { ProfileDialog } from './components/ProfileDialog';
import { Compare } from './pages/explore/screens';
import { Explore, DiscoverPossibilities, CareerDetail, TryMission } from './pages/explore/journey';
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
import { completeDemoOnboarding, demoReflection, initial, load, recordVisit, startMission, storageKey, type JourneyScreen, type Profile } from './model';

export default function App() {
  const [profile, setProfile] = useState<Profile>(load);
  const [screen, setScreen] = useState<Screen>(() =>
    load().start ? load().journey?.screen || 'home' : 'splash',
  );
  const [fieldId, setFieldId] = useState(() => profile.journey?.fieldId || 'marketing');
  const [missionId, setMissionId] = useState(() => profile.journey?.missionId || profile.activeMission || 'campaign');
  const [q, setQ] = useState(0);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const savedDraft = demoReflection(profile, missionId);
  const [feeling, setFeeling] = useState(savedDraft.feeling);
  const [enjoyed, setEnjoyed] = useState(savedDraft.enjoyed);
  const [challenge, setChallenge] = useState(savedDraft.challenge);
  const [again, setAgain] = useState(savedDraft.again);
  const [error, setError] = useState('');
  const [chat, setChat] = useState<{ who: 'me' | 'coach'; text: string }[]>([]);
  const [message, setMessage] = useState('');
  const [compare, setCompare] = useState<string[]>([
    'marketing',
    'entrepreneurship',
    'consulting',
  ]);
  const [previous, setPrevious] = useState<Screen>('explore');
  const missionFlow = ['workspace', 'reflection', 'insight', 'mission-direction'].includes(screen);
  const [directionFilter, setDirectionFilter] = useState(false);
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
    const inJourney = ['explorer', 'explore', 'discover', 'field', 'mission', 'missions', 'workspace', 'reflection', 'mission-direction'].includes(screen);
    setProfile(p => {
      const journey = inJourney ? { screen: (screen === 'explorer' ? 'explore' : screen) as JourneyScreen, fieldId, missionId } : undefined;
      if (p.journey?.screen === journey?.screen && p.journey?.fieldId === journey?.fieldId && p.journey?.missionId === journey?.missionId) return p;
      return { ...p, journey };
    });
  }, [screen, fieldId, missionId]);
  useEffect(() => {
    if (screen !== 'reflection') return;
    setProfile(p => ({ ...p, reflectionDraft: { mission: missionId, feeling, enjoyed, challenge, again } }));
  }, [screen, missionId, feeling, enjoyed, challenge, again]);
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
    if (next === 'discover') { setDirectionFilter(false); setFilter('All'); setSearch(''); }
    if (next === 'reflection') {
      const template = demoReflection(profile, missionId);
      setEnjoyed(value => value.trim() ? value : template.enjoyed);
      setChallenge(value => value.trim() ? value : template.challenge);
    }
    setPrevious(screen);
    setError('');
    setModal('');
    setScreen(next);
  };
  const back = () => {
    setError('');
    if (screen === 'quiz') {
      if (q > 0) setQ(q - 1);
      else go(profile.start === 'none' ? 'noidea' : 'start');
      return;
    }
    go(screen === 'start' ? 'welcome' : screen === 'noidea' ? 'start' : screen === 'mission-direction' ? 'reflection' : screen === 'reflection' ? 'workspace' : screen === 'workspace' ? 'mission' : previous === 'splash' ? 'home' : previous);
  };
  const update = (part: Partial<Profile>) =>
    setProfile((p) => ({ ...p, ...part }));
  const ranked = [fields.find(f => f.id === 'marketing')!, ...rankFields(profile.answers, 'marketing').filter(f => f.id !== 'marketing')];
  const field = fields.find((f) => f.id === fieldId) || fields[0];
  const mission = missions.find((m) => m.id === missionId) || missions[0];
  const suggested = missions.find(m => m.id === 'campaign')!;
  const chooseField = (id: string) => {
    setFieldId(id);
    setProfile((p) => ({
      ...p,
      explored: p.explored.includes(id) ? p.explored : [...p.explored, id],
    }));
    go('field');
  };
  const selectMission = (id: string) => {
    const selected = missions.find(m => m.id === id);
    if (!selected) return;
    const savedReflection = demoReflection(profile, id);
    setFeeling(savedReflection.feeling);
    setEnjoyed(savedReflection.enjoyed);
    setChallenge(savedReflection.challenge);
    setAgain(savedReflection.again);
    setMissionId(id);
    setFieldId(selected.field);
  };
  const chooseMission = (id: string) => {
    selectMission(id);
    go('mission');
  };
  const beginMission = (id = missionId) => {
    const selected = missions.find(m => m.id === id);
    if (!selected) return;
    selectMission(id);
    setProfile(p => startMission(p, id));
    go('workspace');
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
        className={`flex items-center justify-center ${screen === 'noidea' ? 'h-11 w-11 text-white' : missionFlow ? 'h-11 w-11 text-grit-navy' : 'h-10 w-10 rounded-xl bg-white'}`}
      >
        <ArrowLeft size={screen === 'noidea' ? 24 : missionFlow ? 23 : 19} />
      </button>
      <span className="text-xs font-extrabold">{name || ''}</span>
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
           go={next => { if (next === 'quiz') setQ(0); go(next); }}
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
    case 'quiz': {
      body = (
        <Quiz
          error={error}
          profile={profile}
          q={q}
          setProfile={setProfile}
          setError={setError}
          onBack={back}
          onComplete={() => { setProfile(completeDemoOnboarding); setFieldId('marketing'); setMissionId('campaign'); go('explorer'); }}
        />
      );
      break;
    }
    case 'explorer':
    case 'explore': {
      body = (
        <Explore
          discover={() => { setDirectionFilter(false); setFilter('All'); setSearch(''); go('discover'); }}
        />
      );
      break;
    }
    case 'discover':
      body = <DiscoverPossibilities directions={directionFilter} filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} chooseField={chooseField} back={() => go('explore')} />;
      break;
    case 'field':
      body = (
        <CareerDetail
          field={field}
          profile={profile}
          back={() => go('discover')}
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
      body = <Missions profile={profile} chooseMission={chooseMission} />;
      break;
    case 'mission':
      body = <TryMission mission={mission} field={field} profile={profile} update={update} back={() => go('missions')} start={() => beginMission()} />;
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
          continueJourney={() => go('mission-direction')}
        />
      );
      break;
    case 'direction':
    case 'mission-direction':
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
          explore={() => { setDirectionFilter(false); setFilter('All'); setSearch(''); go('discover'); }}
          mission={missionFlow ? mission : undefined}
          discover={() => { go('discover'); setDirectionFilter(true); }}
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
      screen={screen}
      go={go}
      modal={
        <ProfileDialog
          logout={() => go('welcome')}
          openSetting={label => label === 'Parent view' ? go('parent') : setModal(label === 'Reset Prototype' ? 'reset' : label)}
          modal={modal}
          close={() => setModal('')}
          profile={profile}
          update={update}
          sections={sections}
          restart={() => {
            setProfile(initial);
            setQ(0);
            setFieldId('marketing');
            setMissionId('campaign');
            setFilter('All');
            setSearch('');
            setDirectionFilter(false);
            const template = demoReflection(initial, 'campaign');
            setFeeling(template.feeling);
            setEnjoyed(template.enjoyed);
            setChallenge(template.challenge);
            setAgain(template.again);
            setChat([]);
            setMessage('');
            setCompare(['marketing', 'entrepreneurship', 'consulting']);
            setTab('progress');
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
