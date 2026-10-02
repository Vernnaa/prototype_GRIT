import type { ReactNode } from 'react';
import { missions } from '../../content';
import { level, levelNames, type Profile } from '../../model';
import { Achievements } from './Achievements';
import { Bar, Card, Icon, Label } from '../../components/AppUI';

export function ProgressPage({
  profile,
  tab,
  setTab,
  top,
  headline,
  onAchievements,
}: {
  profile: Profile;
  tab: 'progress' | 'achievements';
  setTab: (tab: 'progress' | 'achievements') => void;
  top: (name: string) => ReactNode;
  headline: (text: string) => ReactNode;
  onAchievements: () => void;
}) {
  return (
    <div className="px-5 pt-3">
      {top('Your progress')}
      {headline('You’re getting closer.')}
      <div className="mb-4 grid grid-cols-2 gap-2 rounded-full bg-white p-1">
        {(['progress', 'achievements'] as const).map((x) => (
          <button
            onClick={() => setTab(x)}
            key={x}
            className={`rounded-full py-2 text-xs font-bold ${tab === x ? 'bg-navy text-white' : 'text-navy'}`}
          >
            {x === 'progress' ? 'Progress' : 'Achievements'}
          </button>
        ))}
      </div>
      {tab === 'achievements' ? (
        <Achievements profile={profile} />
      ) : (
        <>
          <Card className="mb-4">
            <div className="flex items-center gap-4">
              <div className="flex h-[84px] w-[84px] items-center justify-center rounded-full border-[9px] border-lime bg-navy text-white">
                <Icon name="rocket" size={32} />
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-purple">
                  Level {level(profile.xp)}
                </p>
                <h2 className="text-xl font-extrabold">
                  {levelNames[level(profile.xp) - 1]}
                </h2>
                <Bar value={((profile.xp % 250) / 250) * 100} />
                <p className="mt-1 text-[10px] text-navy/55">
                  {profile.xp} / {level(profile.xp) * 250} XP
                </p>
              </div>
            </div>
          </Card>
          <div className="mb-5 grid grid-cols-2 gap-2">
            {[
              [profile.streak, 'Day streak'],
              [profile.completed.length, 'Missions'],
              [profile.explored.length, 'Fields explored'],
              [
                new Set(
                  profile.completed.flatMap(
                    (id) => missions.find((m) => m.id === id)?.skills || [],
                  ),
                ).size,
                'Skills discovered',
              ],
            ].map(([val, label]) => (
              <Card key={label} className="text-center">
                <strong className="text-xl font-extrabold">{val}</strong>
                <p className="text-[10px] text-navy/55">{label}</p>
              </Card>
            ))}
          </div>
          <Label>YOUR GROWTH PATH</Label>
          <div className="flex items-center justify-between rounded-2xl bg-navy px-4 py-5 text-white">
            {['Explore', 'Try', 'Reflect', 'Grow'].map((x, i) => (
              <div key={x} className="text-center">
                <span
                  className={`mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full ${i <= Math.min(3, profile.reflections.length + profile.completed.length + Number(profile.explored.length > 0) - 1) ? 'bg-lime text-navy' : 'bg-white/20'}`}
                >
                  {i + 1}
                </span>
                <span className="text-[10px]">{x}</span>
              </div>
            ))}
          </div>
          <button
            onClick={onAchievements}
            className="mt-5 w-full text-right text-xs font-bold text-purple"
          >
            All achievements ↗
          </button>
        </>
      )}
    </div>
  );
}
