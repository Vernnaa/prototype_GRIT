import type { Dispatch } from 'react';
import { fields, missions, type Field, type Mission } from '../../data';
import type { Action, State } from '../../state';
import { Arrow, BottomAction, CoachNote, MissionCard, Section, Top } from '../../components/ui';
import { navigate } from '../../router';
import MissionChecklist from './components/MissionChecklist';

export function MissionsPage({state,ranked}:{state:State;ranked:Field[]}) {
  const ordered=[...missions].sort((a,b)=>ranked.findIndex(field=>field.id===a.field)-ranked.findIndex(field=>field.id===b.field));
  return <><Top title="MISSIONS" back={()=>navigate('home')}/><div className="scroll"><div className="step-label">EXPERIENCE / 03</div><h1>Don’t just imagine it.<br/><mark>Try it.</mark></h1><p className="lead">Real experiences help you understand what fits you. Start with something small.</p><Section eyebrow="RECOMMENDED FOR YOU" title="Try something new">{ordered.map(mission=><MissionCard key={mission.id} mission={mission} done={state.completedMissions.includes(mission.id)} onClick={()=>navigate('mission',mission.id)}/>)}</Section></div></>;
}

export function MissionDetailPage({mission,state}:{mission:Mission;state:State}) {
  return <><Top title="MISSION BRIEF" back={()=>navigate('missions')}/><div className="scroll"><div className="mission-hero"><span className="mission-hero-icon">{mission.symbol}</span><div className="step-label">{fields.find(field=>field.id===mission.field)?.name.toUpperCase()} / BEGINNER</div><h1>{mission.title}</h1><p>{mission.intro}</p><div className="hero-meta"><span>◷ {mission.time}</span><span>✦ +{mission.xp} XP</span></div></div><Section eyebrow="THE PLAN" title="What you’ll do"><ol className="number-list">{mission.steps.map((step,index)=><li key={step}><b>{String(index+1).padStart(2,'0')}</b>{step}</li>)}</ol></Section><Section eyebrow="SKILLS TO EXPLORE"><div className="tag-list">{mission.skills.map(skill=><span className="tag" key={skill}>{skill}</span>)}</div></Section></div><BottomAction><Arrow onClick={()=>navigate('workspace',mission.id)}>{state.completedMissions.includes(mission.id)?'See my mission':'Start mission'}</Arrow></BottomAction></>;
}

export function MissionWorkspacePage({mission,state,dispatch}:{mission:Mission;state:State;dispatch:Dispatch<Action>}) {
  const progress=state.missionProgress[mission.id]||[];
  return <><Top title="MISSION IN PROGRESS" back={()=>navigate('mission',mission.id)}/><div className="scroll"><div className="step-label">ONE STEP AT A TIME</div><h1>{mission.title}</h1><div className="progress-meta"><span>YOUR PROGRESS</span><span>{progress.length} / {mission.steps.length} STEPS</span></div><div className="progress-track"><span style={{width:`${progress.length/mission.steps.length*100}%`}}/></div><MissionChecklist mission={mission} state={state} dispatch={dispatch}/><CoachNote>You’re doing great. One step at a time.</CoachNote></div><BottomAction><p className="hint">Your checklist saves automatically on this device.</p><Arrow disabled={progress.length!==mission.steps.length} onClick={()=>{dispatch({type:'completeMission',id:mission.id,xp:mission.xp});navigate('reflection',mission.id);}}>Finish & reflect</Arrow></BottomAction></>;
}

export default MissionsPage;
