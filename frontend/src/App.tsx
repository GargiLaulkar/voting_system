import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import VoterRegistration from './pages/VoterRegistration';
import ElectionDiscovery from './pages/ElectionDiscovery';
import VoteCasting from './pages/VoteCasting';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-civic-light text-gray-900 font-sans flex flex-col">
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-civic-blue flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              SecureVote
            </Link>
            <nav className="flex space-x-6">
              <Link to="/elections" className="text-gray-600 hover:text-civic-blue font-medium transition-colors">Elections</Link>
              <Link to="/register" className="text-gray-600 hover:text-civic-blue font-medium transition-colors">Register</Link>
              <Link to="/admin" className="text-gray-600 hover:text-civic-blue font-medium transition-colors">Admin</Link>
            </nav>
            <div>
              <button className="bg-civic-blue text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-civic-blue">
                Connect Wallet
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<VoterRegistration />} />
            <Route path="/elections" element={<ElectionDiscovery />} />
            <Route path="/vote/:id" element={<VoteCasting />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} SecureVote Blockchain System. All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
