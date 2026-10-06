import { ClipboardText, Fire, SquaresFour, User } from '@phosphor-icons/react';
import { missions } from '../../../content';
import type { Profile } from '../../../model';

export function DashboardStats({ profile }: { profile: Profile }) {
  const skillCount = new Set(
    profile.completed.flatMap(
      (id) => missions.find((mission) => mission.id === id)?.skills || [],
    ),
  ).size;
  const stats = [
    { value: profile.streak, label: 'Day Streak', Icon: Fire },
    { value: profile.completed.length, label: 'Missions', Icon: ClipboardText },
    { value: profile.explored.length, label: 'Fields', Icon: SquaresFour },
    { value: skillCount, label: 'Skills', Icon: User },
  ];
  return (
    <dl
      className="mt-[14px] mb-0 grid grid-cols-4 gap-[7px] max-[359px]:gap-[5px]"
      aria-label="Exploration statistics"
    >
      {stats.map(({ value, label, Icon }) => (
        <div
          key={label}
          className="flex min-h-24 flex-col items-center justify-center gap-[5px] rounded-[13px] border border-grit-border bg-grit-white"
        >
          <Icon
            size={21}
            weight="fill"
            className="text-grit-purple"
            aria-hidden="true"
          />
          <dd className="m-0 text-[22px] font-extrabold leading-[1.1] text-grit-text">
            {value}
          </dd>
          <dt className="whitespace-nowrap text-[10px] leading-[1.2] text-grit-muted">
            {label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
