const PAGE_IDS = [
  'splash',
  'register',
  'login',
  'onboarding',
  'career-select',
  'assessment-intro',
  'assessment',
  'assessment-result',
  'home',
  'career-goal',
  'skill-progress',
  'skill-detail',
  'tasks',
  'more',
  'practice',
  'practice-info',
  'practice-detail',
  'practice-result',
  'coach',
  'portfolio',
  'learning',
  'lesson',
  'lesson-quiz',
  'lesson-complete',
  'final-assessment-intro',
  'final-assessment',
  'final-assessment-result',
  'achievements',
  'certifications',
  'profile',
  'notif',
  'grit-pro',
  'pro-preview',
  'payment',
  'payment-processing',
  'payment-success',
  'settings',
];

function pageUrl(id, params) {
  if (!PAGE_IDS.includes(id)) return null;

  const isRootPage = document.body.dataset.root === 'true';
  let path;

  if (id === 'splash') {
    path = isRootPage ? 'index.html' : '../index.html';
  } else {
    path = isRootPage ? 'pages/' + id + '.html' : id + '.html';
  }

  const query = new URLSearchParams(params || {});
  const queryString = query.toString();
  return queryString ? path + '?' + queryString : path;
}

function go(id, params) {
  let nextParams = params;

  if (id === 'coach' && getGritState().subscription !== 'pro') {
    id = 'pro-preview';
    nextParams = { feature: 'AI Career Coach' };
  }

  if (
    !nextParams &&
    document.body.dataset.page === 'practice-info' &&
    id === 'practice-detail'
  ) {
    nextParams = Object.fromEntries(
      new URLSearchParams(window.location.search).entries(),
    );
  }

  const target = pageUrl(id, nextParams);
  if (target) window.location.href = target;
}

function enterApp() {
  const state = getGritState();
  if (!state.registered) {
    go('register');
    return;
  }
  go(state.onboardingComplete ? 'home' : 'onboarding');
}
