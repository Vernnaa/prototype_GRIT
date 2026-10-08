import {
  CalendarBlank,
  Compass,
  House,
  PaperPlaneTilt,
  User,
} from '@phosphor-icons/react';
import type { Screen } from './AppShell';

const items = [
  { id: 'home', label: 'Home', Icon: House, screens: ['home'] },
  {
    id: 'explore',
    label: 'Explore',
    Icon: Compass,
    screens: ['explorer', 'explore', 'discover', 'field', 'compare'],
  },
  {
    id: 'missions',
    label: 'Missions',
    Icon: CalendarBlank,
    screens: ['missions', 'mission', 'workspace', 'reflection', 'insight', 'mission-direction'],
  },
  {
    id: 'path',
    label: 'My Path',
    Icon: PaperPlaneTilt,
    screens: [
      'direction',
      'path',
      'recommend',
      'progress',
      'achievements',
      'roadmap',
    ],
  },
  {
    id: 'profile',
    label: 'Profile',
    Icon: User,
    screens: ['profile', 'parent'],
  },
] as const;

export function BottomNavigation({
  screen,
  go,
}: {
  screen: Screen;
  go: (screen: Screen) => void;
}) {
  return (
    <nav
      className="relative z-10 grid h-[calc(72px+env(safe-area-inset-bottom,0px))] shrink-0 grid-cols-5 border-t border-grit-border bg-white px-0 pt-[8px] pb-[calc(8px+env(safe-area-inset-bottom,0px))] text-grit-navy"
      aria-label="Main navigation"
    >
      {items.map(({ id, label, Icon, screens }) => {
        const active = (screens as readonly Screen[]).includes(screen);
        return (
          <button
            type="button"
            key={id}
            className="group flex min-h-[44px] min-w-0 flex-col items-center justify-center gap-[4px] border-0 border-none bg-transparent p-0 text-[10px]! leading-[1.2]! font-medium! whitespace-nowrap text-inherit aria-[current=page]:font-bold!"
            aria-current={active ? 'page' : undefined}
            onClick={() => go(id)}
          >
            <Icon
              size={23}
              weight={active ? 'fill' : 'regular'}
              aria-hidden="true"
              className="shrink-0 opacity-[0.85] group-aria-[current=page]:opacity-100"
            />
            <span>{label}</span>
            <span
              className="h-[4px] w-[32px] rounded-[999px] bg-transparent group-aria-[current=page]:bg-grit-lime"
              aria-hidden="true"
            />
          </button>
        );
      })}
    </nav>
  );
}
