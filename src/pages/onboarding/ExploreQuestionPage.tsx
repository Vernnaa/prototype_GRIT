import { Palette, Lightbulb, Heart, UsersThree, ChartBar, Cube, ChatCircleDots, CalendarBlank, PaperPlaneTilt, type Icon } from '@phosphor-icons/react';

export type QuestionOption = { value: string; label: string; icon: Icon; color?: string };

export function ExploreQuestionPage({ currentQuestion, totalQuestions, title, instruction, options, maxSelections, selectedValues, onSelectionChange, onNext, onBack, error }: {
  currentQuestion: number; totalQuestions: number; title: string; instruction: string;
  options: QuestionOption[]; maxSelections: number; selectedValues: string[];
  onSelectionChange: (values: string[]) => void; onNext: () => void; onBack: () => void; error: string;
}) {
  const progress = currentQuestion / totalQuestions * 100;
  return <section className="explore-question" aria-label="Explore Yourself">
    <div className="question-counter"><span>Question {currentQuestion} of {totalQuestions}</span><button type="button" onClick={onBack}>Back</button></div>
    <div className="question-progress" role="progressbar" aria-label="Quiz progress" aria-valuemin={0} aria-valuemax={totalQuestions} aria-valuenow={currentQuestion}>
      <div style={{ width: `${progress}%` }}><span /></div>
    </div>
    <header className="question-header"><h1>{title === 'What activities do you enjoy the most?' ? <>What activities<br />do you enjoy the most?</> : title}</h1><p>{instruction}</p></header>
    <div className="question-options">{options.map(({ value, label, icon: OptionIcon, color }) => <button type="button" key={value} aria-pressed={selectedValues.includes(value)} className="question-option" onClick={() => {
      if (selectedValues.includes(value)) onSelectionChange(selectedValues.filter(selected => selected !== value));
      else if (maxSelections === 1) onSelectionChange([value]);
      else onSelectionChange([...selectedValues, value]);
    }}><OptionIcon size={34} weight="duotone" style={{ color: selectedValues.includes(value) ? '#C8FF00' : color || '#6557F5' }} aria-hidden="true" /><span>{label}</span></button>)}</div>
    <footer className="question-navigation">{error && <p role="alert">{error}</p>}<button type="button" onClick={onNext}>{currentQuestion === totalQuestions ? 'See My Explorer Profile' : 'Next'}</button></footer>
  </section>;
}

const activityOptions: Record<string, { icon: Icon; color: string }> = {
  Creating: { icon: Palette, color: '#6557F5' },
  'Solving problems': { icon: Lightbulb, color: '#6557F5' },
  'Helping people': { icon: Heart, color: '#6557F5' },
  Leading: { icon: UsersThree, color: '#062B49' },
  Analyzing: { icon: ChartBar, color: '#6557F5' },
  Building: { icon: Cube, color: '#062B49' },
  Communicating: { icon: ChatCircleDots, color: '#6557F5' },
  Organizing: { icon: CalendarBlank, color: '#062B49' },
  Exploring: { icon: PaperPlaneTilt, color: '#6557F5' },
};

export function questionOptions(choices: string[]): QuestionOption[] {
  return choices.map(label => {
    const icon = /design|creat|writ|story|video/i.test(label) ? Palette
      : /help|empathy|impact|community/i.test(label) ? Heart
      : /lead|team|collaborat|people|teach/i.test(label) ? UsersThree
      : /analy|data|research|investigat|scientific/i.test(label) ? ChartBar
      : /build|cod|tech|product|app|hands-on/i.test(label) ? Cube
      : /communicat|talk|present|interview/i.test(label) ? ChatCircleDots
      : /plan|organiz|event|routine|stability/i.test(label) ? CalendarBlank
      : /explor|freedom|independen|remote|surprise/i.test(label) ? PaperPlaneTilt : Lightbulb;
    return { value: label, label, ...(activityOptions[label] || { icon, color: '#6557F5' }) };
  });
}
