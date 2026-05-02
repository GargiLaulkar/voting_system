import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const VoteCasting = () => {
  const { id } = useParams();
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<string | null>(null);

  const mockCandidates = [
    { id: 1, name: "Alice Johnson", party: "Progressive Party" },
    { id: 2, name: "Bob Smith", party: "Conservative Party" },
    { id: 3, name: "Carol Davis", party: "Independent" }
  ];

  const handleVoteSubmit = () => {
    if (selectedCandidate === null) return;
    setIsSubmitting(true);
    
    // Simulate encryption and blockchain tx
    setTimeout(() => {
      setIsSubmitting(false);
      setReceipt("0x8f3a9b2c...d7e4f1a2");
    }, 2000);
  };

  if (receipt) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <div className="bg-white shadow-sm rounded-xl border border-gray-100 p-8">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Vote Cast Successfully</h2>
          <p className="text-gray-600 mb-6">Your vote has been encrypted and recorded on the blockchain.</p>
          
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-8 text-left">
            <p className="text-sm text-gray-500 font-medium mb-1">Your Vote Receipt Hash:</p>
            <p className="text-sm font-mono text-gray-900 break-all">{receipt}</p>
          </div>

          <p className="text-sm text-gray-500">Save this receipt. You can use it to verify your vote is in the final tally without revealing your choice.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Cast Your Vote</h1>
      <p className="text-gray-500 mb-8">Election ID: {id}</p>

      <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Select a Candidate</h3>
          
          <div className="space-y-4">
            {mockCandidates.map((candidate) => (
              <label 
                key={candidate.id} 
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${selectedCandidate === candidate.id ? 'border-civic-blue bg-blue-50 ring-1 ring-civic-blue' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
              >
                <input 
                  type="radio" 
                  name="candidate" 
                  className="h-5 w-5 text-civic-blue focus:ring-civic-blue border-gray-300"
                  checked={selectedCandidate === candidate.id}
                  onChange={() => setSelectedCandidate(candidate.id)}
                />
                <div className="ml-4 flex-1">
                  <div className="text-lg font-medium text-gray-900">{candidate.name}</div>
                  <div className="text-sm text-gray-500">{candidate.party}</div>
                </div>
              </label>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
            <button className="text-gray-600 hover:text-gray-900 font-medium">Cancel</button>
            <button 
              onClick={handleVoteSubmit}
              disabled={selectedCandidate === null || isSubmitting}
              className={`px-6 py-3 rounded-md font-medium text-white transition-all flex items-center justify-center ${selectedCandidate === null || isSubmitting ? 'bg-gray-300 cursor-not-allowed' : 'bg-civic-blue hover:bg-blue-700 shadow-sm'}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Encrypting & Submitting...
                </>
              ) : 'Submit Encrypted Vote'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteCasting;
