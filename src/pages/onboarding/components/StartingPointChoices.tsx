import type { Dispatch } from 'react';
import type { Action, State } from '../../../state';

const choices = [
  ['dream', 'I have a dream', 'I know what I want to become.', '↗'],
  ['ideas', 'I have a few ideas', 'I know what interests me, but I’m not sure yet.', '✳'],
  ['noidea', 'I have no idea', 'I’m still figuring out what I want.', '?'],
];

export default function StartingPointChoices({ state, dispatch, onSelect }: { state: State; dispatch: Dispatch<Action>; onSelect: () => void }) {
  return <div className="start-options">{choices.map(([value, title, sub, icon]) => <button type="button" aria-pressed={(state.startingPoint || 'noidea') === value} className={`choice ${(state.startingPoint || 'noidea') === value ? 'selected' : ''}`} onClick={() => { dispatch({ type: 'start', value }); onSelect(); }} key={value}><span className="choice-copy"><strong>{title}</strong><small>{sub}</small></span><span className={`choice-art choice-art-${value}`} aria-hidden="true">{icon}</span></button>)}</div>;
}
