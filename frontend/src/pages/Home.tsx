import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';

const features = [
  ['Blockchain Verified', 'Every ballot receipt can be independently checked against immutable on-chain events.'],
  ['Anonymous Voting', 'Eligibility proofs are separated from ballot choices to protect voter privacy.'],
  ['Tamper Proof Audit', 'Election events produce a transparent trail for administrators and public observers.'],
];

const stats = [
  ['Total Elections', '18', '+4 this quarter'],
  ['Registered Voters', '1.29M', '+8.2% verified'],
  ['Votes Cast', '1.04M', '81% turnout'],
];

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="grid items-center gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-civic-accent">Blockchain civic infrastructure</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-tight sm:text-6xl">Secure. Transparent. Democratic.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            A hardened voting experience for encrypted ballots, auditable results, and accessible voter participation.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className="inline-flex min-h-12 items-center justify-center rounded-lg bg-civic-accent px-6 font-semibold text-white shadow-card transition hover:bg-blue-800" to="/elections">
              Browse Elections
            </Link>
            <Link className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 font-semibold text-civic-primary shadow-card transition hover:bg-slate-50" to="/register">
              Register to Vote
            </Link>
          </div>
        </div>
        <div className="relative mx-auto flex h-72 w-72 items-center justify-center rounded-full bg-white shadow-card ring-1 ring-slate-200">
          <div className="shield-chain absolute inset-0 rounded-full" aria-hidden="true" />
          <div className="relative flex h-36 w-28 items-center justify-center rounded-b-[38px] rounded-t-3xl bg-civic-primary text-white shadow-2xl" aria-label="Animated secure chain shield">
            <div className="absolute top-9 h-12 w-12 rounded-full border-4 border-civic-accent" />
            <div className="absolute top-[86px] h-3 w-16 rounded-full bg-civic-accent" />
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3" aria-label="Platform metrics">
        {stats.map(([label, value, trend]) => (
          <StatCard key={label} label={label} value={value} trend={trend} icon={<svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19V5m0 14h16M8 16V9m4 7V7m4 9v-4" /></svg>} />
        ))}
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {features.map(([title, body]) => (
          <Card key={title} className="p-6">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-civic-accent" aria-hidden="true">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3 20 7v5c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V7l8-4Z" /><path d="m9 12 2 2 4-5" /></svg>
            </div>
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="mt-3 leading-7 text-slate-600">{body}</p>
          </Card>
        ))}
      </section>

      <section className="rounded-xl bg-white p-6 shadow-card ring-1 ring-slate-200">
        <h2 className="text-2xl font-bold">How It Works</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {['Register', 'Verify', 'Vote', 'Verify Result'].map((step, index) => (
            <div key={step} className="rounded-lg border border-slate-200 p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-civic-accent text-sm font-bold text-white">{index + 1}</span>
              <h3 className="mt-4 text-lg font-bold">{step}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Complete this stage with clear status feedback and encrypted records.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
