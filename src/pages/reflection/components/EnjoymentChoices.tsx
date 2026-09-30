type Props = { value: string; onChange: (value: string) => void };

export default function EnjoymentChoices({ value, onChange }: Props) {
  return <div className="feeling-grid">{['Loved it', 'Liked it', 'It was okay', 'Not for me'].map((option, i) => <button type="button" key={option} aria-pressed={value === option} className={`feeling ${value === option ? 'selected' : ''}`} onClick={() => onChange(option)}><span>{['♡', '☺', '◡', '—'][i]}</span>{option}</button>)}</div>;
}
