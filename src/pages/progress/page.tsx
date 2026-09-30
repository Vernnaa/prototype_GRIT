import { Top, Section } from '../../components/ui';
import type { State } from '../../state';
import type { Field } from '../../data';
import { navigate } from '../../router';

export default function ProgressPage({state,chosen}:{state:State;chosen?:Field}) {
  const milestones:[string,boolean][]=[['Curious Explorer',!!state.answers.interests.length],['First Mission',!!state.completedMissions.length],['Thoughtful Explorer',!!state.reflections.length],['Finding Direction',!!chosen]];
  return <><Top title="YOUR PROGRESS" back={()=>navigate('path')}/><div className="scroll"><div className="step-label">EVERY STEP COUNTS</div><h1>You’re getting<br/><mark>closer.</mark></h1><div className="progress-hero"><span className="big-number">{state.xp}</span><span>XP EARNED<br/>EXPLORER LEVEL {Math.floor(state.xp/300)+1}</span></div><div className="stat-grid">{[['Fields saved',state.savedFields.length],['Missions',state.completedMissions.length],['Reflections',state.reflections.length],['Steps forward',Object.values(state.answers).filter(answers=>answers.length).length]].map(([label,value])=><div key={String(label)}><strong>{value}</strong><span>{label}</span></div>)}</div><Section eyebrow="MILESTONES" title="What you’ve done">{milestones.map(([label,unlocked])=><div className="milestone" key={label}><span>{unlocked?'✦':'○'}</span><strong>{label}</strong><small>{unlocked?'Unlocked':'Still to come'}</small></div>)}</Section></div></>;
}
