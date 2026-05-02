import { Link, useParams } from 'react-router-dom';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { elections } from '../lib/mockData';

export default function ElectionResults() {
  const { id } = useParams();
  const election = elections.find((item) => String(item.id) === id) ?? elections[0];
  const total = election.candidates.reduce((sum, candidate) => sum + candidate.votes, 0);
  const winner = [...election.candidates].sort((a, b) => b.votes - a.votes)[0];

  return (
    <div className="space-y-6">
      <div><Badge status={election.status} /><h1 className="mt-3 text-3xl font-bold">{election.title} Results</h1><p className="mt-2 text-slate-600">Total votes cast: {total.toLocaleString()} | Turnout: {Math.round((total / Math.max(election.registeredVoters, 1)) * 100)}%</p></div>
      <Card className="p-6">
        <div className="space-y-5">
          {election.candidates.map((candidate) => {
            const percent = total ? Math.round((candidate.votes / total) * 100) : 0;
            return <div key={candidate.id}><div className="mb-2 flex justify-between gap-4"><p className="font-bold">{candidate.name} {candidate.id === winner.id && <span className="text-civic-warning">Trophy Winner</span>}</p><p>{percent}%</p></div><div className="h-4 rounded-full bg-slate-100"><div className="h-4 rounded-full bg-civic-accent" style={{ width: `${percent}%` }} /></div></div>;
          })}
        </div>
      </Card>
      <Link className="font-semibold text-civic-accent" to="/elections">Back to elections</Link>
    </div>
  );
}
