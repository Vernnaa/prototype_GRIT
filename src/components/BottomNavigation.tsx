import {
  CalendarBlank,
  Compass,
  House,
  PaperPlaneTilt,
  User,
} from '@phosphor-icons/react';
import type { Screen } from './AppShell';
import './bottom-navigation.css';

const items = [
  { id: 'home', label: 'Home', Icon: House, screens: ['home'] },
  {
    id: 'explore',
    label: 'Explore',
    Icon: Compass,
    screens: ['explorer', 'explore', 'field', 'compare'],
  },
  {
    id: 'missions',
    label: 'Missions',
    Icon: CalendarBlank,
    screens: ['missions', 'mission', 'workspace', 'reflection', 'insight'],
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
    <nav className="bottom-navigation" aria-label="Main navigation">
      {items.map(({ id, label, Icon, screens }) => {
        const active = (screens as readonly Screen[]).includes(screen);
        return (
          <button
            type="button"
            key={id}
            className="bottom-navigation-item"
            aria-current={active ? 'page' : undefined}
            onClick={() => go(id)}
          >
            <Icon
              size={23}
              weight={active ? 'fill' : 'regular'}
              aria-hidden="true"
            />
            <span>{label}</span>
            <span className="bottom-navigation-indicator" aria-hidden="true" />
          </button>
        );
      })}
    </nav>
  );
}
