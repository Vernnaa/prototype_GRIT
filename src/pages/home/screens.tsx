import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Check } from '@phosphor-icons/react';
import type { Field, Mission } from '../../content';
import { level, levelNames, type Profile } from '../../model';
import { Button, Card, Icon, Mascot } from '../../components/AppUI';

export function Home({
  profile,
  suggested,
  ranked,
  fieldCard,
  chooseMission,
  explore,
  progress,
  coach,
}: {
  profile: Profile;
  suggested: Mission;
  ranked: Field[];
  fieldCard: (field: Field) => ReactNode;
  chooseMission: (id: string) => void;
  explore: () => void;
  progress: () => void;
  coach: () => void;
}) {
  return (
    <div className="bg-white px-5 pt-6">
      <div className="relative mb-5 flex min-h-24 items-center justify-between overflow-hidden">
        <div>
          <h1 className="mt-1 text-[30px] font-extrabold tracking-tight">
            Hi, {profile.name}!
          </h1>
          <p className="mt-1 max-w-[180px] text-[14px] leading-snug text-navy/70">Ready to discover what’s next?</p>
        </div>
        <Mascot size={115} className="-mr-4" />
      </div>
      <Card className="mb-6 !bg-navy !p-4 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[17px] font-extrabold">Your Next Step</p>
            <h2 className="mt-3 text-[17px] font-extrabold leading-tight">
              {suggested.title}
            </h2>
            <p className="mt-2 text-xs text-white/70">
              {suggested.time} · +{suggested.xp} XP
            </p>
          </div>
          <span className="rounded-2xl bg-purple p-2"><Icon name={suggested.icon} size={42} className="text-white" /></span>
        </div>
        <Button onClick={() => chooseMission(suggested.id)} className="mt-5">
          Start <ArrowRight size={17} />
        </Button>
      </Card>
      <h2 className="mb-3 text-[17px] font-extrabold">Your Journey</h2>
      <div className="mb-6 flex items-center justify-between gap-1 rounded-[20px] bg-white px-2 py-4">
        {['Explore', 'Experience', 'Reflect', 'Decide', 'Progress'].map(
          (x, i) => {
            const active = [
              profile.explored.length > 0,
              profile.completed.length > 0,
              profile.reflections.length > 0,
              !!profile.direction,
              profile.milestones.length > 0,
            ][i];
            return (
              <div
                key={x}
                className="flex flex-1 flex-col items-center gap-1 text-center"
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full ${active ? 'bg-lime' : 'bg-paper'}`}
                >
                  {active ? <Check size={14} /> : i + 1}
                </span>
                <small className="text-[8px] font-bold">{x}</small>
              </div>
            );
          },
        )}
      </div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[17px] font-extrabold">Explore more</h2>
        <button onClick={explore} className="text-[11px] font-bold text-purple">
          See all ↗
        </button>
      </div>
      {ranked.slice(0, 2).map(fieldCard)}
      <h2 className="mb-3 text-[17px] font-extrabold">Your Progress</h2>
      <p className="mb-3 text-[13px] font-semibold text-navy/70">Level {level(profile.xp)} · {levelNames[level(profile.xp) - 1]} · {profile.xp} XP</p>
      <Card
        onClick={progress}
        className="mb-4 grid grid-cols-4 gap-1 !p-3 text-center"
      >
        {[
          [profile.xp, 'XP'],
          [profile.streak, 'Streak'],
          [profile.completed.length, 'Missions'],
          [profile.explored.length, 'Fields'],
        ].map(([n, x]) => (
          <div key={x}>
            <strong className="text-base font-extrabold">{n}</strong>
            <small className="block text-[9px] text-navy/55">{x}</small>
          </div>
        ))}
      </Card>
      <button
        onClick={coach}
        className="mb-3 flex w-full items-center gap-3 rounded-[18px] bg-purple/10 p-3 text-left"
      >
        <Mascot size={45} />
        <span className="flex-1 text-xs font-extrabold">
          Need to talk it through?
          <small className="block font-medium">Ask GRIT Coach</small>
        </span>
        <ArrowUpRight size={17} />
      </button>
    </div>
  );
}
