import type { Dispatch } from 'react';
import type { Field, Mission } from '../../data';
import type { Action, Reflection, State } from '../../state';
import { Arrow, BottomAction, Gritty, FieldCard, Section, Top } from '../../components/ui';
import { navigate } from '../../router';
import EnjoymentChoices from './components/EnjoymentChoices';

export function ReflectionPage({mission,reflection,setReflection,error,setError,dispatch}:{mission:Mission;reflection:Reflection;setReflection:(value:Reflection)=>void;error:string;setError:(value:string)=>void;dispatch:Dispatch<Action>}) {
  const finish=()=>{if(!reflection.enjoyment){setError('Choose how the mission felt to continue.');return;}dispatch({type:'reflect',reflection:{...reflection,mission:mission.id}});navigate('insight',mission.id);};
  return <><Top title="REFLECTION" back={()=>navigate('workspace',mission.id)}/><div className="scroll"><div className="step-label">REFLECT / 04</div><h1>How did that feel?</h1><p className="lead">Your experience matters. Let’s reflect on what you just did.</p><Section eyebrow="DID YOU ENJOY THIS?"><EnjoymentChoices value={reflection.enjoyment} onChange={enjoyment=>{setError('');setReflection({...reflection,enjoyment});}}/></Section><label className="text-label">What did you enjoy most?<textarea value={reflection.enjoyed} onChange={event=>setReflection({...reflection,enjoyed:event.target.value})} placeholder="The part that felt most interesting…" maxLength={300}/></label><label className="text-label">What felt challenging?<textarea value={reflection.challenge} onChange={event=>setReflection({...reflection,challenge:event.target.value})} placeholder="Something I had to figure out…" maxLength={300}/></label><Section eyebrow="TRY SOMETHING SIMILAR?"><div className="two-options">{['Yes','Not sure yet'].map(answer=><button type="button" aria-pressed={reflection.again===answer} className={reflection.again===answer?'selected':''} onClick={()=>setReflection({...reflection,again:answer})} key={answer}>{answer}</button>)}</div></Section></div><BottomAction error={error}><Arrow onClick={finish}>See what we learned</Arrow></BottomAction></>;
}

export function ExperienceInsightPage({state,ranked,id}:{state:State;ranked:Field[];id?:string}) {
  const reflection=state.reflections.find(item=>item.mission===id);
  return <><Top title="EXPERIENCE INSIGHT" back={()=>navigate('missions')}/><div className="scroll"><div className="insight-art"><Gritty mood="thinking" size={124}/><span>✦</span></div><div className="step-label">LOOK WHAT YOU DISCOVERED</div><h1>{reflection?.enjoyment==='Not for me'?'Now you know something new about yourself.':'You’re learning what feels right for you.'}</h1><p className="lead">{reflection?.enjoyed||'You completed a real experience.'} That’s a sign worth exploring, not a final answer.</p><Section eyebrow="POSSIBLE DIRECTIONS" title="A few paths to consider">{ranked.slice(0,3).map(field=><FieldCard key={field.id} field={field} state={state} onClick={()=>navigate('field',field.id)}/>)}</Section></div><BottomAction><Arrow onClick={()=>navigate('direction')}>Explore these directions</Arrow></BottomAction></>;
}

export default ReflectionPage;
