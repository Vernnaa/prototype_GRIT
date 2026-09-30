import type { Dispatch } from 'react';
import { fields, questions } from '../../data';
import type { Action, State } from '../../state';
import { Arrow, BottomAction, CoachNote, Gritty, Section, Top } from '../../components/ui';
import { navigate } from '../../router';
import WelcomeHero from './components/WelcomeHero';
import StartingPointChoices from './components/StartingPointChoices';

type Props = { state: State; dispatch: Dispatch<Action>; error: string; setError: (error: string) => void };

export function WelcomePage() {
  return <><WelcomeHero/><div className="welcome-bottom"><div className="eyebrow">YOUR JOURNEY STARTS HERE / 01</div><h1>You don’t have to know your <mark>future yet.</mark></h1><p>Explore who you are, try new possibilities, and find a direction that feels right for you.</p><Arrow onClick={() => navigate('start')}>Start exploring</Arrow></div></>;
}

export function StartingPointPage({ state, dispatch, error, setError }: Props) {
  return <><Top title="GETTING STARTED" back={() => navigate('welcome')}/><div className="scroll"><div className="step-label">01 / 03 · EXPLORE</div><h1>Where are you<br/>right now?</h1><p className="lead">Everyone’s journey is different. Tell us where you are so we can support you better.</p><StartingPointChoices state={state} dispatch={dispatch} onSelect={() => setError('')}/>{state.startingPoint === 'dream' && <label className="text-label">What would you like to explore?<select className="field-select" value={state.dreamField} onChange={e => dispatch({type:'dreamField',id:e.target.value})}><option value="">Choose a field</option>{fields.map(field => <option key={field.id} value={field.id}>{field.name}</option>)}</select></label>}<p className="hint">No pressure. Your starting point can change.</p></div><BottomAction error={error}><Arrow onClick={() => !state.startingPoint ? setError('Choose a starting point to continue.') : state.startingPoint === 'dream' && !state.dreamField ? setError('Choose a field you would like to explore.') : navigate('questions')}>Continue</Arrow></BottomAction></>;
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
  return <><Top title="EXPLORE YOURSELF" back={() => question ? dispatch({type:'question',value:question - 1}) : navigate('start')}/><div className="scroll"><div className="progress-meta"><span>QUESTION {question + 1} / {questions.length}</span><span>{Math.round((question + 1) / questions.length * 100)}%</span></div><div className="progress-track"><span style={{width:`${(question + 1) / questions.length * 100}%`}}/></div><h1>{current.title}</h1><p className="lead">Select up to 3 that feel like you. There are no wrong answers.</p><div className="option-grid">{current.choices.map((option, i) => { const selected=state.answers[current.id].includes(option); return <button key={option} type="button" aria-pressed={selected} className={`option ${selected?'selected':''}`} onClick={() => { const answers=state.answers[current.id]; if (!selected && answers.length === 3) { setError('Choose up to 3 options.'); return; } setError(''); dispatch({type:'answer',question:current.id,values:selected?answers.filter(value=>value!==option):[...answers,option]}); }}><span className="option-symbol">{['✳','◈','♡','↗','⌘','□','◌','▤','✦'][i]}</span><span>{option}</span></button>; })}</div></div><BottomAction error={error}><Arrow onClick={continueQuestion}>{question === questions.length - 1 ? 'See my explorer profile' : 'Next question'}</Arrow></BottomAction></>;
}

export function ExplorerProfilePage({ state }: Pick<Props, 'state'>) {
  return <><Top title="YOUR EXPLORER PROFILE" back={() => navigate('questions')}/><div className="scroll"><div className="explorer-heading"><h1>Here’s what we’re discovering about you.</h1><Gritty mood="thinking" size={76}/></div><p className="lead">A starting point, not a label. It changes with every experience.</p>{questions.map((question,index)=><Section key={question.id} eyebrow={`0${index+1} / YOUR ${question.id.toUpperCase()}`}><div className="tag-list">{state.answers[question.id].length ? state.answers[question.id].map(answer=><span className="tag" key={answer}>{answer}</span>) : <span className="muted">Still to discover</span>}</div></Section>)}<CoachNote>You’re not defined by one result. Think of this as your starting point.</CoachNote></div><BottomAction><Arrow onClick={()=>navigate('explore')}>Explore my possibilities</Arrow></BottomAction></>;
}

export default WelcomePage;
