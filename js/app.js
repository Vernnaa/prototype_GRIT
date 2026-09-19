const currentPage = document.body.dataset.page;

function getElement(id) {
  return document.getElementById(id);
}

function renderHTML(id, html) {
  const element = getElement(id);
  if (element) element.innerHTML = html;
}

function renderMissions(category) {
  const list = getElement('mission-list');
  if (!list) return;

  const state = getGritState();
  const missions = MISSIONS.map((mission) =>
    state.completedMissions.includes(mission.id)
      ? { ...mission, cat: 'Completed', done: true, score: state.lastPracticeScore }
      : mission,
  );
  list.innerHTML = missions.filter((mission) => mission.cat === category)
    .map(missionCard)
    .join('');
}

function tabClick(element, rowId, value, render) {
  document
    .querySelectorAll('#' + rowId + ' .tab-item')
    .forEach((tab) => tab.classList.remove('active'));
  element.classList.add('active');
  render(value);
}

function openMission(id) {
  go('practice-info', { mission: id });
}

function filterPractice(element, category) {
  document
    .querySelectorAll('#practice-filters .filter-pill')
    .forEach((pill) => pill.classList.remove('active'));
  element.classList.add('active');

  const list =
    category === 'All'
      ? PRACTICE
      : PRACTICE.filter((practice) => practice.role === category);
  renderPractice(list);
}

function renderPractice(list) {
  const container = getElement('practice-list');
  if (!container) return;

  container.innerHTML = list
    .map(
      (practice) => `
        <div class="card m-card" onclick='openPractice(${JSON.stringify(practice.title)})'>
          <div class="row">
            <div class="li-icon" style="background:var(--lime);">
              <svg viewBox="0 0 24 24" stroke="var(--navy)" fill="none" stroke-width="1.8">
                <path d="M3 7h18v11a2 2 0 01-2 2H5a2 2 0 01-2-2V7zM8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/>
              </svg>
            </div>
            <div style="flex:1;margin-left:10px;">
              <div style="font-weight:700;font-size:14px;">${practice.title}</div>
              <div class="small-muted">${practice.role} · ${practice.time}</div>
            </div>
            <span style="color:var(--text-3);">›</span>
          </div>
        </div>`,
    )
    .join('');
}

function openPractice(title) {
  go('practice-info', { practice: title });
}

function populatePracticeContext() {
  const query = new URLSearchParams(window.location.search);
  const missionId = query.get('mission');
  const practiceTitle = query.get('practice');

  if (missionId) {
    const mission = MISSIONS.find((item) => item.id === missionId);
    if (!mission) return;

    if (getElement('pi-title')) getElement('pi-title').textContent = mission.title;
    if (getElement('pi-desc')) getElement('pi-desc').textContent = mission.scenario;
    if (getElement('pi-time')) getElement('pi-time').textContent = mission.time;
    if (getElement('pd-scenario')) {
      getElement('pd-scenario').textContent = mission.scenario;
    }
    return;
  }

  if (practiceTitle) {
    const practice = PRACTICE.find((item) => item.title === practiceTitle);
    if (!practice) return;

    if (getElement('pi-title')) getElement('pi-title').textContent = practice.title;
    if (getElement('pi-role')) getElement('pi-role').textContent = practice.role;
    if (getElement('pi-desc')) getElement('pi-desc').textContent = practice.desc;
    if (getElement('pi-skills')) getElement('pi-skills').textContent = practice.skills;
    if (getElement('pi-output')) getElement('pi-output').innerHTML = practice.output;
    if (getElement('pi-time')) getElement('pi-time').textContent = practice.time;
    if (getElement('pd-scenario')) {
      getElement('pd-scenario').textContent = practice.desc;
    }
  }
}

function initializeMascots() {
  renderHTML('mascot-big', mascotSVG(150));

  renderHTML(
    'mascot-fab',
    '<svg viewBox="0 0 120 120" width="26" height="26"><rect x="24" y="10" width="10" height="18" rx="5" fill="#B7F34A"/><rect x="18" y="24" width="84" height="66" rx="24" fill="#B7F34A"/><circle cx="45" cy="56" r="8" fill="#1F2033"/><circle cx="75" cy="56" r="8" fill="#1F2033"/></svg>',
  );

  renderHTML(
    'coach-intro',
    `<div class="mascot">${mascotSVG(36)}</div><div><div style="font-weight:800;font-size:13.5px;">Gritty</div><div class="small-muted">Your AI Career Coach.</div></div>`,
  );
}

function initializeSkills() {
  const currentSkills = getCurrentSkills();
  renderHTML(
    'home-skills',
    currentSkills.map((skill) => skillRow(skill, false)).join(''),
  );
  renderHTML(
    'progress-skills',
    currentSkills.map((skill) => skillRow(skill, true)).join(''),
  );

  renderHTML(
    'career-skills',
    currentSkills.map((skill) => {
      const gap = skill.current - skill.required;
      return `<div class="skill-row">
        <div class="skill-head">
          <span>${skill.name}</span>
          <span style="color:${gap < 0 ? '#C0475C' : '#4C8B2B'}">${gap < 0 ? gap : '+' + gap}</span>
        </div>
        <div class="row small-muted">
          <span>Current ${skill.current}%</span>
          <span>Required ${skill.required}%</span>
        </div>
        <div class="progress-track" style="margin-top:8px;">
          <div class="progress-fill" style="width:${skill.current}%;"></div>
        </div>
      </div>`;
    }).join(''),
  );

  const practiceScore = getGritState().lastPracticeScore;
  const resultSkills = [
    { name: 'Data Analysis', value: practiceScore },
    { name: 'Business Reasoning', value: Math.min(100, practiceScore + 3) },
    { name: 'Communication', value: Math.max(0, practiceScore - 2) },
  ];
  renderHTML(
    'result-skills',
    resultSkills
      .map(
        (skill) =>
          `<div class="skill-row"><div class="skill-head"><span>${skill.name}</span><span>${skill.value}%</span></div><div class="progress-track"><div class="progress-fill" style="width:${skill.value}%;"></div></div></div>`,
      )
      .join(''),
  );
}

function initializeMissions() {
  const tabs = getElement('mission-tabs');
  if (!tabs) return;

  const categories = ['Recommended', 'In Progress', 'Completed'];
  tabs.innerHTML = categories
    .map(
      (category, index) =>
        `<div class="tab-item ${index === 0 ? 'active' : ''}" onclick="tabClick(this,'mission-tabs','${category}',renderMissions)">${category}</div>`,
    )
    .join('');
  renderMissions('Recommended');
}

function initializePractice() {
  const filters = getElement('practice-filters');
  if (!filters) return;

  const categories = ['All', 'Marketing', 'Finance', 'HR', 'Design'];
  filters.innerHTML = categories
    .map(
      (category, index) =>
        `<div class="filter-pill ${index === 1 ? 'active' : ''}" onclick="filterPractice(this,'${category}')">${category}</div>`,
    )
    .join('');
  renderPractice(PRACTICE.filter((practice) => practice.role === 'Marketing'));
}

function initializeMore() {
  renderHTML(
    'more-list',
    MORE_ITEMS.map(
      (item) => `
        <div class="list-item" onclick="go('${item.screen}')">
          <div class="li-left">
            <div class="li-icon">
              <svg viewBox="0 0 24 24" stroke="var(--navy)" fill="none" stroke-width="1.8">
                <path d="${item.icon}"/>
              </svg>
            </div>
            <span style="font-weight:600;font-size:13.5px;">${item.label}</span>
          </div>
          <span style="color:var(--text-3);">›</span>
        </div>`,
    ).join(''),
  );
}

function initializePortfolio() {
  const savedProjects = getGritState().portfolio;
  const projects = savedProjects;

  renderHTML(
    'portfolio-projects',
    projects.length
      ? projects
      .map(
        (project) =>
          `<div class="card"><div class="row"><span style="font-weight:700;font-size:14px;">${project.title}</span><span style="font-weight:800;color:#4C8B2B;">${project.score}%</span></div><div class="small-muted" style="margin-top:6px;">${project.skills}</div></div>`,
      )
      .join('')
      : '<div class="card"><div style="font-weight:700;font-size:14px;margin-bottom:5px">No capability evidence yet</div><div class="small-muted">Complete a real-world practice or mission to add evaluated work here.</div></div>',
  );
}

function initializeAchievements() {
  renderHTML(
    'badge-list',
    BADGES.map(
      (badge) => `
        <div class="badge ${badge.unlocked ? 'unlocked' : ''}">
          <div class="badge-icon"><svg viewBox="0 0 24 24"><path d="${badge.icon}"/></svg></div>
          <div>
            <div style="font-weight:700;font-size:13.5px;">${badge.name}</div>
            <div class="small-muted">${badge.desc}</div>
          </div>
        </div>`,
    ).join(''),
  );
}

function initializeNotifications() {
  const tabs = getElement('notif-tabs');
  if (tabs) {
    tabs.innerHTML = ['All', 'Missions', 'Learning', 'System']
      .map(
        (category, index) =>
          `<div class="tab-item ${index === 0 ? 'active' : ''}">${category}</div>`,
      )
      .join('');
  }

  renderHTML(
    'notif-list',
    NOTIFS.map(
      (notification) => `
        <div class="list-item">
          <div class="li-left">
            <div class="li-icon">
              <svg viewBox="0 0 24 24" stroke="var(--navy)" fill="none" stroke-width="1.8">
                <circle cx="12" cy="12" r="9"/>
                <path d="M12 8v4l3 2"/>
              </svg>
            </div>
            <span style="font-size:13px;">${notification.t}</span>
          </div>
          <span class="small-muted">${notification.time}</span>
        </div>`,
    ).join(''),
  );
}

function initializeLearningLoop() {
  const steps = [
    ['Learn', 'Build knowledge'],
    ['Practice', 'Apply what you learn'],
    ['Mission', 'Solve real problems'],
    ['Improve', 'Level up your skills'],
  ];

  renderHTML(
    'loop-list',
    steps
      .map(
        (step, index) =>
          `<div class="row" style="padding:8px 0;${index < steps.length - 1 ? 'border-bottom:1px solid var(--border);' : ''}"><span style="font-weight:700;font-size:13px;">${step[0]}</span><span class="small-muted">${step[1]}</span></div>`,
      )
      .join(''),
  );
}

function initializeBottomNavigation() {
  const navigation = document.querySelector('.bottom-nav');
  if (!navigation) return;
  navigation.innerHTML = navHTML(currentPage);
}

function makeAppHeadersScrollable() {
  document.querySelectorAll('.screen > .app-header + .scroll').forEach((scroll) => {
    scroll.prepend(scroll.previousElementSibling);
  });
}

function setText(id, value) {
  const element = getElement(id);
  if (element) element.textContent = value;
}

function logout() {
  go('login');
}

function getPrioritySkill() {
  return getCurrentSkills()
    .map((skill) => ({ ...skill, gap: skill.required - skill.current }))
    .sort((a, b) => b.gap - a.gap)[0];
}

function initializePersonalizedContent() {
  const state = getGritState();
  const name = state.profile.name || 'Learner';
  const career = state.careerGoal;
  const readiness = state.readiness + '%';

  setText('home-user-name', name);
  setText('home-career-goal', career);
  setText('home-readiness', readiness);
  setText('home-readiness-ring', readiness);
  setText('career-goal-name', career);
  setText('career-path-start', career);
  const careerPath = CAREER_PATHS[career] || ['Senior Specialist', 'Manager'];
  setText('career-path-middle', careerPath[0]);
  setText('career-path-end', careerPath[1]);
  setText('skill-readiness', readiness);
  setText('profile-name', name);
  setText('profile-career', `${state.profile.careerInterest || 'Career'} Enthusiast · Target: ${career}`);
  setText('profile-readiness', readiness);
  setText('portfolio-name', name);
  setText('portfolio-career', `${state.profile.careerInterest || 'Career'} Enthusiast · Target: ${career}`);
  setText('portfolio-readiness', readiness);
  setText('achievement-xp', `${state.xp.toLocaleString('en-US')} XP · Level ${state.level}`);
  setText('home-streak', `${state.streak} days`);
  setText('assessment-target-job', career);
  setText('final-initial-score', `${state.initialReadiness ?? state.readiness}%`);

  const weakest = getPrioritySkill();
  if (weakest) {
    setText('home-next-skill', `Improve ${weakest.name}`);
    setText('home-skill-gap', weakest.gap > 0 ? `Skill gap: ${weakest.gap} pts below target` : 'You currently meet this target');
    setText('home-next-skill-score', `${weakest.current}%`);
  }

  const coachGreeting = getElement('coach-greeting');
  if (coachGreeting) {
    coachGreeting.innerHTML = `Hi ${name} 👋<br />I can see that ${weakest.name} is currently your largest gap for ${career}. Let's work on it next.`;
  }
}

function initializeSkillDetail() {
  const detailName = getElement('skill-detail-name');
  if (!detailName) return;

  const requested = new URLSearchParams(window.location.search).get('skill');
  const skills = getCurrentSkills();
  const skill = skills.find((item) => item.name === requested) || getPrioritySkill();
  const gap = Math.max(0, skill.required - skill.current);

  setText('skill-detail-name', skill.name);
  setText('skill-detail-current', `${skill.current}%`);
  setText('skill-detail-required', `${skill.required}%`);
  setText('skill-detail-gap', `${gap}%`);
  const progress = getElement('skill-detail-progress');
  if (progress) progress.style.width = `${skill.current}%`;
  setText('skill-detail-capability', `• Current foundation in ${skill.name}\n• Demonstrated level: ${skill.current}%`);
  setText('skill-detail-improvement', gap ? `• Close the remaining ${gap}-point gap\n• Complete the recommended lesson and practice` : '• Maintain this capability through missions\n• Build stronger portfolio evidence');
}

function initializeAccountFlow() {
  const params = new URLSearchParams(window.location.search);
  const editingProfile = params.get('edit') === 'profile';
  const changingJob = params.get('changeJob') === 'true';
  const registration = getElement('register-form');
  if (registration) {
    registration.addEventListener('submit', (event) => {
      event.preventDefault();
      go('onboarding-flow');
    });
    // bypass instant klik tanpa validasi
    const btn = registration.querySelector('button[type="submit"]');
    if (btn) btn.addEventListener('click', (e) => { e.preventDefault(); go('onboarding-flow'); });
  }

  const login = getElement('login-form');
  if (login) {
    login.addEventListener('submit', (event) => {
      event.preventDefault();
      go('onboarding-flow');
    });
    const btn = login.querySelector('button[type="submit"]');
    if (btn) btn.addEventListener('click', (e) => { e.preventDefault(); go('onboarding-flow'); });
  }

  const onboarding = getElement('onboarding-form');
  if (onboarding) {
    if (editingProfile) {
      const profile = getGritState().profile;
      ['age', 'education', 'institution', 'careerInterest', 'experience'].forEach((field) => {
        onboarding.elements[field].value = profile[field] || '';
      });
      document.querySelector('.page-heading').textContent = 'Edit your profile';
      document.querySelector('.page-intro').textContent = 'Keep your background and experience up to date.';
      document.querySelector('.back-btn').setAttribute('onclick', "go('profile')");
      document.querySelector('.flow-progress').hidden = true;
      onboarding.querySelector('button[type="submit"]').textContent = 'Save changes';
    }

    onboarding.addEventListener('submit', (event) => {
      event.preventDefault();
      const form = new FormData(onboarding);
      updateGritState((state) => ({
        ...state,
        profile: {
          ...state.profile,
          age: form.get('age'),
          education: form.get('education'),
          institution: form.get('institution').trim(),
          careerInterest: form.get('careerInterest'),
          experience: form.get('experience').trim(),
        },
      }));
      go(editingProfile ? 'profile' : 'career-select');
    });
  }

  const career = getElement('career-form');
  if (career) {
    if (changingJob) {
      const currentGoal = getGritState().careerGoal;
      career.elements.careerGoal.value = currentGoal;
      getElement('career-select-back').setAttribute('onclick', "go('career-goal')");
      getElement('career-select-title').textContent = 'Change your target job';
      getElement('career-select-intro').textContent = 'A new target needs a fresh assessment to map your skill gap.';
      document.querySelector('.flow-progress').hidden = true;
      career.querySelector('button[type="submit"]').textContent = 'Update target job';
    }

    career.addEventListener('submit', (event) => {
      event.preventDefault();
      const form = new FormData(career);
      const careerGoal = form.get('careerGoal');
      const state = getGritState();
      if (changingJob && careerGoal === state.careerGoal) {
        go('career-goal');
        return;
      }
      if (changingJob && !window.confirm(`Changing your target to ${careerGoal} requires a new assessment. Continue?`)) return;
      updateGritState((state) => ({
        ...state,
        careerGoal,
      }));
      go('assessment-intro');
    });
  }
}

const assessmentFields = [
  ['excel', 'Excel'],
  ['digitalMarketing', 'Digital Marketing'],
  ['communication', 'Communication'],
  ['dataAnalysis', 'Data Analysis'],
  ['aiTools', 'AI Tools'],
];

function scoresFromAssessment(form, finalAssessment) {
  const answers = new FormData(form);
  return Object.fromEntries(
    assessmentFields.map(([field, skill]) => {
      const answer = Number(answers.get(field));
      const score = finalAssessment ? 48 + answer * 11 : 35 + answer * 12;
      return [skill, Math.min(100, score)];
    }),
  );
}

function skillComparisonRows(scores, baseline) {
  return SKILLS.map((skill) => {
    const score = scores[skill.name] ?? 0;
    const previous = baseline ? baseline[skill.name] ?? 0 : null;
    const comparison = previous === null ? `Required ${skill.required}%` : `${score - previous >= 0 ? '+' : ''}${score - previous} pts`;
    return `<div class="skill-row"><div class="skill-head"><span>${skill.name}</span><span>${score}%</span></div><div class="progress-track"><div class="progress-fill" style="width:${score}%"></div></div><div class="small-muted" style="margin-top:6px">${comparison}</div></div>`;
  }).join('');
}

function initializeAssessmentFlow() {
  const assessment = getElement('assessment-form');
  if (assessment) {
    assessment.addEventListener('submit', (event) => {
      event.preventDefault();
      const scores = scoresFromAssessment(assessment, false);
      const readiness = calculateReadiness(scores);
      updateGritState((state) => ({
        ...state,
        assessmentCompleted: true,
        initialScores: scores,
        skillScores: scores,
        initialReadiness: readiness,
        readiness,
      }));
      go('assessment-result');
    });
  }

  const assessmentResults = getElement('assessment-skill-results');
  if (assessmentResults) {
    const state = getGritState();
    setText('assessment-readiness', `${state.readiness}%`);
    assessmentResults.innerHTML = skillComparisonRows(state.skillScores);
    const ranked = getCurrentSkills().sort((a, b) => b.current - a.current);
    const strengths = ranked.filter((skill) => skill.current >= skill.required);
    const gaps = ranked.filter((skill) => skill.current < skill.required).reverse();
    setText('assessment-result-message', gaps.length ? `${gaps.length} priority skill gaps identified.` : 'You currently meet the target requirements.');
    setText('assessment-strengths', strengths.map((skill) => skill.name).join(', ') || ranked[0]?.name || 'Developing');
    setText('assessment-gaps', gaps.map((skill) => skill.name).join(', ') || 'No critical gap');
  }
}

function initializeLearningFlow() {
  const prioritySkill = getPrioritySkill();
  const currentState = getGritState();
  const activeSkillName = currentPage === 'lesson'
    ? prioritySkill.name
    : currentState.activeLessonSkill || prioritySkill.name;
  const lesson = LESSON_LIBRARY[activeSkillName] || LESSON_LIBRARY['Data Analysis'];

  setText('learning-skill-name', prioritySkill.name);
  setText('learning-lesson-title', LESSON_LIBRARY[prioritySkill.name]?.title || lesson.title);
  setText('lesson-skill-tag', `${activeSkillName} · 10 min`);
  setText('lesson-title', lesson.title);
  setText('lesson-objective', lesson.objective);
  setText('lesson-material-title', lesson.materialTitle);
  setText('lesson-material', lesson.material);
  setText('lesson-formula', lesson.formula);
  setText('lesson-example', lesson.example);
  setText('lesson-complete-skill', activeSkillName);

  if (currentPage === 'lesson') {
    updateGritState((state) => ({
      ...state,
      activeLessonSkill: prioritySkill.name,
      lessonStartedAt: state.lessonStartedAt || Date.now(),
    }));
  }

  const quiz = getElement('lesson-quiz-form');
  if (quiz) {
    quiz.innerHTML = lesson.quiz
      .map(
        ([question, options, correct], questionIndex) => `<fieldset class="card question-card"><legend>${questionIndex + 1} of ${lesson.quiz.length}</legend><p>${question}</p>${options
          .map(
            (option, optionIndex) => `<label><input type="radio" name="q${questionIndex + 1}" value="${optionIndex === correct ? 1 : 0}" ${optionIndex === 0 ? 'required' : ''} /> ${option}</label>`,
          )
          .join('')}</fieldset>`,
      )
      .join('') + '<button class="btn btn-primary" type="submit">Submit quiz</button>';

    quiz.addEventListener('submit', (event) => {
      event.preventDefault();
      const answers = new FormData(quiz);
      const correct = ['q1', 'q2', 'q3'].reduce(
        (total, key) => total + Number(answers.get(key)),
        0,
      );
      const quizScore = Math.round((correct / 3) * 100);
      updateGritState((state) => {
        const learnedSkill = state.activeLessonSkill || activeSkillName;
        const skillScores = {
          ...state.skillScores,
          [learnedSkill]: Math.min(100, (state.skillScores[learnedSkill] || 0) + 5),
        };
        return addExperiencePoints({
          ...state,
          completedLessons: [...new Set([...state.completedLessons, learnedSkill])],
          lastLessonScore: quizScore,
          learningTimeSeconds: (state.learningTimeSeconds || 0) + Math.max(1, Math.round((Date.now() - (state.lessonStartedAt || Date.now())) / 1000)),
          lessonStartedAt: null,
          skillScores,
          readiness: calculateReadiness(skillScores),
        }, 100);
      });
      go('lesson-complete');
    });
  }

  setText('lesson-score', `${getGritState().lastLessonScore ?? 0}%`);
}

function initializePracticeSubmission() {
  const submit = getElement('submit-practice');
  if (submit) {
    submit.addEventListener('click', () => {
      const answer = getElement('practice-answer')?.value.trim() || '';
      const score = Math.min(95, 65 + Math.floor(answer.length / 18));
      const query = new URLSearchParams(window.location.search);
      const missionId = query.get('mission');
      const practiceTitle = query.get('practice');
      const mission = MISSIONS.find((item) => item.id === missionId);
      const title = mission?.title || practiceTitle || 'Campaign Performance Analysis';

      updateGritState((state) => {
        const skillScores = {
          ...state.skillScores,
          'Data Analysis': Math.min(100, (state.skillScores['Data Analysis'] || 0) + Math.max(2, Math.round(score / 20))),
        };
        const evidence = {
          title,
          skills: 'Data Analysis · Business Reasoning · Communication',
          score,
        };
        const portfolio = [
          ...state.portfolio.filter((item) => item.title !== title),
          evidence,
        ];
        const completedMissions = missionId
          ? [...new Set([...state.completedMissions, missionId])]
          : state.completedMissions;
        return addExperiencePoints({
          ...state,
          lastPracticeScore: score,
          lastPracticeTitle: title,
          skillScores,
          readiness: calculateReadiness(skillScores),
          portfolio,
          completedMissions,
        }, mission?.xp || 120);
      });
      go('practice-result', { score });
    });
  }

  const state = getGritState();
  const queryScore = Number(new URLSearchParams(window.location.search).get('score'));
  const resultScore = queryScore || state.lastPracticeScore;
  setText('practice-score', `${resultScore}%`);
  setText('practice-score-label', resultScore >= 80 ? 'Excellent work!' : resultScore >= 70 ? 'Great work!' : 'Keep practicing');
}

function initializeFinalAssessment() {
  const finalAssessment = getElement('final-assessment-form');
  if (finalAssessment) {
    finalAssessment.addEventListener('submit', (event) => {
      event.preventDefault();
      const rawScores = scoresFromAssessment(finalAssessment, true);
      const current = getGritState();
      const scores = Object.fromEntries(
        assessmentFields.map(([, skill]) => [
          skill,
          Math.max(rawScores[skill], current.skillScores[skill] || 0),
        ]),
      );
      const readiness = calculateReadiness(scores);
      updateGritState((state) => addExperiencePoints({
        ...state,
        finalAssessmentCompleted: true,
        finalScores: scores,
        skillScores: scores,
        readiness,
      }, 250));
      go('final-assessment-result');
    });
  }

  const results = getElement('final-skill-results');
  if (results) {
    const state = getGritState();
    const baseline = state.initialScores;
    setText('final-readiness', `${state.readiness}%`);
    setText('readiness-improvement', Math.max(0, state.readiness - (state.initialReadiness ?? state.readiness)));
    results.innerHTML = skillComparisonRows(state.finalScores, baseline);
    const remaining = getCurrentSkills().filter((skill) => skill.current < skill.required);
    setText('remaining-gap-title', remaining.length ? 'Remaining skill gap' : 'Target capability reached');
    setText('remaining-gap-copy', remaining.length ? `Continue with ${remaining[0].name} learning and practice.` : 'Your current scores meet the target job requirements.');
  }
}

function initializeSubscriptionFlow() {
  const feature = new URLSearchParams(window.location.search).get('feature');
  if (feature) setText('locked-feature-name', feature);

  const payment = getElement('payment-form');
  if (payment) {
    payment.addEventListener('submit', (event) => {
      event.preventDefault();
      const form = new FormData(payment);
      const plan = form.get('plan');
      const method = form.get('method');
      updateGritState((state) => ({
        ...state,
        billingPlan: plan,
        pendingPayment: { plan, method },
      }));
      go('payment-processing');
    });
  }

  const state = getGritState();
  const pending = state.pendingPayment || { plan: state.billingPlan, method: 'QRIS' };
  setText('payment-method-label', pending.method);
  setText('payment-plan-label', pending.plan === 'yearly' ? 'Yearly' : 'Monthly');
  setText('payment-total-label', pending.plan === 'yearly' ? 'Rp470.000' : 'Rp49.000');
  setText('success-plan', state.billingPlan === 'yearly' ? 'Yearly' : 'Monthly');

  const completePayment = getElement('complete-payment');
  if (completePayment) {
    completePayment.addEventListener('click', () => {
      updateGritState((current) => ({
        ...current,
        subscription: 'pro',
        pendingPayment: null,
      }));
      go('payment-success');
    });
  }

  if (currentPage === 'coach' && state.subscription !== 'pro') {
    go('pro-preview', { feature: 'AI Career Coach' });
  }
}

function initializeQuestionPager(formId) {
  const form = getElement(formId);
  if (!form || typeof form.querySelectorAll !== 'function') return;

  const questions = [...form.querySelectorAll('.question-card')];
  const originalSubmit = form.querySelector('button[type="submit"]');
  if (questions.length < 2 || !originalSubmit) return;

  form.classList.add('assessment-paged');
  originalSubmit.hidden = true;

  const meta = document.createElement('div');
  meta.className = 'question-pager-meta';
  meta.innerHTML = '<span class="question-counter"></span><span>Answer to continue</span>';

  const track = document.createElement('div');
  track.className = 'question-pager-track';
  track.innerHTML = '<div class="question-pager-fill"></div>';

  const navigation = document.createElement('div');
  navigation.className = 'question-navigation';
  navigation.innerHTML = '<button class="btn btn-ghost question-back" type="button">Back</button><button class="btn btn-primary question-next" type="button">Next question</button>';

  form.insertBefore(track, questions[0]);
  form.insertBefore(meta, track);
  form.appendChild(navigation);

  const counter = meta.querySelector('.question-counter');
  const fill = track.querySelector('.question-pager-fill');
  const back = navigation.querySelector('.question-back');
  const next = navigation.querySelector('.question-next');
  let currentIndex = 0;

  function showQuestion(index) {
    currentIndex = index;
    questions.forEach((question, questionIndex) => {
      question.hidden = questionIndex !== currentIndex;
      question.classList.remove('question-error');
    });
    counter.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
    fill.style.width = `${((currentIndex + 1) / questions.length) * 100}%`;
    back.disabled = currentIndex === 0;
    next.textContent = currentIndex === questions.length - 1 ? originalSubmit.textContent.trim() : 'Next question';
    form.closest('.scroll')?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  back.addEventListener('click', () => {
    if (currentIndex > 0) showQuestion(currentIndex - 1);
  });

  next.addEventListener('click', () => {
    const currentQuestion = questions[currentIndex];
    const selected = currentQuestion.querySelector('input:checked');
    if (!selected) {
      currentQuestion.classList.remove('question-error');
      void currentQuestion.offsetWidth;
      currentQuestion.classList.add('question-error');
      currentQuestion.querySelector('input')?.reportValidity();
      return;
    }

    if (currentIndex < questions.length - 1) {
      showQuestion(currentIndex + 1);
      return;
    }

    form.requestSubmit(originalSubmit);
  });

  showQuestion(0);
}

initializeMascots();
initializeSkills();
initializeMissions();
initializePractice();
initializeMore();
initializePortfolio();
initializeAchievements();
initializeNotifications();
initializeLearningLoop();
makeAppHeadersScrollable();
initializeBottomNavigation();
populatePracticeContext();
initializePersonalizedContent();
initializeSkillDetail();
initializeAccountFlow();
initializeAssessmentFlow();
initializeLearningFlow();
initializePracticeSubmission();
initializeFinalAssessment();
initializeSubscriptionFlow();
initializeQuestionPager('assessment-form');
initializeQuestionPager('lesson-quiz-form');
initializeQuestionPager('final-assessment-form');
