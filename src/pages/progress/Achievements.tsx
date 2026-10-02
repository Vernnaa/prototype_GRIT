import { LockKey, Medal } from '@phosphor-icons/react';
import type { Profile } from '../../model';
import { Label, Mascot } from '../../components/AppUI';

export function Achievements({ profile }: { profile: Profile }) {
  const groups = [
    [
      'EXPLORER',
      [
        ['First Career Explored', profile.explored.length >= 1],
        ['5 Careers Explored', profile.explored.length >= 5],
        ['3 Fields Tried', profile.explored.length >= 3],
      ],
    ],
    [
      'EXPERIENCER',
      [
        ['First Mission', profile.completed.length >= 1],
        ['5 Missions', profile.completed.length >= 5],
        ['Real-World Explorer', profile.completed.length >= 3],
      ],
    ],
    [
      'GROWER',
      [
        ['First Reflection', profile.reflections.length >= 1],
        ['Skill Builder', profile.milestones.length >= 1],
        ['Consistent Explorer', profile.streak >= 7],
      ],
    ],
  ] as [string, [string, boolean][]][];
  return (
    <>
      {groups.map(([group, badges]) => (
        <div key={group} className="mb-5">
          <Label>{group}</Label>
          <div className="grid grid-cols-3 gap-2">
            {badges.map(([name, unlocked]) => (
              <div
                key={name}
                className={`rounded-2xl border p-2 text-center ${unlocked ? 'border-lime bg-lime/15' : 'border-navy/8 bg-white opacity-55'}`}
              >
                <span
                  className={`mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl ${unlocked ? 'bg-lime' : 'bg-paper'}`}
                >
                  {unlocked ? (
                    <Medal size={26} weight="duotone" />
                  ) : (
                    <LockKey size={22} />
                  )}
                </span>
                <p className="text-[10px] font-extrabold leading-tight">
                  {name}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="mt-5 flex items-center gap-2 rounded-2xl bg-purple/10 p-3">
        <Mascot size={56} />
        <p className="text-xs font-bold">Every try is progress. Keep going!</p>
      </div>
    </>
  );
}
