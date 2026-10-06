import type { Mission } from '../../content';
import type { Profile } from '../../model';
import { DashboardHeader } from './components/DashboardHeader';
import { DashboardStats } from './components/DashboardStats';
import { JourneySection } from './components/JourneySection';
import { NextStepCard } from './components/NextStepCard';
import { ProgressSection } from './components/ProgressSection';

export default function HomeDashboard({
  profile,
  suggested,
  chooseMission,
}: {
  profile: Profile;
  suggested: Mission;
  chooseMission: (id: string) => void;
}) {
  return (
    <div className="min-h-full bg-grit-white px-[22px] py-[max(28px,env(safe-area-inset-top))] pb-5 text-grit-text max-[359px]:px-4">
      <DashboardHeader name={profile.name} />
      <NextStepCard
        mission={suggested}
        onStart={() => chooseMission(suggested.id)}
      />
      <JourneySection profile={profile} />
      <ProgressSection profile={profile} />
      <DashboardStats profile={profile} />
    </div>
  );
}
