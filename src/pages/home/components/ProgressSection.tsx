import { Cube, Star } from '@phosphor-icons/react';
import { level, levelNames, type Profile } from '../../../model';

export function ProgressSection({ profile }: { profile: Profile }) {
  const currentLevel = level(profile.xp);
  const nextLevelXP = currentLevel * 250;
  const percent = currentLevel === 6 ? 100 : ((profile.xp % 250) / 250) * 100;
  const ringBackground = `conic-gradient(var(--color-grit-lime) ${percent}%, var(--color-grit-navy) 0)`;
  return (
    <section className="mt-[25px]" aria-labelledby="dashboard-progress-title">
      <h2
        id="dashboard-progress-title"
        className="text-xl font-extrabold leading-6 tracking-[-.035em] text-grit-text"
      >
        Your Progress
      </h2>
      <div className="mt-3 flex items-center gap-3">
        <div
          className="h-[74px] w-[74px] shrink-0 rounded-full p-1.5"
          role="progressbar"
          aria-label="Progress toward next level"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          style={{ background: ringBackground }}
        >
          <span className="flex h-full w-full items-center justify-center rounded-full border-[3px] border-white bg-grit-dark text-grit-lime">
            <Cube size={29} weight="regular" aria-hidden="true" />
          </span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
          <strong className="whitespace-nowrap text-[19px] font-extrabold tracking-[-.03em] text-grit-text">
            Level {currentLevel}
          </strong>
          <span className="overflow-wrap-anywhere text-[13px] leading-[1.25] text-grit-text">
            {levelNames[currentLevel - 1]}
          </span>
        </div>
        <div className="w-[108px] shrink-0">
          <strong className="flex items-center gap-1 whitespace-nowrap text-sm font-extrabold text-grit-text">
            <Star
              size={18}
              weight="fill"
              className="shrink-0 text-grit-lime"
              aria-hidden="true"
            />
            {profile.xp.toLocaleString('en-US')} XP
          </strong>
          <div
            className="mt-[9px] h-[9px] overflow-hidden rounded-full bg-grit-border"
            aria-hidden="true"
          >
            <span
              className="block h-full rounded-full bg-grit-lime"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="sr-only">
            {currentLevel === 6
              ? 'Highest demo level reached'
              : `${nextLevelXP.toLocaleString('en-US')} XP for the next level`}
          </span>
        </div>
      </div>
    </section>
  );
}
