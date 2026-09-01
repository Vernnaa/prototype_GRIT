/* ---------------- data ---------------- */
const SKILLS = [
  { name: 'Excel', current: 82, required: 75 },
  { name: 'Digital Marketing', current: 78, required: 70 },
  { name: 'Communication', current: 74, required: 65 },
  { name: 'Data Analysis', current: 56, required: 80 },
  { name: 'AI Tools', current: 61, required: 60 },
];
const CAREER_REQUIREMENTS = {
  'Marketing Staff': {
    Excel: 75,
    'Digital Marketing': 70,
    Communication: 65,
    'Data Analysis': 80,
    'AI Tools': 60,
  },
  'Financial Analyst': {
    Excel: 90,
    'Digital Marketing': 30,
    Communication: 70,
    'Data Analysis': 88,
    'AI Tools': 68,
  },
  'Business Analyst': {
    Excel: 78,
    'Digital Marketing': 45,
    Communication: 82,
    'Data Analysis': 85,
    'AI Tools': 70,
  },
  'Data Analyst': {
    Excel: 82,
    'Digital Marketing': 35,
    Communication: 68,
    'Data Analysis': 92,
    'AI Tools': 78,
  },
  'Graphic Designer': {
    Excel: 40,
    'Digital Marketing': 65,
    Communication: 75,
    'Data Analysis': 45,
    'AI Tools': 72,
  },
};
const CAREER_PATHS = {
  'Marketing Staff': ['Marketing Specialist', 'Marketing Manager'],
  'Financial Analyst': ['Senior Financial Analyst', 'Finance Manager'],
  'Business Analyst': ['Senior Business Analyst', 'Business Strategy Manager'],
  'Data Analyst': ['Senior Data Analyst', 'Analytics Manager'],
  'Graphic Designer': ['Senior Graphic Designer', 'Creative Lead'],
};
const LESSON_LIBRARY = {
  Excel: {
    title: 'Build a Reliable Spreadsheet',
    objective: 'Clean and validate spreadsheet data before using it for decisions.',
    materialTitle: 'Quality checks come before formulas',
    material: 'Confirm data types, unique keys, missing values, duplicates, and totals before beginning analysis.',
    formula: 'Reliable output = validated input + documented transformations',
    example: 'Before reporting monthly sales, reconcile row totals against the source and document removed duplicates.',
    quiz: [
      ['What comes first in spreadsheet analysis?', ['Create a chart', 'Validate source data', 'Change colors'], 1],
      ['How should duplicates be handled?', ['Delete random rows', 'Validate keys and document removal', 'Ignore them'], 1],
      ['A reliable workbook should include:', ['Hidden assumptions', 'Documented checks', 'More worksheets'], 1],
    ],
  },
  'Digital Marketing': {
    title: 'Diagnose a Marketing Funnel',
    objective: 'Connect campaign metrics to the stage of the customer journey they represent.',
    materialTitle: 'Read the funnel, not one metric',
    material: 'Reach shows visibility, clicks show interest, and conversion shows whether the offer and experience worked.',
    formula: 'Conversion rate = conversions ÷ visits × 100%',
    example: 'High clicks with low conversions usually points to offer, audience, or landing-page friction.',
    quiz: [
      ['Which metric reflects completed outcomes?', ['Reach', 'Conversion rate', 'Impressions'], 1],
      ['High clicks and low conversions suggest reviewing:', ['Landing experience', 'Logo size', 'Follower count'], 0],
      ['A funnel diagnosis compares:', ['One metric', 'Every stage against its objective', 'Only reach'], 1],
    ],
  },
  Communication: {
    title: 'Communicate an Actionable Update',
    objective: 'Turn analysis into a concise update for a workplace stakeholder.',
    materialTitle: 'Lead with the decision',
    material: 'An effective update states the outcome, supporting evidence, implication, and recommended next action.',
    formula: 'Update = outcome + evidence + implication + action',
    example: 'Sales declined 15%, driven by one segment; test a revised offer before increasing budget.',
    quiz: [
      ['What should an executive update lead with?', ['Raw data', 'Outcome', 'Method detail'], 1],
      ['Evidence is useful because it:', ['Supports the conclusion', 'Adds length', 'Avoids action'], 0],
      ['A complete update ends with:', ['More tables', 'Next action', 'No recommendation'], 1],
    ],
  },
  'Data Analysis': {
    title: 'Understand Campaign Performance',
    objective: 'Identify meaningful metrics and turn them into a business recommendation.',
    materialTitle: 'Test causes, not assumptions',
    material: 'Compare periods, segment the data, and examine alternative explanations before recommending action.',
    formula: 'Insight = evidence + context + implication',
    example: 'A decline isolated to one segment requires a targeted response rather than a company-wide conclusion.',
    quiz: [
      ['A strong analysis begins with:', ['An assumption', 'A testable question', 'A recommendation'], 1],
      ['Segmentation helps identify:', ['Where change occurred', 'Logo quality', 'File size'], 0],
      ['A strong recommendation includes:', ['Evidence and action', 'Opinion only', 'Raw data only'], 0],
    ],
  },
  'AI Tools': {
    title: 'Use AI Tools Responsibly',
    objective: 'Use AI assistance while maintaining evidence quality, context, and accountability.',
    materialTitle: 'AI output is a draft, not evidence',
    material: 'Verify sources, recalculate important numbers, add missing context, and communicate limitations.',
    formula: 'Responsible AI = verification + context + human judgment',
    example: 'Before sharing an AI summary, compare every major claim with the original dataset or source.',
    quiz: [
      ['AI output should first be treated as:', ['Final evidence', 'A draft to verify', 'A guaranteed fact'], 1],
      ['Important calculations should be:', ['Rechecked', 'Trusted automatically', 'Removed'], 0],
      ['Responsible use includes:', ['Hiding limitations', 'Explaining limitations', 'Skipping sources'], 1],
    ],
  },
};
const MISSIONS = [
  {
    id: 'M-04',
    cat: 'Recommended',
    title: 'Analyze a Campaign',
    scenario:
      "Your manager asks you to evaluate last month's campaign performance and recommend what should be improved.",
    diff: 'Medium',
    time: '15 min',
    xp: 150,
  },
  {
    id: 'M-03',
    cat: 'Recommended',
    title: 'Content Strategy Plan',
    scenario:
      'Plan a one-month content strategy for a new product launch.',
    diff: 'Easy',
    time: '20 min',
    xp: 100,
  },
  {
    id: 'M-02',
    cat: 'Recommended',
    title: 'Market Research',
    scenario:
      'Research a target segment and summarize three key findings.',
    diff: 'Hard',
    time: '25 min',
    xp: 200,
  },
  {
    id: 'M-01',
    cat: 'In Progress',
    title: 'Segment an Audience',
    scenario:
      'Split a customer list into three actionable marketing segments.',
    diff: 'Medium',
    time: '15 min',
    xp: 140,
  },
  {
    id: 'M-00',
    cat: 'Completed',
    title: 'Write a Product Brief',
    scenario: 'Summarize a new feature for a non-technical stakeholder.',
    diff: 'Easy',
    time: '10 min',
    xp: 70,
    done: true,
    score: 81,
  },
];
const PRACTICE = [
  {
    title: 'Analyze Campaign Performance',
    role: 'Marketing',
    time: '15 min',
    skills: 'Data Analysis, Excel, Business Reasoning',
    output: 'Insights &amp; 3 recommendations',
    desc: 'You are asked to evaluate the performance of a digital campaign and provide recommendations.',
  },
  {
    title: 'Build Social Media Strategy',
    role: 'Marketing',
    time: '20 min',
    skills: 'Digital Marketing, Communication',
    output: 'A one-page content plan',
    desc: 'Plan a social media strategy for a product launch next month.',
  },
  {
    title: 'Competitor Analysis Report',
    role: 'Marketing',
    time: '20 min',
    skills: 'Business Understanding, Data Analysis',
    output: 'A competitor summary table',
    desc: 'Compare three competitors and identify where your brand can win.',
  },
  {
    title: 'Create Marketing Budget Plan',
    role: 'Marketing',
    time: '25 min',
    skills: 'Excel, Business Understanding',
    output: 'A quarterly budget allocation',
    desc: 'Allocate a fixed marketing budget across four channels with reasoning.',
  },
  {
    title: 'Build a Simple Financial Forecast',
    role: 'Finance',
    time: '25 min',
    skills: 'Excel, Data Analysis',
    output: 'A 12-month revenue forecast',
    desc: "Your team lead needs a rough revenue forecast for next year's planning session.",
  },
  {
    title: 'Screen Candidates',
    role: 'HR',
    time: '15 min',
    skills: 'Communication, Business Understanding',
    output: 'A shortlist with reasoning',
    desc: 'Five resumes came in for an open role. Decide who moves forward and why.',
  },
];
const MORE_ITEMS = [
  {
    label: 'Real-World Practice',
    screen: 'practice',
    icon: 'M3 7h18v11a2 2 0 01-2 2H5a2 2 0 01-2-2V7zM8 7V5a2 2 0 012-2h4a2 2 0 012 2v2',
  },
  {
    label: 'AI Career Coach',
    screen: 'coach',
    icon: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z',
  },
  { label: 'Portfolio', screen: 'portfolio', icon: 'M4 4h16v16H4z' },
  {
    label: 'Certifications',
    screen: 'certifications',
    icon: 'M12 2l2.4 6.9H22l-6 4.4 2.4 7-6.4-4.6L5.6 20l2.4-7-6-4.4h7.6z',
  },
  {
    label: 'Achievements',
    screen: 'achievements',
    icon: 'M20 6L9 17l-5-5',
  },
  {
    label: 'Profile',
    screen: 'profile',
    icon: 'M20 21a8 8 0 10-16 0M12 11a4 4 0 100-8 4 4 0 000 8z',
  },
  {
    label: 'Notifications',
    screen: 'notif',
    icon: 'M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0',
  },
  {
    label: 'Settings',
    screen: 'settings',
    icon: 'M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.6V21a2 2 0 11-4 0v-.2a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.6-1H3a2 2 0 110-4h.2a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.9.3H9a1.7 1.7 0 001-1.6V3a2 2 0 114 0v.2a1.7 1.7 0 001 1.5 1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.9V9a1.7 1.7 0 001.6 1H21a2 2 0 110 4h-.2a1.7 1.7 0 00-1.5 1z',
  },
];
const BADGES = [
  {
    name: 'Mission Master',
    desc: 'Completed 20 missions',
    unlocked: true,
    icon: 'M12 2l2.4 6.9H22l-6 4.4 2.4 7-6.4-4.6L5.6 20l2.4-7-6-4.4h7.6z',
  },
  {
    name: 'Skill Builder',
    desc: 'Improved 5 skills',
    unlocked: true,
    icon: 'M4 20V10M12 20V4M20 20v-7',
  },
  {
    name: 'Consistency',
    desc: '7-day learning streak',
    unlocked: true,
    icon: 'M12 2s6 5.5 6 11a6 6 0 0 1-12 0c0-5.5 6-11 6-11z',
  },
  {
    name: 'Project Builder',
    desc: 'Completed 5 projects',
    unlocked: false,
    icon: 'M4 4h16v16H4z',
  },
  {
    name: 'Top Performer',
    desc: 'Top 10% mission performance',
    unlocked: false,
    icon: 'M20 6L9 17l-5-5',
  },
];
const NOTIFS = [
  { t: 'Your Data Analysis skill improved by 8%.', time: '2m ago' },
  { t: 'New Marketing Mission available.', time: '1h ago' },
  { t: 'You are one mission away from Level 13.', time: '3h ago' },
  { t: 'Your 7-day streak is active. Keep it up!', time: '1d ago' },
  { t: 'AI Coach recommends a new lesson.', time: '1d ago' },
];
const NAV = [
  {
    id: 'home',
    label: 'Home',
    icon: 'M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10',
  },
  {
    id: 'career-goal',
    label: 'Career Goal',
    icon: 'M12 2v4M12 18v4M2 12h4M18 12h4M12 8a4 4 0 100 8 4 4 0 000-8z',
  },
  {
    id: 'skill-progress',
    label: 'Skill Progress',
    icon: 'M4 20V10M12 20V4M20 20v-7',
  },
  {
    id: 'tasks',
    label: 'Missions',
    icon: 'M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01',
  },
  { id: 'more', label: 'More', icon: 'M5 12h.01M12 12h.01M19 12h.01' },
];
