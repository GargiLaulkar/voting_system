import { useMemo, useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Stepper } from '../components/ui/Stepper';
import { useToast } from '../components/ui/Toast';
import { useWallet } from '../context/WalletContext';
import { truncateAddress } from '../lib/mockData';

const steps = ['Connect Wallet', 'Verify Identity', 'Receive Credential'];

export default function VoterRegistration() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', dob: '', nationalId: '' });
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const wallet = useWallet();
  const { showToast } = useToast();

  const credential = useMemo(
    () => ({
      voterIdHash: wallet.address ? `0x${btoa(wallet.address).replace(/[^a-fA-F0-9]/g, '').padEnd(64, '0').slice(0, 64)}` : 'Not generated',
      issuedAt: new Date().toISOString(),
      walletAddress: wallet.address ?? 'Not connected',
      network: wallet.networkName,
    }),
    [wallet.address, wallet.networkName],
  );

  const verify = () => {
    if (!form.name || !form.dob || !form.nationalId) {
      showToast('error', 'Complete all identity fields before verification.');
      return;
    }
    setVerifying(true);
    window.setTimeout(() => {
      setVerifying(false);
      setVerified(true);
      setStep(3);
      showToast('success', 'Identity verified');
    }, 1200);
  };

  const downloadCredential = () => {
    const blob = new Blob([JSON.stringify(credential, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'securevote-credential.json';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Voter Registration</h1>
        <p className="mt-2 text-slate-600">Register once, preserve privacy, and use your wallet-bound credential for eligible elections.</p>
      </div>
      <Card className="p-6">
        <Stepper steps={steps} current={step} />
        <div className="mt-8">
          {step === 1 && (
            <div className="grid gap-6 md:grid-cols-[1fr_0.8fr]">
              <div>
                <h2 className="text-2xl font-bold">Connect Wallet</h2>
                <p className="mt-3 leading-7 text-slate-600">Your wallet signs registration actions and anchors your anonymous voting credential.</p>
                {!window.ethereum && (
                  <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm font-semibold text-civic-warning">
                    MetaMask is not installed. <a className="underline" href="https://metamask.io/download/" target="_blank" rel="noreferrer">Install MetaMask</a>
                  </p>
                )}
                <div className="mt-6 flex gap-3">
                  <Button onClick={wallet.connect}>{wallet.address ? 'Reconnect Wallet' : 'Connect MetaMask'}</Button>
                  <Button variant="secondary" onClick={() => setStep(2)} disabled={!wallet.address || wallet.isWrongNetwork}>Continue</Button>
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-500">Wallet status</p>
                <p className="mt-2 font-mono text-sm">{wallet.address ? truncateAddress(wallet.address) : 'Not connected'}</p>
                <p className="mt-3 text-sm text-slate-600">Network: {wallet.networkName}</p>
                <p className="text-sm text-slate-600">Chain ID: {wallet.chainId ?? 'Unavailable'}</p>
                {wallet.isWrongNetwork && <Button className="mt-4" variant="secondary" onClick={wallet.switchToLocalhost}>Switch to Localhost</Button>}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-2xl font-bold">Verify Identity</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <label><span className="mb-2 block text-sm font-semibold">Full Name</span><input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
                <label><span className="mb-2 block text-sm font-semibold">Date of Birth</span><input type="date" value={form.dob} onChange={(event) => setForm({ ...form, dob: event.target.value })} /></label>
                <label><span className="mb-2 block text-sm font-semibold">National ID Number</span><input value={form.nationalId} onChange={(event) => setForm({ ...form, nationalId: event.target.value })} /></label>
              </div>
              {verified && <p className="rounded-lg bg-green-50 p-3 font-semibold text-civic-success">Identity Verified ✓</p>}
              <div className="flex justify-between gap-3">
                <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
                <Button loading={verifying} onClick={verify}>{verified ? 'Verified' : 'Verify Identity'}</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-6 md:grid-cols-[1fr_0.75fr]">
              <div>
                <h2 className="text-2xl font-bold">Credential Issued</h2>
                <p className="mt-3 text-slate-600">Your credential can be used to prove eligibility without exposing your ballot choice.</p>
                <div className="mt-6 flex gap-3">
                  <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
                  <Button onClick={downloadCredential}>Download Credential</Button>
                </div>
              </div>
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-sm">
                <p className="font-bold text-civic-primary">SecureVote Credential</p>
                <p className="mt-4 break-all font-mono">Hash: {credential.voterIdHash}</p>
                <p className="mt-3">Issued: {new Date(credential.issuedAt).toLocaleString()}</p>
                <p className="mt-3 break-all">Wallet: {credential.walletAddress}</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
