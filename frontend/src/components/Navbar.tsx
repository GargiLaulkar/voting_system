import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { truncateAddress } from '../lib/mockData';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [installOpen, setInstallOpen] = useState(false);
  const wallet = useWallet();

  const connect = async () => {
    if (!window.ethereum) {
      setInstallOpen(true);
      return;
    }
    await wallet.connect();
  };

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-sm font-semibold transition ${isActive ? 'bg-blue-50 text-civic-accent' : 'text-slate-700 hover:bg-slate-100 hover:text-civic-primary'}`;

  return (
    <>
      {wallet.isWrongNetwork && (
        <div className="bg-amber-50 px-4 py-2 text-center text-sm font-semibold text-civic-warning ring-1 ring-amber-200" role="status">
          Wrong Network - Please switch to Localhost 8545
          <button className="ml-3 underline" onClick={wallet.switchToLocalhost}>Switch</button>
        </div>
      )}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-civic-primary">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-civic-primary text-white" aria-hidden="true">✓</span>
            SecureVote
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
            <NavLink to="/elections" className={navClass}>Elections</NavLink>
            <NavLink to="/register" className={navClass}>Register</NavLink>
            <NavLink to="/admin" className={navClass}>Admin</NavLink>
          </nav>
          <div className="relative">
            {wallet.address ? (
              <Button variant="secondary" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
                <span className="h-2.5 w-2.5 rounded-full bg-civic-success" aria-hidden="true" />
                {truncateAddress(wallet.address)}
              </Button>
            ) : (
              <Button onClick={connect}>Connect Wallet</Button>
            )}
            {open && wallet.address && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white p-4 shadow-card ring-1 ring-slate-200">
                <p className="text-xs font-semibold uppercase text-slate-500">Connected wallet</p>
                <p className="mt-1 break-all font-mono text-sm text-civic-primary">{wallet.address}</p>
                <p className="mt-3 text-sm text-slate-600">{wallet.networkName}</p>
                <div className="mt-4 grid gap-2">
                  <Button variant="secondary" onClick={() => navigator.clipboard.writeText(wallet.address ?? '')}>Copy Address</Button>
                  <Button variant="ghost" onClick={wallet.disconnect}>Disconnect</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      <Modal open={installOpen} title="Install MetaMask" onClose={() => setInstallOpen(false)}>
        <p className="text-slate-600">MetaMask is required to sign transactions and verify your wallet. Install the browser extension, then return and connect.</p>
        <a className="mt-5 inline-flex rounded-lg bg-civic-accent px-4 py-2.5 font-semibold text-white" href="https://metamask.io/download/" target="_blank" rel="noreferrer">
          Open MetaMask Download
        </a>
      </Modal>
    </>
  );
}
