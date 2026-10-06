import { Clock, Lightbulb, Star, UserCircle } from '@phosphor-icons/react';
import type { Mission } from '../../../content';

export function NextStepCard({
  mission,
  onStart,
}: {
  mission: Mission;
  onStart: () => void;
}) {
  return (
    <section
      className="relative z-10 rounded-[21px] bg-grit-navy px-3 pb-3 pt-[15px]"
      aria-labelledby="dashboard-next-title"
    >
      <h2
        id="dashboard-next-title"
        className="mb-[11px] mx-[5px] text-[19px] font-extrabold leading-6 text-grit-white"
      >
        Your Next Step
      </h2>
      <div className="rounded-[15px] bg-grit-white p-[10px]">
        <div className="flex min-h-[70px] items-center gap-[11px]">
          <div
            className="relative flex h-[70px] w-16 shrink-0 items-end justify-center overflow-hidden rounded-xl bg-grit-soft-purple text-grit-purple"
            aria-hidden="true"
          >
            <Lightbulb
              className="absolute left-1.5 top-[7px] text-grit-navy"
              size={20}
              weight="fill"
            />
            <UserCircle
              className="relative z-[1] mb-[-3px]"
              size={51}
              weight="duotone"
            />
            <span className="absolute bottom-[5px] right-[-7px] h-[37px] w-[29px] rotate-[25deg] rounded-md bg-grit-lime" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="wrap-anywhere text-base font-extrabold leading-[1.2] tracking-[-.035em] text-grit-text">
              {mission.id === 'campaign'
                ? 'Try a Branding Challenge'
                : mission.title}
            </h3>
            <div className="mt-2 flex flex-wrap gap-x-[10px] gap-y-1 text-xs font-bold text-grit-navy">
              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <Clock size={16} aria-hidden="true" />
                {mission.time}
              </span>
              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <Star
                  size={16}
                  weight="fill"
                  className="text-grit-lime"
                  aria-hidden="true"
                />
                +{mission.xp} XP
              </span>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="mt-[9px] block min-h-11 w-full rounded-full bg-grit-lime text-[17px] font-extrabold text-grit-dark"
          onClick={onStart}
        >
          Start
        </button>
      </div>
    </section>
  );
}
