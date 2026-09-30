import type { Dispatch } from 'react';
import { fieldReason, missions, type Field } from '../../data';
import type { Action, State } from '../../state';
import { Arrow, BottomAction, CoachNote, FieldCard, Section, Top } from '../../components/ui';
import { navigate } from '../../router';
import FieldHero from './components/FieldHero';

export function ExplorePage({ state, ranked }: { state: State; ranked: Field[] }) {
  return <><Top title="EXPLORE" back={() => navigate('home')} side={<span className="top-end">✳</span>}/><div className="scroll"><div className="step-label">DISCOVER / 02</div><h1>Your possibilities<br/>are bigger than<br/>you think.</h1><p className="lead">Explore fields that connect with what you’ve discovered about yourself.</p><Section eyebrow="WORTH A LOOK" title="Start with these">{ranked.map(field=><FieldCard key={field.id} field={field} state={state} onClick={()=>navigate('field',field.id)}/>)}</Section><CoachNote>Not sure? Try a mission. What you enjoy doing can tell you more than a quiz.</CoachNote></div></>;
}

export function FieldDetailPage({ field, state, dispatch }: { field: Field; state: State; dispatch: Dispatch<Action> }) {
  const saved=state.savedFields.includes(field.id);
  return <><Top title="FIELD NOTES" back={()=>navigate('explore')} side={<button type="button" className="top-save" aria-label={saved?'Remove saved field':'Save field'} aria-pressed={saved} onClick={()=>dispatch({type:'saveField',id:field.id})}>{saved?'♥':'♡'}</button>}/><div className="scroll"><FieldHero field={field}/><Section eyebrow="01 / WHY IT MAY FIT" title="A possible connection"><p className="body-copy">{fieldReason(field,state)} This could be worth exploring, not a final answer.</p></Section><Section eyebrow="02 / WHAT YOU MIGHT DO" title="A day in this field"><ul className="clean-list">{field.activities.map(activity=><li key={activity}>{activity}</li>)}</ul></Section><Section eyebrow="03 / WHERE IT CAN LEAD" title="Many ways forward"><div className="tag-list">{field.careers.map(career=><span className="tag" key={career}>{career}</span>)}</div><p className="body-copy spaced">Related paths: {field.major}.</p></Section></div><BottomAction><Arrow onClick={()=>{const mission=missions.find(item=>item.field===field.id);if(mission)navigate('mission',mission.id);}}>Try this field</Arrow></BottomAction></>;
}

export default ExplorePage;
