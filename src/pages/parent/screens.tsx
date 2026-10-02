import type { ReactNode } from 'react';
import { UserCircle } from '@phosphor-icons/react';
import { fields, type Field } from '../../content';
import type { Profile } from '../../model';
import { Card, Label } from '../../components/AppUI';

export function ParentView({
  profile,
  ranked,
  top,
  headline,
  sections,
}: {
  profile: Profile;
  ranked: Field[];
  top: (title: string) => ReactNode;
  headline: (text: string, sub: string) => ReactNode;
  sections: (items: string[]) => ReactNode;
}) {
  return (
    <div className="bg-white px-5 pt-6">
      {top('Parent view')}
      {headline(
        'Support their journey.',
        'Get a view of interests, progress, and potential. Let them lead.',
      )}
      <Card className="mb-5 flex items-center gap-3 !border-0 !shadow-none">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple/15">
          <UserCircle size={28} />
        </div>
        <div>
          <p className="text-[17px] font-extrabold">{profile.name}</p>
          <p className="text-[11px] text-navy/55">Exploring their future</p>
        </div>
      </Card>
      <div className="mb-6 grid grid-cols-3 gap-2">
        {[
          [profile.explored.length, 'Fields explored'],
          [profile.completed.length, 'Experiences completed'],
          [profile.answers.flat().length, 'Choices discovered'],
        ].map(([n, x]) => (
          <Card key={x} className="text-center">
            <strong className="text-2xl font-extrabold">{n}</strong>
            <p className="text-[10px] leading-tight text-navy/55">{x}</p>
          </Card>
        ))}
      </div>
      {[
        ['INTERESTS DISCOVERED', profile.answers[0]],
        ['STRENGTHS DISCOVERED', profile.answers[1]],
        [
          'CURRENT DIRECTIONS',
          profile.direction
            ? [
                fields.find((f) => f.id === profile.direction)?.name ||
                  'Exploring',
              ]
            : ranked.slice(0, 3).map((f) => f.name),
        ],
      ].map(([label, values]) => (
        <div key={label as string} className="mb-5">
          <Label>{label as string}</Label>
          {sections(
            (values as string[]).length
              ? (values as string[])
              : ['Still discovering'],
          )}
        </div>
      ))}
      <div className="mt-6">
        <p className="mb-3 text-[16px] font-extrabold">Conversation starters</p>
        {[
          'What part of this experience did you enjoy?',
          'What would you like to explore next?',
          'What support would help you?',
        ].map((x) => (
          <p key={x} className="mb-3 text-[13px] text-navy/70">
            <span className="mr-2 text-purple">●</span>{x}
          </p>
        ))}
      </div>
    </div>
  );
}
