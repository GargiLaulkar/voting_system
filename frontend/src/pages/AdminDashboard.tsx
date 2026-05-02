import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { StatCard } from '../components/ui/StatCard';
import { useToast } from '../components/ui/Toast';
import { auditEvents, contractAddresses, elections, voterRegistry } from '../lib/mockData';

type Tab = 'elections' | 'registry' | 'audit';

const icon = (path: string) => <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={path} /></svg>;

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('elections');
  const [modalOpen, setModalOpen] = useState(false);
  const [candidateCount, setCandidateCount] = useState(2);
  const { showToast } = useToast();

  const submit = () => {
    setModalOpen(false);
    showToast('success', 'Election deployment queued for wallet confirmation.');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Administrator Dashboard</h1>
          <p className="mt-2 text-slate-600">Manage election lifecycle, registry state, and audit activity.</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>+ Create New Election</Button>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        <StatCard label="Elections" value={String(elections.length)} trend="1 active" icon={icon('M5 4h14v16H5zM8 8h8M8 12h8M8 16h5')} />
        <StatCard label="Registered Voters" value="1.29M" trend="+2,401 today" icon={icon('M16 21v-2a4 4 0 0 0-8 0v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M20 21v-2a3 3 0 0 0-2-2.83')} />
        <StatCard label="Votes Cast" value="1.04M" trend="Receipts synced" icon={icon('m5 13 4 4L19 7')} />
        <StatCard label="System Status" value="Operational" trend="All contracts reachable" icon={icon('M12 3 20 7v5c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V7l8-4Z')} />
      </div>

      <Card className="p-5">
        <h2 className="text-lg font-bold">Contract Addresses</h2>
        <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
          {Object.entries(contractAddresses).map(([name, address]) => <p key={name} className="break-all rounded-lg bg-slate-50 p-3"><strong>{name}:</strong> {address}</p>)}
        </div>
      </Card>

      <div className="flex flex-wrap gap-2">
        {(['elections', 'registry', 'audit'] as Tab[]).map((item) => (
          <button key={item} className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize ${tab === item ? 'bg-civic-accent text-white' : 'bg-white text-slate-700 shadow-card'}`} onClick={() => setTab(item)} type="button">{item === 'registry' ? 'Voter Registry' : item}</button>
        ))}
      </div>

      {tab === 'elections' && (
        <Card className="overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50"><tr><th className="px-5 py-3 text-left text-sm">Election</th><th className="px-5 py-3 text-left text-sm">Status</th><th className="px-5 py-3 text-left text-sm">Voters</th><th className="px-5 py-3 text-right text-sm">Actions</th></tr></thead>
            <tbody className="divide-y divide-slate-200">
              {elections.map((election) => (
                <tr key={election.id}>
                  <td className="px-5 py-4"><p className="font-semibold">{election.title}</p><p className="text-sm text-slate-500">ID: {election.id}</p></td>
                  <td className="px-5 py-4"><Badge status={election.status} /></td>
                  <td className="px-5 py-4 text-sm">{election.registeredVoters.toLocaleString()}</td>
                  <td className="px-5 py-4 text-right"><div className="flex justify-end gap-2"><Button variant="secondary">{election.paused ? 'Resume' : 'Pause'}</Button><Link className="inline-flex min-h-11 items-center rounded-lg bg-civic-accent px-4 text-sm font-semibold text-white" to={`/elections/${election.id}/results`}>View Results</Link></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {tab === 'registry' && <Card className="p-5"><h2 className="text-xl font-bold">Voter Registry</h2><div className="mt-4 grid gap-2">{voterRegistry.slice(0, 10).map((wallet) => <p key={wallet} className="break-all rounded-lg bg-slate-50 p-3 font-mono text-sm">{wallet}</p>)}</div><p className="mt-4 text-sm text-slate-500">Showing 10 per page</p></Card>}

      {tab === 'audit' && <Card className="p-5"><h2 className="text-xl font-bold">Audit Log</h2><div className="mt-5 space-y-4">{auditEvents.map((event) => <div key={event.id} className="border-l-4 border-civic-accent pl-4"><p className="font-bold">{event.type}</p><p className="text-sm text-slate-500">{event.timestamp}</p><p className="break-all font-mono text-xs text-slate-600">{event.tx}</p></div>)}</div></Card>}

      <Modal open={modalOpen} title="Create New Election" onClose={() => setModalOpen(false)}>
        <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); submit(); }}>
          <label><span className="mb-2 block text-sm font-semibold">Election Name</span><input required /></label>
          <label><span className="mb-2 block text-sm font-semibold">Description</span><textarea required rows={3} /></label>
          <div className="grid gap-4 md:grid-cols-2">
            <label><span className="mb-2 block text-sm font-semibold">Start Date/Time</span><input required type="datetime-local" /></label>
            <label><span className="mb-2 block text-sm font-semibold">End Date/Time</span><input required type="datetime-local" /></label>
          </div>
          <div className="space-y-3">
            <p className="font-semibold">Candidates</p>
            {Array.from({ length: candidateCount }, (_, index) => <div key={index} className="grid gap-3 md:grid-cols-2"><label><span className="mb-1 block text-sm">Name</span><input required /></label><label><span className="mb-1 block text-sm">Party</span><input required /></label></div>)}
            <Button type="button" variant="secondary" onClick={() => setCandidateCount((count) => count + 1)}>+ Add Candidate</Button>
          </div>
          <div className="flex justify-end gap-3"><Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button><Button type="submit">Deploy Election</Button></div>
        </form>
      </Modal>
    </div>
  );
}
