import type { ReactNode } from 'react';
import {
  House,
  Compass,
  Flag,
  Path,
  UserCircle,
  Sparkle,
  Rocket,
  Lightbulb,
  Heart,
  UsersThree,
  ChartBar,
  Code,
  BookOpen,
  ChatCircle,
  Globe,
  PenNib,
  PaperPlaneTilt,
} from '@phosphor-icons/react';
import mascotWave from '../../references/maskot/maskot-1.png';
import mascotPhone from '../../references/maskot/maskot-2.png';

const icons = {
  house: House,
  compass: Compass,
  flag: Flag,
  path: Path,
  user: UserCircle,
  rocket: Rocket,
  lightbulb: Lightbulb,
  heart: Heart,
  users: UsersThree,
  chart: ChartBar,
  code: Code,
  book: BookOpen,
  chat: ChatCircle,
  globe: Globe,
  pen: PenNib,
  paperPlane: PaperPlaneTilt,
  spark: Sparkle,
};
export function Icon({
  name,
  size = 22,
  className = '',
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Comp = icons[name as keyof typeof icons] || Sparkle;
  return <Comp size={size} weight="duotone" className={className} />;
}
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <div
      className={`font-extrabold tracking-[-.09em] leading-none ${light ? 'text-white' : 'text-navy'}`}
      style={{ fontSize: 46 }}
    >
      GR
      <span className="relative">
        I
        <span className="absolute bottom-[3px] left-[2px] h-3 w-[7px] -rotate-45 bg-lime" />
      </span>
      T
    </div>
  );
}
export function Mascot({
  size = 80,
  phone = false,
  className = '',
}: {
  size?: number;
  phone?: boolean;
  className?: string;
}) {
  return (
    <img
      src={phone ? mascotPhone : mascotWave}
      alt="Gritty, your friendly robot companion"
      className={`intro-art object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
export function Button({
  children,
  onClick,
  variant = 'lime',
  disabled = false,
  className = '',
}: {
  children: ReactNode;
  onClick: () => void;
  variant?: 'lime' | 'navy' | 'outline' | 'white';
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-[14px] font-extrabold transition-transform ${variant === 'lime' ? 'bg-lime text-navy' : variant === 'navy' ? 'bg-navy text-white' : variant === 'white' ? 'bg-white text-navy' : 'border-[1.5px] border-navy bg-transparent text-navy'} ${className}`}
    >
      {children}
    </button>
  );
}
export function Label({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[.15em] text-navy/55">
      {children}
    </p>
  );
}
export function Card({
  children,
  className = '',
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return onClick ? (
    <button
      type="button"
      onClick={onClick}
      className={`block w-full rounded-[20px] border border-navy/6 bg-white p-4 text-left brand-shadow ${className}`}
    >
      {children}
    </button>
  ) : (
    <div
      className={`rounded-[20px] border border-navy/6 bg-white p-4 brand-shadow ${className}`}
    >
      {children}
    </div>
  );
}
export function Chip({
  children,
  active = false,
  onClick,
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-9 rounded-full border px-3.5 py-1.5 text-[11px] font-bold ${active ? 'border-navy bg-navy text-white' : 'border-navy/10 bg-white text-navy'}`}
    >
      {children}
    </button>
  );
}
export function Bar({ value }: { value: number }) {
  return (
    <div className="h-[7px] overflow-hidden rounded-full bg-navy/10">
      <div
        className="bar-fill h-full rounded-full bg-lime"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
