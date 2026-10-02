import type { ReactNode } from 'react';
import { Sparkle } from '@phosphor-icons/react';
import { Icon } from './AppUI';

export type Screen =
  | 'splash'
  | 'welcome'
  | 'start'
  | 'quiz'
  | 'explorer'
  | 'explore'
  | 'field'
  | 'compare'
  | 'missions'
  | 'mission'
  | 'workspace'
  | 'reflection'
  | 'insight'
  | 'direction'
  | 'path'
  | 'recommend'
  | 'progress'
  | 'achievements'
  | 'coach'
  | 'roadmap'
  | 'interests'
  | 'noidea'
  | 'parent'
  | 'profile'
  | 'home';

const tabs: { id: Screen; icon: string; label: string }[] = [
  { id: 'home', icon: 'house', label: 'Home' },
  { id: 'explore', icon: 'compass', label: 'Explore' },
  { id: 'missions', icon: 'flag', label: 'Missions' },
  { id: 'path', icon: 'path', label: 'My Path' },
  { id: 'profile', icon: 'user', label: 'Profile' },
];

export function AppShell({
  screen,
  go,
  children,
  modal,
}: {
  screen: Screen;
  go: (screen: Screen) => void;
  children: ReactNode;
  modal: ReactNode;
}) {
  const navVisible = ![
    'splash',
    'welcome',
    'start',
    'quiz',
    'noidea',
    'interests',
  ].includes(screen);
  return (
    <div className="app-viewport bg-paper">
      <main className="app-shell" aria-label="GRIT app">
        <div
          key={screen}
          className={`screen-enter screen-scroll min-h-0 flex-1 ${navVisible ? 'screen-with-nav' : ''} ${screen === 'coach' ? 'coach-screen' : ''}`}
        >
          {children}
        </div>
        {navVisible && (
          <>
            {screen !== 'coach' && <button
              type="button"
              aria-label="Open GRIT Coach"
              onClick={() => go('coach')}
              className="coach-shortcut absolute bottom-[calc(75px+env(safe-area-inset-bottom))] right-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-white bg-purple text-white shadow-lg"
            >
              <Sparkle size={24} />
            </button>}
            <nav
              className="tabbar relative z-10 flex h-[calc(75px+env(safe-area-inset-bottom))] shrink-0 items-start justify-around border-t border-navy/8 bg-white pt-3 pb-[env(safe-area-inset-bottom)]"
              aria-label="Main navigation"
            >
              {tabs.map((t) => {
                const active =
                  screen === t.id ||
                  (['field', 'compare'].includes(screen) &&
                    t.id === 'explore') ||
                  (screen === 'mission' && t.id === 'missions') ||
                  (['workspace', 'reflection', 'insight'].includes(screen) &&
                    t.id === 'missions') ||
                  ([
                    'direction',
                    'recommend',
                    'progress',
                    'achievements',
                    'roadmap',
                  ].includes(screen) &&
                    t.id === 'path');
                return (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => go(t.id)}
                    className={`flex min-w-[58px] flex-col items-center gap-1 text-[9px] font-bold ${active ? 'text-navy' : 'text-navy/45'}`}
                  >
                    <span
                      className={`flex h-7 w-9 items-center justify-center rounded-xl ${active ? 'bg-lime' : ''}`}
                    >
                      <Icon name={t.icon} size={19} />
                    </span>
                    {t.label}
                  </button>
                );
              })}
            </nav>
          </>
        )}
        {modal}
      </main>
    </div>
  );
}
