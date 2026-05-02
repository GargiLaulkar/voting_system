type StepperProps = {
  steps: string[];
  current: number;
};

export function Stepper({ steps, current }: StepperProps) {
  return (
    <ol className="grid gap-4 sm:grid-cols-3" aria-label="Registration progress">
      {steps.map((label, index) => {
        const step = index + 1;
        const complete = current > step;
        const active = current === step;
        return (
          <li key={label} className="flex items-center gap-3">
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${
                complete || active ? 'border-civic-accent bg-civic-accent text-white shadow-sm' : 'border-slate-300 bg-white text-slate-500'
              }`}
            >
              {complete ? '✓' : step}
            </span>
            <span className={`text-sm font-semibold ${active ? 'text-civic-primary' : 'text-slate-600'}`}>{label}</span>
          </li>
        );
      })}
    </ol>
  );
}
