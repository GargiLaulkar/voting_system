import type { HTMLAttributes, ReactNode } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <section className={`rounded-xl bg-white shadow-card ring-1 ring-slate-200/80 ${className}`} {...props}>
      {children}
    </section>
  );
}
