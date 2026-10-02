import { useEffect, type Dispatch } from 'react';
import { fields, questions } from '../../data';
import type { Action, State } from '../../state';
import { Arrow, BottomAction, CoachNote, Gritty, Section, Top } from '../../components/ui';
import { navigate } from '../../router';
import mascotWave from '../../../references/maskot/maskot-1.png';
import mascotPhone from '../../../references/maskot/maskot-2.png';
import StartingPointChoices from './components/StartingPointChoices';

type Props = { state: State; dispatch: Dispatch<Action>; error: string; setError: (error: string) => void };

export function SplashPage() {
  useEffect(() => { const timer = window.setTimeout(() => navigate('welcome'), 2400); return () => window.clearTimeout(timer); }, []);
  return <button type="button" className="splash-content" onClick={() => navigate('welcome')} aria-label="Continue to welcome">
    <div className="splash-brand"><strong>GR<span>I</span>T</strong><p>FROM DREAM <span>TO DIRECTION</span></p></div>
    <div className="splash-art"><span aria-hidden="true">✳</span><img src={mascotWave} alt="Gritty the robot waving hello"/><span aria-hidden="true">↗</span></div>
    <p className="splash-note">A brighter you.<br/>A bigger tomorrow.</p><span className="splash-loader" aria-hidden="true"/>
  </button>;
}

export function WelcomePage({ dispatch }: { dispatch: Dispatch<Action> }) {
  return <><div className="scroll welcome-content"><h1>You don’t<br/>have to know<br/><mark>your future yet.</mark></h1><p className="lead">Explore who you are, try new possibilities, and find a direction that feels right for you.</p><div className="welcome-illustration"><span className="welcome-scribble" aria-hidden="true">↗</span><img src={mascotPhone} alt="Gritty the robot waving and holding a device"/><span className="welcome-annotation">Same journey,<br/>brighter you!</span></div></div><div className="welcome-actions"><button className="welcome-cta" type="button" onClick={() => navigate('start')}>Start Exploring</button><button className="welcome-secondary" type="button" onClick={() => { dispatch({ type: 'start', value: 'dream' }); navigate('start'); }}>I already know what I want</button></div></>;
}

export function StartingPointPage({ state, dispatch, error, setError }: Props) {
  const continueFromStart = () => {
    if (state.startingPoint === 'dream' && !state.dreamField) { setError('Choose a field you would like to explore.'); return; }
    if (!state.startingPoint) dispatch({ type: 'start', value: 'noidea' });
    if (!state.answers.interests.length) dispatch({ type: 'answer', question: 'interests', values: ['Solving problems'] });
    navigate('questions');
  };
  return <><Top title="" back={() => navigate('welcome')}/><div className="scroll"><h1>Where are you<br/>right now?</h1><p className="lead">Everyone’s journey is different. Tell us where you are so we can support you better.</p><StartingPointChoices state={state} dispatch={dispatch} onSelect={() => setError('')}/>{state.startingPoint === 'dream' && <label className="text-label">What would you like to explore?<select className="field-select" value={state.dreamField} onChange={e => dispatch({type:'dreamField',id:e.target.value})}><option value="">Choose a field</option>{fields.map(field => <option key={field.id} value={field.id}>{field.name}</option>)}</select></label>}<p className="hint">No pressure. Your starting point can change.</p></div><BottomAction error={error}><Arrow kind="dark" onClick={continueFromStart}>Continue</Arrow></BottomAction></>;
}

export function QuestionsPage({ state, dispatch, error, setError }: Props) {
  const question = Math.min(state.question, questions.length - 1);
  const current = questions[question];
  const continueQuestion = () => {
    if (!state.answers[current.id].length) { setError('Choose at least one option to continue.'); return; }
    setError('');
    if (question < questions.length - 1) dispatch({type:'question',value:question + 1});
    else navigate('explorer');
  };
  return <><Top title="" back={() => question ? dispatch({type:'question',value:question - 1}) : navigate('start')}/><div className="scroll"><div className="progress-meta"><span>Question {question + 1} of {questions.length}</span></div><div className="progress-track"><span style={{width:`${(question + 1) / questions.length * 100}%`}}/></div><h1>{question === 0 ? <>What activities<br/>do you enjoy the most?</> : current.title}</h1><p className="lead">Select up to 3 options</p><div className="option-grid">{current.choices.map((option, i) => { const selected=state.answers[current.id].includes(option); return <button key={option} type="button" aria-pressed={selected} className={`option ${selected?'selected':''}`} onClick={() => { const answers=state.answers[current.id]; if (!selected && answers.length === 3) { setError('Choose up to 3 options.'); return; } setError(''); dispatch({type:'answer',question:current.id,values:selected?answers.filter(value=>value!==option):[...answers,option]}); }}><span className="option-symbol" aria-hidden="true">{['🎨','💡','♥','♧','▥','⬡','▤','▦','➤'][i]}</span><span>{option}</span></button>; })}</div></div><BottomAction error={error}><Arrow kind="dark" onClick={continueQuestion}>{question === questions.length - 1 ? 'See my explorer profile' : 'Next'}</Arrow></BottomAction></>;
}

export function ExplorerProfilePage({ state }: Pick<Props, 'state'>) {
  return <><Top title="YOUR EXPLORER PROFILE" back={() => navigate('questions')}/><div className="scroll"><div className="explorer-heading"><h1>Here’s what we’re discovering about you.</h1><Gritty mood="thinking" size={76}/></div><p className="lead">A starting point, not a label. It changes with every experience.</p>{questions.map((question,index)=><Section key={question.id} eyebrow={`0${index+1} / YOUR ${question.id.toUpperCase()}`}><div className="tag-list">{state.answers[question.id].length ? state.answers[question.id].map(answer=><span className="tag" key={answer}>{answer}</span>) : <span className="muted">Still to discover</span>}</div></Section>)}<CoachNote>You’re not defined by one result. Think of this as your starting point.</CoachNote></div><BottomAction><Arrow onClick={()=>navigate('explore')}>Explore my possibilities</Arrow></BottomAction></>;
}

export default WelcomePage;
