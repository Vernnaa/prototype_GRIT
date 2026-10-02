import {
  Bell,
  CaretRight,
  Gear,
  PencilSimple,
  Question,
  ShieldCheck,
  UserCircle,
  UsersThree,
} from '@phosphor-icons/react';
import type { Profile } from '../../model';
import { level, levelNames } from '../../model';
import { Bar, Card, Icon } from '../../components/AppUI';
import type { Screen } from '../../components/AppShell';

export function ProfilePage({
  profile,
  go,
  setModal,
}: {
  profile: Profile;
  go: (screen: Screen) => void;
  setModal: (modal: string) => void;
}) {
  return (
    <div className="px-5 pt-5">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple/15 text-purple">
          <UserCircle size={48} />
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-extrabold">{profile.name}</h1>
          <p className="text-xs text-navy/60">
            {levelNames[level(profile.xp) - 1]} · Level {level(profile.xp)}
          </p>
        </div>
        <button aria-label="Edit profile" onClick={() => setModal('name')}>
          <PencilSimple size={18} />
        </button>
      </div>
      <Card className="mb-5 !bg-navy text-white">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold">Your exploration</span>
          <span className="text-xs font-bold text-lime">{profile.xp} XP</span>
        </div>
        <div className="mt-3">
          <Bar value={((profile.xp % 250) / 250) * 100} />
        </div>
      </Card>
      {(
        [
          ['My Interests', 'heart', 'interestsView'],
          ['My Strengths', 'spark', 'strengthsView'],
          ['My Values', 'flag', 'valuesView'],
          ['My Experiences', 'rocket', 'progress'],
          ['My Directions', 'path', 'direction'],
          ['My Achievements', 'spark', 'achievements'],
          ['My Goals', 'flag', 'roadmap'],
        ] as const
      ).map(([name, icon, target]) => (
        <button
          key={name}
          onClick={() =>
            target.endsWith('View') ? setModal(target) : go(target as Screen)
          }
          className="flex min-h-[48px] w-full items-center gap-3 border-b border-navy/8 text-left"
        >
          <Icon name={icon} size={18} className="text-purple" />
          <span className="flex-1 text-xs font-bold">{name}</span>
          <CaretRight size={16} />
        </button>
      ))}
      <div className="mt-6">
        {(
          [
            ['Settings', Gear],
            ['Notifications', Bell],
            ['Privacy', ShieldCheck],
            ['Help', Question],
            ['Parent view', UsersThree],
          ] as const
        ).map(([name, Comp]) => (
          <button
            key={name}
            onClick={() =>
              name === 'Parent view' ? go('parent') : setModal(name)
            }
            className="flex min-h-11 w-full items-center gap-3 text-left"
          >
            <Comp size={17} />
            <span className="flex-1 text-xs font-bold">{name}</span>
            <CaretRight size={16} />
          </button>
        ))}
      </div>
      <button
        className="mt-5 text-[11px] font-bold text-navy/50 underline"
        onClick={() => setModal('reset')}
      >
        Restart prototype
      </button>
    </div>
  );
}
