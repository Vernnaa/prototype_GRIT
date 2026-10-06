import mascotWave from '../../../../references/maskot/maskot-1.png';

export function DashboardHeader({ name }: { name: string }) {
  return (
    <header className="relative flex min-h-[124px] items-center">
      <div className="relative z-10 w-3/5 pb-3">
        <h1 className="wrap-anywhere text-[32px] font-extrabold leading-[1.05] tracking-[-.055em] text-grit-text max-[359px]:text-[30px]">
          Hi, {name}!
        </h1>
        <p className="mt-[9px] text-[15px] font-medium leading-[1.35] text-grit-text">
          Ready to discover
          <br />
          what’s next?
        </p>
      </div>
      <div
        className="pointer-events-none absolute -right-[22px] -top-3 h-[146px] w-[150px] overflow-hidden max-[359px]:-right-4 max-[359px]:w-[135px]"
        aria-hidden="true"
      >
        <img
          src={mascotWave}
          alt=""
          className="absolute left-[-21px] top-0 h-[200px] w-[200px] max-w-none object-contain max-[359px]:left-[-16px] max-[359px]:w-[185px]"
        />
      </div>
    </header>
  );
}
