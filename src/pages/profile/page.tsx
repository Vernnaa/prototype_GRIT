import type { Dispatch } from 'react';
import { fields, questions } from '../../data';
import type { Action, State } from '../../state';
import { Section, Top } from '../../components/ui';
import { navigate } from '../../router';

export default function ProfilePage({state,dispatch}:{state:State;dispatch:Dispatch<Action>}) {
  const direction=fields.find(field=>field.id===state.direction);
  return <><Top title="PROFILE" back={()=>navigate('home')}/><div className="scroll"><div className="profile-header"><span className="avatar">{state.name.charAt(0).toUpperCase()}</span><div><div className="eyebrow">GRIT EXPLORER</div><h1>{state.name}</h1><p>Explorer · Level {Math.floor(state.xp/300)+1}</p></div></div><label className="text-label">Your name<input value={state.name} maxLength={40} onChange={event=>dispatch({type:'name',value:event.target.value})}/></label><Section eyebrow="WHAT WE KNOW SO FAR">{questions.map(question=><div className="profile-row" key={question.id}><strong>My {question.id}</strong><small>{state.answers[question.id].join(', ')||'Still discovering'}</small></div>)}<div className="profile-row"><strong>My direction</strong><small>{direction?.name||'Still exploring'}</small></div></Section><div className="profile-actions"><button onClick={()=>navigate('progress')}>My progress <span>↗</span></button><button onClick={()=>navigate('start')}>Revisit my starting point <span>↗</span></button><button onClick={()=>{if(window.confirm('Reset all exploration progress on this device?')){dispatch({type:'reset'});navigate('welcome');}}}>Reset demo progress <span>↗</span></button></div></div></>;
}
