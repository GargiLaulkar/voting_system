import React, { useState } from 'react';

const VoterRegistration = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-sm sm:rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate mb-6">Voter Registration</h2>
          
          <div className="mb-8">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-civic-blue text-white' : 'bg-gray-200 text-gray-500'} font-bold`}>1</div>
              <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-civic-blue' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-civic-blue text-white' : 'bg-gray-200 text-gray-500'} font-bold`}>2</div>
              <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-civic-blue' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-civic-blue text-white' : 'bg-gray-200 text-gray-500'} font-bold`}>3</div>
            </div>
            <div className="flex justify-between text-sm mt-2 text-gray-500">
              <span>Connect Wallet</span>
              <span>Verify Identity</span>
              <span>Receive Credential</span>
            </div>
          </div>

          {step === 1 && (
            <div className="text-center py-8">
              <div className="mb-6">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Connect Your Web3 Wallet</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">To participate in secure elections, you need to connect an Ethereum-compatible wallet.</p>
              <button 
                onClick={() => setStep(2)}
                className="bg-civic-blue text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-civic-blue"
              >
                Connect MetaMask
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="py-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Identity Verification (KYC Mock)</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="nationalId" className="block text-sm font-medium text-gray-700">National ID Number</label>
                  <input type="text" id="nationalId" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-civic-blue focus:ring-civic-blue sm:text-sm p-2 border" placeholder="Enter your ID" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Biometric Scan (Simulation)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                    <button className="text-civic-blue hover:text-blue-700 font-medium">Click to simulate fingerprint/face scan</button>
                  </div>
                </div>
                <div className="pt-4 flex justify-between">
                  <button onClick={() => setStep(1)} className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2">Back</button>
                  <button onClick={() => setStep(3)} className="bg-civic-blue text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">Verify & Proceed</button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <div className="mb-6">
                <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Complete!</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">Your Zero-Knowledge identity credential has been generated. You are now securely registered and added to the Voter Merkle Tree.</p>
              <button onClick={() => window.location.href = '/elections'} className="bg-civic-blue text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
                View Active Elections
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default VoterRegistration;
