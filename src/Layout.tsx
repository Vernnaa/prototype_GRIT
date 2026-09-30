import type { PropsWithChildren } from 'react';

export default function Layout({ children, welcome = false }: PropsWithChildren<{ welcome?: boolean }>) {
  return <div className="stage"><main className={`device ${welcome ? 'on-welcome' : ''}`}>
    <div className="status"><span>9:41</span><span aria-hidden="true">▂▄▆ ◆ ▰</span></div>
    {children}
    <div className="home-indicator" aria-hidden="true"/>
  </main></div>;
}
