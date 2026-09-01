/* ---------------- mascot ---------------- */
function mascotSVG(size) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 120 120" fill="none">
    <rect x="24" y="10" width="10" height="18" rx="5" fill="#B7F34A"/>
    <rect x="18" y="24" width="84" height="66" rx="24" fill="#1F2033"/>
    <circle cx="45" cy="56" r="8" fill="#B7F34A"/>
    <circle cx="75" cy="56" r="8" fill="#B7F34A"/>
    <rect x="40" y="76" width="40" height="6" rx="3" fill="#7C5CFC"/>
    <rect x="10" y="52" width="10" height="24" rx="5" fill="#1F2033"/>
    <rect x="100" y="52" width="10" height="24" rx="5" fill="#1F2033"/>
    <rect x="30" y="92" width="60" height="22" rx="11" fill="#7C5CFC" opacity=".18"/>
  </svg>`;
}

/* ---------------- render helpers ---------------- */
function skillRow(s, big) {
  const gap = s.current - s.required;
  const gapText = gap >= 0 ? 'On target' : `Gap: ${gap}`;
  return `<div class="skill-row" onclick='go("skill-detail",{skill:${JSON.stringify(s.name)}})'>
    <div class="skill-head"><span>${s.name}</span><span>${s.current}%</span></div>
    <div class="progress-track"><div class="progress-fill" style="width:${s.current}%;"></div></div>
    ${big ? `<div class="small-muted" style="margin-top:6px;">${gapText} · required ${s.required}%</div>` : ''}
  </div>`;
}

function missionCard(m) {
  const badge = m.done
    ? `<span class="tag" style="color:#4C8B2B;background:#E7F5D6;">Completed · ${m.score}%</span>`
    : `<span class="tag diff-${m.diff}">${m.diff}</span>`;
  return `<div class="card m-card" onclick="openMission('${m.id}')">
    <div class="row"><span class="eyebrow">Marketing Mission #${m.id.split('-')[1]}</span>${badge}</div>
    <div style="font-weight:700;font-size:15px;margin-top:8px;">${m.title}</div>
    <div class="m-scenario">${m.scenario}</div>
    <div class="skill-pills"><span class="tag">${m.time}</span><span class="tag" style="color:#8A6300;background:#FBF0CC;">+${m.xp} XP</span></div>
    ${m.done ? '' : `<button class="btn btn-primary" onclick="event.stopPropagation();openMission('${m.id}')">Start mission</button>`}
  </div>`;
}

/* ---------------- nav bars ---------------- */
function navHTML(activeId) {
  return NAV.map(
    (
      n,
    ) => `<div class="nav-item ${n.id === activeId ? 'active' : ''}" onclick="go('${n.id}')">
    <div class="ic-wrap"><svg viewBox="0 0 24 24"><path d="${n.icon}"/></svg></div>
    <span class="nav-label">${n.label}</span>
  </div>`,
  ).join('');
}
