import { ArrowLeft, PaperPlaneRight } from '@phosphor-icons/react';
import { Mascot } from '../../components/AppUI';

type Chat = { who: 'me' | 'coach'; text: string };

export function Coach({
  back,
  chat,
  ask,
  message,
  setMessage,
}: {
  back: () => void;
  chat: Chat[];
  ask: (text: string) => void;
  message: string;
  setMessage: (text: string) => void;
}) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center gap-3 border-b border-navy/8 px-5 pb-3 pt-5">
        <button onClick={back} aria-label="Go back">
          <ArrowLeft size={20} />
        </button>
        <Mascot size={42} />
        <div>
          <p className="text-sm font-extrabold">GRIT Coach</p>
          <p className="text-[10px] text-navy/50">
            Prototype companion · No pressure
          </p>
        </div>
      </div>
      <div className="screen-scroll min-h-0 flex-1 space-y-4 px-5 py-5">
        <div className="flex items-start gap-2">
          <Mascot size={35} />
          <p className="max-w-[80%] rounded-2xl rounded-tl-sm bg-paper p-3 text-xs leading-relaxed">
            Hey! I’m here to help you figure things out — no pressure. What’s on
            your mind?
          </p>
        </div>
        {chat.map((c, i) => (
          <div
            key={i}
            className={`flex ${c.who === 'me' ? 'justify-end' : 'items-start gap-2'}`}
          >
            {c.who === 'coach' && <Mascot size={35} />}
            <p
              className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${c.who === 'me' ? 'rounded-tr-sm bg-navy text-white' : 'rounded-tl-sm bg-paper'}`}
            >
              {c.text}
            </p>
          </div>
        ))}
        <p className="text-[10px] font-bold text-navy/45">
          WHAT WOULD YOU LIKE TO TALK ABOUT?
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            'What careers could fit me?',
            'Why might marketing fit me?',
            'I don’t know what I want.',
            'What should I try next?',
            'What’s the difference between these careers?',
          ].map((x) => (
            <button
              onClick={() => ask(x)}
              key={x}
              className="rounded-xl border border-navy/10 px-3 py-2 text-left text-[11px] font-semibold"
            >
              {x}
            </button>
          ))}
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(message);
        }}
        className="flex gap-2 border-t border-navy/8 p-4 pb-[max(16px,env(safe-area-inset-bottom))]"
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          aria-label="Message GRIT Coach"
          className="min-w-0 flex-1 rounded-xl bg-paper px-3 text-xs"
        />
        <button
          aria-label="Send message"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white"
        >
          <PaperPlaneRight size={18} />
        </button>
      </form>
    </div>
  );
}
