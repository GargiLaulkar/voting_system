import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  loading?: boolean;
  children: ReactNode;
};

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-civic-accent text-white hover:bg-blue-800 border-transparent',
  secondary: 'bg-white text-civic-primary border-slate-300 hover:bg-slate-50',
  ghost: 'bg-transparent text-civic-accent border-transparent hover:bg-blue-50',
  danger: 'bg-red-600 text-white hover:bg-red-700 border-transparent',
};

export function Button({ variant = 'primary', loading = false, children, className = '', disabled, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-civic-accent disabled:cursor-not-allowed disabled:opacity-55 ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />}
      {children}
    </button>
  );
}
