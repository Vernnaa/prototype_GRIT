import { Check, Compass, DotsThree, Flag } from '@phosphor-icons/react';
import type { Profile } from '../../../model';

export function JourneySection({ profile }: { profile: Profile }) {
  const journey = [
    {
      label: 'Explore',
      Icon: Compass,
      status: 'active',
      description: 'Current exploration',
    },
    {
      label: 'Experience',
      Icon: profile.completed.length ? Check : DotsThree,
      status: profile.completed.length ? 'completed' : 'upcoming',
      description: profile.completed.length
        ? 'Experience completed'
        : 'Experience upcoming',
    },
    {
      label: 'Reflect',
      Icon: profile.reflections.length ? Check : DotsThree,
      status: profile.reflections.length ? 'secondary' : 'upcoming',
      description: profile.reflections.length
        ? 'Reflection completed'
        : 'Reflection upcoming',
    },
    {
      label: 'Decide',
      Icon: profile.direction ? Check : DotsThree,
      status: profile.direction ? 'secondary' : 'upcoming',
      description: profile.direction
        ? 'Direction saved'
        : 'Direction still open',
    },
    {
      label: 'Progress',
      Icon: Flag,
      status: profile.milestones.length ? 'completed' : 'upcoming',
      description: profile.milestones.length
        ? 'Milestone completed'
        : 'Next milestone ahead',
    },
  ];
  const states: Record<string, string> = {
    active: 'bg-grit-purple text-grit-white',
    completed: 'bg-grit-lime text-grit-navy',
    secondary: 'bg-grit-soft-blue text-[#176190]',
    upcoming: 'bg-grit-soft-blue text-grit-navy',
  };
  return (
    <section className="mt-[22px]" aria-labelledby="dashboard-journey-title">
      <h2
        id="dashboard-journey-title"
        className="text-xl font-extrabold leading-6 tracking-[-.035em] text-grit-text"
      >
        Your Journey
      </h2>
      <ol className="relative mt-4 grid grid-cols-5 gap-[3px] p-0 before:absolute before:left-[10%] before:right-[10%] before:top-5 before:h-0.5 before:bg-grit-border">
        {journey.map(({ label, Icon, status, description }) => (
          <li
            key={label}
            aria-label={`${label}: ${description}`}
            className="relative flex min-w-0 flex-col items-center gap-[7px]"
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full ${states[status]}`}
            >
              <Icon
                size={21}
                weight={status === 'active' ? 'fill' : 'bold'}
                aria-hidden="true"
              />
            </span>
            <span className="whitespace-nowrap text-[10px] font-semibold leading-[1.2] text-grit-text">
              {label}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
