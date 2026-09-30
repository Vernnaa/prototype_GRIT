import { Gritty } from '../../../components/ui';

export default function WelcomeHero() {
  return <div className="welcome-top"><div className="brand">GR<span>I</span>T<small>FROM DREAM TO DIRECTION</small></div><div className="welcome-robot"><Gritty size={210}/><span className="orbit orbit-one">✳</span><span className="orbit orbit-two">↗</span></div><p className="handnote">a brighter you.<br/>a bigger tomorrow.</p></div>;
}
