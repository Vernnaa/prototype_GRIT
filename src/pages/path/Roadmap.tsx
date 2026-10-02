import type { ReactNode } from 'react';
import { Check } from '@phosphor-icons/react';
import { missions, type Field, type Mission } from '../../content';
import { Button, Card, Label } from '../../components/AppUI';

export function Roadmap({
  goal,
  top,
  headline,
  sections,
  missionCard,
  start,
  explore,
}: {
  goal: Field;
  top: (name: string) => ReactNode;
  headline: (text: string, sub: string) => ReactNode;
  sections: (items: string[]) => ReactNode;
  missionCard: (mission: Mission) => ReactNode;
  start: () => void;
  explore: () => void;
}) {
  return (
    <div className="px-5 pt-3">
      {top('Career roadmap')}
      {headline(
        `Explore ${goal.name}.`,
        'There are many ways in. See what feels right as you go.',
      )}
      <Card className="mb-5 !bg-navy text-white">
        <Label>YOUR GOAL</Label>
        <h2 className="text-2xl font-extrabold">{goal.name}</h2>
        <p className="mt-2 text-xs text-white/70">
          Based on your interests and experiences. You can change it anytime.
        </p>
      </Card>
      <Label>YOUR FLEXIBLE ROADMAP</Label>
      {[
        `Explore ${goal.name}`,
        'Understand the basics',
        `Try a ${goal.name} challenge`,
        'Learn practical tools',
        'Create a case study',
        'Build a portfolio',
      ].map((step, i) => (
        <div key={step} className="road-line relative flex gap-3 pb-5">
          <span
            className={`relative z-[1] flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${i === 0 ? 'bg-lime' : 'bg-white ring-2 ring-purple/25'}`}
          >
            {i === 0 ? <Check size={17} /> : i + 1}
          </span>
          <Card className="flex-1 !p-3">
            <p className="text-xs font-bold">{step}</p>
            <p className="text-[10px] text-purple">
              {i < 2 ? 'Explore' : 'Experience'} · +50 XP
            </p>
          </Card>
        </div>
      ))}
      <Label>SKILLS & EXPERIENCES</Label>
      {sections(goal.tags.slice(0, 3))}
      <div className="my-5">
        {missionCard(
          missions.find((m) => m.id === goal.mission) || missions[0],
        )}
      </div>
      <Button onClick={start}>Start My Path</Button>
      <p className="mt-4 text-center text-xs font-semibold">
        Not sure anymore?
      </p>
      <button
        onClick={explore}
        className="w-full py-3 text-xs font-bold text-purple"
      >
        Explore Another Direction ↗
      </button>
    </div>
  );
}
