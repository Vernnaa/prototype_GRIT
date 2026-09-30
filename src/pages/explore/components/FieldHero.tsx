import type { Field } from '../../../data';

export default function FieldHero({ field }: { field: Field }) {
  return <div className="field-hero"><span className="field-hero-icon">{field.symbol}</span><div className="step-label">{field.group.toUpperCase()}</div><h1>{field.name}</h1><p>{field.summary}</p></div>;
}
