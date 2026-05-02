import React from 'react';
import { Link } from 'react-router-dom';

const mockElections = [
  {
    id: 1,
    title: "2026 National Presidential Election",
    status: "Active",
    endDate: "Nov 3, 2026",
    participants: 1245032
  },
  {
    id: 2,
    title: "City Council Initiative 42",
    status: "Draft",
    endDate: "Dec 15, 2026",
    participants: 0
  },
  {
    id: 3,
    title: "State Representative District 9",
    status: "Closed",
    endDate: "Oct 1, 2026",
    participants: 45021
  }
];

const ElectionDiscovery = () => {
  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Active Elections</h1>
          <p className="text-gray-500 mt-2">Browse and participate in democratic processes securely.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockElections.map((election) => (
          <div key={election.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col transition-shadow hover:shadow-md">
            <div className={`h-2 w-full ${election.status === 'Active' ? 'bg-green-500' : election.status === 'Draft' ? 'bg-yellow-400' : 'bg-gray-400'}`}></div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${election.status === 'Active' ? 'bg-green-100 text-green-800' : election.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                  {election.status}
                </span>
                <span className="text-sm text-gray-500">Closes: {election.endDate}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{election.title}</h3>
              <p className="text-sm text-gray-500 mb-6 flex-1">
                {election.participants.toLocaleString()} registered voters participating.
              </p>
              
              {election.status === 'Active' ? (
                <Link to={`/vote/${election.id}`} className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-civic-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-civic-blue">
                  View Ballot & Vote
                </Link>
              ) : (
                <button disabled className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-400 bg-gray-50 cursor-not-allowed">
                  {election.status === 'Closed' ? 'View Results' : 'Not Yet Open'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElectionDiscovery;
