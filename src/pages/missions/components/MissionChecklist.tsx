import type { Dispatch } from 'react';
import type { Action, State } from '../../../state';
import type { Mission } from '../../../data';

export default function MissionChecklist({ mission, state, dispatch }: { mission: Mission; state: State; dispatch: Dispatch<Action> }) {
  const progress = state.missionProgress[mission.id] || [];
  return <div className="checklist">{mission.steps.map((step, i) => {
    const checked = progress.includes(i);
    return <button type="button" key={step} aria-pressed={checked} className={`check-row ${checked ? 'done' : ''}`} onClick={() => dispatch({ type: 'missionStep', id: mission.id, step: i })}><span className="check-number">{checked ? '✓' : i + 1}</span><span>{step}</span></button>;
  })}</div>;
}
