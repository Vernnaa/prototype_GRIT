import type { ReactNode } from 'react';
import { X } from '@phosphor-icons/react';
import type { Profile } from '../model';
import { Button } from './AppUI';

export function ProfileDialog({
  modal,
  close,
  profile,
  update,
  restart,
  sections,
}: {
  modal: string;
  close: () => void;
  profile: Profile;
  update: (part: Partial<Profile>) => void;
  restart: () => void;
  sections: (items: string[]) => ReactNode;
}) {
  if (!modal) return null;
  const index =
    modal === 'interestsView' ? 0 : modal === 'strengthsView' ? 1 : 2;
  return (
    <div
      className="absolute inset-0 z-40 flex items-end bg-navy/50"
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full rounded-t-[28px] bg-white p-6 pb-[max(24px,env(safe-area-inset-bottom))]"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-extrabold">
            {modal === 'name'
              ? 'Edit profile'
              : modal === 'reset'
                ? 'Start over?'
                : modal.endsWith('View')
                  ? modal
                      .replace('View', '')
                      .replace(/^./, (c) => c.toUpperCase())
                  : modal}
          </h2>
          <button aria-label="Close dialog" onClick={close}>
            <X size={20} />
          </button>
        </div>
        {modal === 'name' ? (
          <label className="block text-xs font-bold">
            Your name
            <input
              aria-label="Your name"
              value={profile.name}
              maxLength={40}
              onChange={(e) => update({ name: e.target.value })}
              className="mt-2 mb-4 h-12 w-full rounded-xl border border-navy/20 px-3"
            />
            <Button onClick={close}>Save</Button>
          </label>
        ) : modal === 'reset' ? (
          <>
            <p className="mb-5 text-xs">
              This clears your progress on this device.
            </p>
            <Button variant="navy" onClick={restart}>
              Clear and restart
            </Button>
          </>
        ) : modal.endsWith('View') ? (
          <div className="flex flex-wrap gap-2">
            {sections(
              profile.answers[index].length
                ? profile.answers[index]
                : ['Still discovering'],
            )}
          </div>
        ) : (
          <p className="text-xs leading-relaxed text-navy/65">
            {modal === 'Privacy'
              ? 'Prototype progress is stored only in this browser. Parent view is available from this profile.'
              : modal === 'Notifications'
                ? 'Keep exploring to see your next steps here.'
                : 'Explore at your own pace. Your direction can change as you grow.'}
          </p>
        )}
      </div>
    </div>
  );
}
