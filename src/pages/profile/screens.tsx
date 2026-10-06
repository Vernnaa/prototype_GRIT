import { Briefcase, CaretRight, Gear, Heart, MapTrifold, Question, SignOut, Star, Target, Trophy } from '@phosphor-icons/react';
import type { Profile } from '../../model';
import type { Screen } from '../../components/AppShell';

export function ProfilePage({ profile, go, setModal }: { profile: Profile; go: (screen: Screen) => void; setModal: (modal: string) => void }) {
  const groups = [
    [
      { label: 'My Interests', Icon: Heart, action: () => setModal('interestsView') },
      { label: 'My Strengths', Icon: Star, action: () => setModal('strengthsView') },
      { label: 'My Experiences', Icon: Briefcase, action: () => go('progress') },
      { label: 'My Directions', Icon: MapTrifold, action: () => go('direction') },
      { label: 'My Achievements', Icon: Trophy, action: () => go('achievements') },
      { label: 'My Goals', Icon: Target, action: () => go('roadmap') },
    ],
    [
      { label: 'Settings', Icon: Gear, action: () => setModal('Settings') },
      { label: 'Help & Support', Icon: Question, action: () => setModal('Help & Support') },
      { label: 'Log Out', Icon: SignOut, action: () => setModal('logout') },
    ],
  ];
  return <section aria-label="Profile" className="profile-hub">
    <header className="profile-identity">
      <button type="button" className="profile-settings" aria-label="Open Settings" onClick={() => setModal('Settings')}><Gear size={24} aria-hidden="true" /></button>
      <svg viewBox="0 0 96 96" role="img" aria-label={`${profile.name}, student avatar`} className="profile-avatar">
        <defs><clipPath id="profile-avatar-circle"><circle cx="48" cy="48" r="48" /></clipPath></defs>
        <g clipPath="url(#profile-avatar-circle)">
          <circle cx="48" cy="48" r="48" fill="#F5F6F8" />
          <path d="M12 96V84c0-19 15-29 36-29s36 10 36 29v12Z" fill="#062B49" />
          <path d="M38 50h20v18l-10 9-10-9Z" fill="#C78E6D" />
          <ellipse cx="48" cy="36" rx="21" ry="25" fill="#E3B18C" />
          <path d="M27 40V24C27 2 71 1 70 26v15l-7-10-5-14-24 14-3 14Z" fill="#03233D" />
          <path d="M38 40h2m16 0h2" stroke="#03233D" strokeWidth="3" strokeLinecap="round" />
          <path d="M41 49q7 7 14 0" fill="none" stroke="#062B49" strokeWidth="2" strokeLinecap="round" />
          <path d="m35 65 13 12 13-12-5 31H40Z" fill="#FFFFFF" />
          <path d="m26 69 9-4 5 31H25Zm44 0-9-4-5 31h15Z" fill="#6557F5" />
        </g>
      </svg>
      <div className="profile-info"><h1>{profile.name}</h1><p>High School Student</p><button type="button" className="profile-edit" onClick={() => setModal('name')}>Edit Profile</button></div>
    </header>
    {groups.map((items, index) => <nav key={index} aria-label={index === 0 ? 'Personal exploration' : 'Account and support'} className="profile-menu-group">
      {items.map(({ label, Icon, action }) => <button type="button" className="profile-menu-item" key={label} onClick={action}>
        <Icon size={23} weight="regular" aria-hidden="true" /><span>{label}</span><CaretRight size={19} className="profile-chevron" aria-hidden="true" />
      </button>)}
    </nav>)}
  </section>;
}
