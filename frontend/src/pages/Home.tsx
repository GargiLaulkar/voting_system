import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in text-center">
      <div className="max-w-3xl space-y-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Trust in Every Vote with <span className="text-civic-blue">Blockchain</span> Technology
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
          A fully decentralized, transparent, and secure voting platform. Ensure your voice is heard without compromising your privacy.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link to="/elections" className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-civic-blue hover:bg-blue-700 md:py-4 md:text-lg transition-all shadow-sm hover:shadow-md">
            View Active Elections
          </Link>
          <Link to="/register" className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-civic-blue bg-white hover:bg-gray-50 md:py-4 md:text-lg transition-all shadow-sm hover:shadow-md">
            Register to Vote
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 text-left">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 text-civic-blue rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">End-to-End Encryption</h3>
            <p className="text-gray-600">Your vote is encrypted on your device before it ever reaches the blockchain.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 text-civic-blue rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Zero-Knowledge Proofs</h3>
            <p className="text-gray-600">Prove your eligibility to vote without revealing your identity or choices.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 text-civic-blue rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Immutable Audit Trail</h3>
            <p className="text-gray-600">Anyone can verify the final tally and ensure no votes were tampered with.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
