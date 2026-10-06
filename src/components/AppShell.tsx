import type { ReactNode } from 'react';
import { Sparkle } from '@phosphor-icons/react';
import { BottomNavigation } from './BottomNavigation';

export type Screen =
  | 'splash'
  | 'welcome'
  | 'start'
  | 'quiz'
  | 'explorer'
  | 'explore'
  | 'discover'
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

export function AppShell({
  screen,
  go,
  children,
  modal,
  missionFlow = false,
  exploreFlow = false,
}: {
  screen: Screen;
  go: (screen: Screen) => void;
  children: ReactNode;
  modal: ReactNode;
  missionFlow?: boolean;
  exploreFlow?: boolean;
}) {
  const navVisible = ![
    'splash',
    'welcome',
    'start',
    'quiz',
    'noidea',
    'interests',
  ].includes(screen);
  const isHome = screen === 'home';
  return (
    <div className="app-viewport bg-paper">
      <main className="app-shell" aria-label="GRIT app">
        <div
          key={screen}
          className={`screen-enter screen-scroll min-h-0 flex-1 ${navVisible ? 'screen-with-nav' : ''} ${isHome ? 'home-screen' : ''} ${screen === 'path' || exploreFlow ? 'bg-white !pb-0' : ''} ${missionFlow ? 'bg-white !pb-0' : ''} ${screen === 'coach' ? 'coach-screen' : ''}`}
        >
          {children}
        </div>
        {navVisible && (
          <>
            {screen !== 'coach' && screen !== 'profile' && !isHome && !missionFlow && !exploreFlow && (
              <button
                type="button"
                aria-label="Open GRIT Coach"
                onClick={() => go('coach')}
                className="coach-shortcut absolute bottom-[calc(80px+env(safe-area-inset-bottom))] right-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-white bg-purple text-white shadow-lg"
              >
                <Sparkle size={24} />
              </button>
            )}
            <BottomNavigation screen={missionFlow ? 'workspace' : exploreFlow ? 'explore' : screen} go={go} />
          </>
        )}
        {modal}
      </main>
    </div>
  );
}
