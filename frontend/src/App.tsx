import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/Navbar';
import { ToastProvider } from './components/ui/Toast';
import { WalletProvider } from './context/WalletContext';
import AdminDashboard from './pages/AdminDashboard';
import ElectionDiscovery from './pages/ElectionDiscovery';
import ElectionResults from './pages/ElectionResults';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ReceiptVerification from './pages/ReceiptVerification';
import VoteCasting from './pages/VoteCasting';
import VoterRegistration from './pages/VoterRegistration';

function App() {
  return (
    <ToastProvider>
      <WalletProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-civic-bg text-civic-primary">
            <Navbar />
            <main className="mx-auto min-h-[calc(100vh-8rem)] max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <ErrorBoundary>
                <div className="animate-page-fade">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<VoterRegistration />} />
                    <Route path="/elections" element={<ElectionDiscovery />} />
                    <Route path="/elections/:id/vote" element={<VoteCasting />} />
                    <Route path="/vote/:id" element={<Navigate to="/elections" replace />} />
                    <Route path="/elections/:id/results" element={<ElectionResults />} />
                    <Route path="/verify/:receiptHash" element={<ReceiptVerification />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </ErrorBoundary>
            </main>
            <footer className="border-t border-slate-200 bg-white">
              <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <p>&copy; {new Date().getFullYear()} SecureVote Blockchain System.</p>
                <div className="flex gap-4">
                  <a className="font-semibold text-civic-accent" href="/admin">Audit Trail</a>
                  <a className="font-semibold text-civic-accent" href="https://github.com/GargiLaulkar/voting_system" target="_blank" rel="noreferrer">GitHub</a>
                </div>
              </div>
            </footer>
          </div>
        </BrowserRouter>
      </WalletProvider>
    </ToastProvider>
  );
}

export default App;
