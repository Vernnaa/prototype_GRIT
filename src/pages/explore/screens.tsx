import type { ReactNode } from 'react';
import { ArrowRight, Check, MagnifyingGlass } from '@phosphor-icons/react';
import { fields, missions, type Field } from '../../content';
import type { Profile } from '../../model';
import { Button, Card, Chip, Icon, Label } from '../../components/AppUI';

export function Explore({
  filter,
  setFilter,
  search,
  setSearch,
  fieldCard,
  headline,
  onCompare,
}: {
  filter: string;
  setFilter: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
  fieldCard: (field: Field) => ReactNode;
  headline: (text: string, sub: string) => ReactNode;
  onCompare: () => void;
}) {
  const results = fields.filter(
    (f) =>
      (filter === 'All' ||
        f.category.toLowerCase().includes(filter.toLowerCase())) &&
      `${f.name} ${f.category} ${f.summary} ${f.majors.join(' ')}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <div className="h-full px-5 pt-5">
      {headline(
        'Your possibilities are bigger than you think.',
        'Explore paths that connect with what you’re discovering about yourself.',
      )}
      <label className="mb-4 flex h-11 items-center gap-2 rounded-xl border border-navy/10 bg-white px-3">
        <MagnifyingGlass size={17} />
        <input
          aria-label="Search fields or careers"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search fields or careers..."
          className="w-full bg-transparent text-xs outline-none"
        />
      </label>
      <div className="-mx-5 mb-4 flex gap-2 overflow-x-auto px-5 pb-2">
        {[
          'All',
          'Business',
          'Design',
          'Technology',
          'Healthcare',
          'Education',
          'Communication',
          'Science',
          'Social',
        ].map((f) => (
          <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>
            {f}
          </Chip>
        ))}
      </div>
      {results.length ? (
        results.map(fieldCard)
      ) : (
        <Card className="text-center">
          <MagnifyingGlass className="mx-auto mb-2" />
          <p className="text-sm font-bold">
            No matches yet. Try another search.
          </p>
        </Card>
      )}
      <button
        onClick={onCompare}
        className="mt-2 flex w-full items-center justify-center gap-2 py-3 text-xs font-extrabold text-purple"
      >
        Compare directions <ArrowRight size={16} />
      </button>
    </div>
  );
}

export function FieldDetail({
  field,
  profile,
  top,
  sections,
  update,
  chooseMission,
}: {
  field: Field;
  profile: Profile;
  top: (title: string) => ReactNode;
  sections: (items: string[]) => ReactNode;
  update: (part: Partial<Profile>) => void;
  chooseMission: (id: string) => void;
}) {
  return (
    <div className="px-5 pt-3">
      {top('Explore a field')}
      <div className="mt-5 flex items-center gap-3">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple text-white">
          <Icon name={field.icon} size={30} />
        </span>
        <div>
          <h1 className="text-[30px] font-extrabold tracking-tight">
            {field.name}
          </h1>
          <p className="text-xs font-semibold text-navy/55">{field.category}</p>
        </div>
      </div>
      <div className="my-5 flex h-36 items-center justify-center overflow-hidden rounded-[22px] bg-navy">
        <div className="relative flex h-24 w-48 items-center justify-center rounded-2xl border border-white/30 bg-white/10 text-lime">
          <Icon name={field.icon} size={72} />
          <span className="absolute -right-10 -top-4 text-5xl">↗</span>
        </div>
      </div>
      <Label>WHAT IS IT?</Label>
      <p className="mb-5 text-[13px] leading-relaxed">{field.summary}</p>
      <Label>WHY IT MAY FIT YOU</Label>
      <ul className="mb-5 space-y-2">
        {field.tags.slice(0, 3).map((x) => (
          <li className="flex items-center gap-2 text-xs" key={x}>
            <Check size={16} className="text-purple" />
            You enjoy {x.toLowerCase()}
          </li>
        ))}
      </ul>
      <Label>WHAT YOU MIGHT DO</Label>
      {sections(field.activities)}
      <div className="mt-5">
        <Label>RELATED CAREERS</Label>
        {sections(field.careers)}
      </div>
      <div className="mt-5">
        <Label>RELATED MAJORS</Label>
        {sections(field.majors)}
      </div>
      <div className="mt-5">
        <Label>ALTERNATIVE PATHS</Label>
        <p className="text-xs leading-relaxed text-navy/65">
          Study a related major, build hands-on projects, or learn with mentors.
          There’s more than one way in.
        </p>
      </div>
      <p className="mt-5 text-xs font-extrabold text-purple">
        This could be worth exploring.
      </p>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          onClick={() =>
            update({
              saved: profile.saved.includes(field.id)
                ? profile.saved.filter((x) => x !== field.id)
                : [...profile.saved, field.id],
            })
          }
        >
          {profile.saved.includes(field.id) ? 'Saved ✓' : 'Save for Later'}
        </Button>
        <Button onClick={() => chooseMission(field.mission)}>
          Try This Field
        </Button>
      </div>
    </div>
  );
}

export function Compare({
  compare,
  setCompare,
  top,
  headline,
  chooseField,
  onMissions,
}: {
  compare: string[];
  setCompare: (update: (ids: string[]) => string[]) => void;
  top: (title: string) => ReactNode;
  headline: (text: string, sub: string) => ReactNode;
  chooseField: (id: string) => void;
  onMissions: () => void;
}) {
  return (
    <div className="px-5 pt-3">
      {top('Compare directions')}
      {headline(
        'Side by side, not set in stone.',
        'See what’s different, then try one for yourself.',
      )}
      <Label>CHOOSE UP TO THREE</Label>
      <div className="mb-5 flex flex-wrap gap-2">
        {fields.slice(0, 10).map((f) => (
          <Chip
            key={f.id}
            active={compare.includes(f.id)}
            onClick={() =>
              setCompare((c) =>
                c.includes(f.id)
                  ? c.length > 1
                    ? c.filter((x) => x !== f.id)
                    : c
                  : c.length < 3
                    ? [...c, f.id]
                    : [...c.slice(1), f.id],
              )
            }
          >
            {f.name}
          </Chip>
        ))}
      </div>
      {[
        'What you do',
        'What you might enjoy',
        'Typical activities',
        'Skills involved',
        'Related majors',
        'Experience ideas',
      ].map((dimension, i) => (
        <div key={dimension} className="mb-3">
          <Label>{dimension}</Label>
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: `repeat(${compare.length},minmax(0,1fr))`,
            }}
          >
            {compare.map((id) => {
              const f = fields.find((x) => x.id === id)!;
              return (
                <Card key={id} className="!p-2.5">
                  <p className="mb-1 text-[11px] font-extrabold">{f.name}</p>
                  <p className="text-[10px] leading-snug text-navy/65">
                    {
                      [
                        f.summary,
                        f.tags.slice(0, 2).join(', '),
                        f.activities.slice(0, 2).join(', '),
                        f.tags.slice(2, 4).join(', '),
                        f.majors.slice(0, 2).join(', '),
                        missions.find((m) => m.id === f.mission)?.title,
                      ][i]
                    }
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
      <Button onClick={() => chooseField(compare[0])}>
        Explore {fields.find((f) => f.id === compare[0])?.name}
      </Button>
      <p className="my-3 text-center text-xs font-semibold">
        Not sure yet? That’s okay.
      </p>
      <Button variant="outline" onClick={onMissions}>
        Try a Mission First
      </Button>
    </div>
  );
}
