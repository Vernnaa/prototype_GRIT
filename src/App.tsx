import { useEffect, useReducer, useState } from 'react';
import { fields, missions, suggestedFields } from './data';
import { KEY, loadState, reducer, type Reflection } from './state';
import { Nav } from './components';
import Layout from './Layout';
import { currentRoute } from './router';
import { SplashPage, WelcomePage, StartingPointPage, QuestionsPage, ExplorerProfilePage } from './pages/onboarding/page';
import { ExplorePage, FieldDetailPage } from './pages/explore/page';
import { MissionsPage, MissionDetailPage, MissionWorkspacePage } from './pages/missions/page';
import { ReflectionPage, ExperienceInsightPage } from './pages/reflection/page';
import { DirectionPage, MyPathPage } from './pages/path/page';
import HomePage from './pages/home/page';
import ProgressPage from './pages/progress/page';
import ProfilePage from './pages/profile/page';
import './styles.css';
import './styles/tokens.css';
import './styles/layout.css';
import './styles/onboarding.css';

export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);
  const [route, setRoute] = useState(currentRoute);
  const [error, setError] = useState('');
  const [reflection, setReflection] = useState<Reflection>({ mission: '', enjoyment: '', enjoyed: '', challenge: '', again: '' });

  useEffect(() => {
    const update = () => { setRoute(currentRoute()); setError(''); };
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* Prototype remains usable without storage. */ }
  }, [state]);
  useEffect(() => {
    if (route.page === 'reflection') {
      setReflection(state.reflections.find(r => r.mission === route.id) || { mission: route.id || '', enjoyment: '', enjoyed: '', challenge: '', again: '' });
    }
  }, [route.page, route.id, state.reflections]);

  const { page, id } = route;
  const ranked = suggestedFields(state);
  const field = fields.find(f => f.id === id) || ranked[0];
  const mission = missions.find(m => m.id === id) || missions[0];
  const chosen = fields.find(f => f.id === state.direction);
  const activeMission = missions.find(m => !state.completedMissions.includes(m.id) && m.field === ranked[0].id) || missions.find(m => !state.completedMissions.includes(m.id)) || missions[0];
  const showNav = !['splash', 'welcome', 'start', 'questions', 'explorer', 'workspace', 'reflection', 'insight'].includes(page);
  const props = { state, dispatch };

  return <Layout welcome={page === 'splash'}>
    <div className={`screen ${['splash', 'welcome', 'start', 'questions'].includes(page) ? `onboarding-screen ${page}-screen` : ''}`} key={`${page}-${id || ''}`}>
      {page === 'splash' && <SplashPage/>}
      {page === 'welcome' && <WelcomePage dispatch={dispatch}/>}
      {page === 'start' && <StartingPointPage {...props} error={error} setError={setError}/>}
      {page === 'questions' && <QuestionsPage {...props} error={error} setError={setError}/>}
      {page === 'explorer' && <ExplorerProfilePage state={state}/>}
      {page === 'explore' && <ExplorePage state={state} ranked={ranked}/>}
      {page === 'field' && <FieldDetailPage field={field} state={state} dispatch={dispatch}/>}
      {page === 'missions' && <MissionsPage state={state} ranked={ranked}/>}
      {page === 'mission' && <MissionDetailPage mission={mission} state={state}/>}
      {page === 'workspace' && <MissionWorkspacePage mission={mission} state={state} dispatch={dispatch}/>}
      {page === 'reflection' && <ReflectionPage mission={mission} reflection={reflection} setReflection={setReflection} error={error} setError={setError} dispatch={dispatch}/>}
      {page === 'insight' && <ExperienceInsightPage state={state} ranked={ranked} id={id}/>}
      {page === 'direction' && <DirectionPage state={state} ranked={ranked} dispatch={dispatch}/>}
      {page === 'path' && <MyPathPage state={state} chosen={chosen} activeMission={activeMission}/>}
      {page === 'home' && <HomePage state={state} ranked={ranked} activeMission={activeMission} chosen={chosen}/>}
      {page === 'progress' && <ProgressPage state={state} chosen={chosen}/>}
      {page === 'profile' && <ProfilePage state={state} dispatch={dispatch}/>}
    </div>
    {showNav && <Nav page={page === 'splash' || page === 'welcome' || page === 'start' || page === 'questions' || page === 'explorer' ? 'home' : page}/>}
  </Layout>;
}
