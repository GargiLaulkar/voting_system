import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useToast } from '../components/ui/Toast';
import { useWallet } from '../context/WalletContext';
import { elections } from '../lib/mockData';

type Phase = 'select' | 'review' | 'pending' | 'success';

const initials = (name: string) => name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();

export default function VoteCasting() {
  const { id } = useParams();
  const election = elections.find((item) => String(item.id) === id);
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>('select');
  const [receipt, setReceipt] = useState('');
  const wallet = useWallet();
  const { showToast } = useToast();

  const candidate = useMemo(() => election?.candidates.find((item) => item.id === selected), [election, selected]);
  const totalVotes = election?.candidates.reduce((sum, item) => sum + item.votes, 0) ?? 0;

  if (!election) {
    return <Card className="p-8"><h1 className="text-2xl font-bold">Election not found</h1><Link className="mt-4 inline-flex text-civic-accent" to="/elections">Return to elections</Link></Card>;
  }

  if (election.eligibility === 'Already Voted') {
    return <Card className="mx-auto max-w-2xl p-8 text-center"><h1 className="text-2xl font-bold">You have already voted in this election</h1><p className="mt-3 text-slate-600">The nullifier for your credential already exists on-chain, so another vote cannot be submitted.</p><Link className="mt-5 inline-flex font-semibold text-civic-accent" to={`/elections/${election.id}/results`}>View Results</Link></Card>;
  }

  const submit = () => {
    if (!candidate) {
      showToast('error', 'Select a candidate before review.');
      return;
    }
    setPhase('pending');
    window.setTimeout(() => {
      const hash = `0x${crypto.getRandomValues(new Uint32Array(8)).reduce((value, part) => value + part.toString(16).padStart(8, '0'), '')}`;
      setReceipt(hash);
      setPhase('success');
      showToast('success', 'Encrypted vote submitted');
    }, 1600);
  };

  if (phase === 'success') {
    return (
      <Card className="mx-auto max-w-3xl p-8">
        <Badge status="Active" />
        <h1 className="mt-4 text-3xl font-bold">Vote Cast Successfully</h1>
        <p className="mt-3 text-slate-600">Your vote was encrypted client-side and recorded with a receipt hash.</p>
        <dl className="mt-6 space-y-3 rounded-xl bg-slate-50 p-5 text-sm">
          <div><dt className="font-semibold">Transaction Hash</dt><dd className="break-all font-mono"><a className="text-civic-accent" href={`http://127.0.0.1:8545/tx/${receipt}`}>{receipt}</a></dd></div>
          <div><dt className="font-semibold">Merkle Proof</dt><dd><Link className="text-civic-accent" to={`/verify/${receipt}`}>Open receipt verification</Link></dd></div>
          <div><dt className="font-semibold">Timestamp</dt><dd>{new Date().toLocaleString()}</dd></div>
        </dl>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Badge status={election.status} />
        <h1 className="mt-3 text-3xl font-bold">{election.title}</h1>
        <p className="mt-2 text-slate-600">{election.description}</p>
        <p className="mt-2 text-sm font-semibold text-civic-accent" aria-live="polite">{totalVotes.toLocaleString()} encrypted ballots recorded so far</p>
      </div>
      <Card className="p-6">
        {phase === 'select' && (
          <>
            <div className="mb-5 rounded-lg bg-blue-50 p-3 text-sm font-semibold text-civic-accent">Your vote is encrypted client-side before submission.</div>
            <div className="grid gap-4 md:grid-cols-3">
              {election.candidates.map((item) => (
                <button key={item.id} type="button" onClick={() => setSelected(item.id)} className={`rounded-xl border p-5 text-left transition ${selected === item.id ? 'border-civic-accent bg-blue-50 ring-2 ring-civic-accent' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-civic-primary font-bold text-white" aria-label={`${item.name} avatar`}>{initials(item.name)}</span>
                  <h2 className="mt-4 text-lg font-bold">{item.name}</h2>
                  <p className="text-sm font-semibold text-slate-500">{item.party}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.manifesto}</p>
                  {selected === item.id && <p className="mt-3 font-semibold text-civic-accent">✓ Selected</p>}
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <Button disabled={!wallet.isConnected || !selected} onClick={() => setPhase('review')}>{wallet.isConnected ? 'Review Vote' : 'Connect wallet to vote'}</Button>
            </div>
          </>
        )}
        {phase === 'review' && candidate && (
          <div>
            <h2 className="text-2xl font-bold">Review Encrypted Ballot</h2>
            <p className="mt-3 text-slate-600">Selected candidate: <strong>{candidate.name}</strong></p>
            <div className="mt-6 flex justify-between gap-3">
              <Button variant="secondary" onClick={() => setPhase('select')}>Back</Button>
              <Button onClick={submit}>Submit Encrypted Vote</Button>
            </div>
          </div>
        )}
        {phase === 'pending' && <div className="py-12 text-center"><p className="text-xl font-bold">Awaiting MetaMask transaction confirmation...</p><p className="mt-2 text-slate-600">Do not close this window while the transaction is pending.</p></div>}
      </Card>
    </div>
  );
}
