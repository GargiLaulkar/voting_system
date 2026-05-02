import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { EmptyState } from '../components/ui/EmptyState';
import { SkeletonGrid } from '../components/ui/Loader';
import { useWallet } from '../context/WalletContext';
import { elections, type ElectionStatus } from '../lib/mockData';

type Filter = 'All' | ElectionStatus;

export default function ElectionDiscovery() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('All');
  const [loading] = useState(false);
  const wallet = useWallet();

  const filtered = useMemo(
    () =>
      elections.filter((election) => {
        const matchesFilter = filter === 'All' || election.status === filter;
        const matchesQuery = `${election.title} ${election.description}`.toLowerCase().includes(query.toLowerCase());
        return matchesFilter && matchesQuery;
      }),
    [filter, query],
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Election Center</h1>
        <p className="mt-2 text-slate-600">Search ballots, check eligibility, and cast encrypted votes only when every condition is valid.</p>
      </div>
      <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-card ring-1 ring-slate-200 lg:flex-row lg:items-center lg:justify-between">
        <label className="flex-1">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Search elections</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by election name or description" />
        </label>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Election status filters">
          {(['All', 'Active', 'Draft', 'Closed'] as Filter[]).map((item) => (
            <button key={item} className={`rounded-lg px-4 py-2 text-sm font-semibold ${filter === item ? 'bg-civic-accent text-white' : 'bg-slate-100 text-slate-700'}`} onClick={() => setFilter(item)} type="button">
              {item}
            </button>
          ))}
        </div>
      </div>

      {loading ? <SkeletonGrid /> : filtered.length === 0 ? <EmptyState title="No elections found" message="Try a different search term or status filter." /> : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((election) => {
            const canVote = wallet.isConnected && election.eligibility === 'Eligible' && election.status === 'Active';
            const border = election.status === 'Active' ? 'border-t-civic-success' : election.status === 'Draft' ? 'border-t-civic-warning' : 'border-t-slate-400';
            return (
              <Card key={election.id} className={`flex flex-col border-t-4 ${border}`}>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <Badge status={election.status} />
                    <Badge status={election.eligibility} />
                  </div>
                  <h2 className="mt-5 text-xl font-bold">{election.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{election.description}</p>
                  <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                    <div><dt className="font-semibold text-slate-500">Opens</dt><dd>{new Date(election.startDate).toLocaleDateString()}</dd></div>
                    <div><dt className="font-semibold text-slate-500">Closes</dt><dd>{new Date(election.endDate).toLocaleDateString()}</dd></div>
                    <div><dt className="font-semibold text-slate-500">Candidates</dt><dd>{election.candidates.length}</dd></div>
                    <div><dt className="font-semibold text-slate-500">Voters</dt><dd>{election.registeredVoters.toLocaleString()}</dd></div>
                  </dl>
                  <div className="mt-6 grid gap-2">
                    {election.status === 'Closed' ? (
                      <Link className="inline-flex min-h-11 items-center justify-center rounded-lg bg-civic-accent px-4 text-sm font-semibold text-white" to={`/elections/${election.id}/results`}>View Results</Link>
                    ) : (
                      <Link className={`inline-flex min-h-11 items-center justify-center rounded-lg px-4 text-sm font-semibold ${canVote ? 'bg-civic-accent text-white' : 'pointer-events-none bg-slate-200 text-slate-500'}`} to={`/elections/${election.id}/vote`} aria-disabled={!canVote}>
                        {election.status === 'Draft' ? 'Not Yet Open' : 'View Ballot & Vote'}
                      </Link>
                    )}
                    {!canVote && election.status === 'Active' && <Button variant="secondary" disabled>{wallet.isConnected ? election.eligibility : 'Connect wallet to vote'}</Button>}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
