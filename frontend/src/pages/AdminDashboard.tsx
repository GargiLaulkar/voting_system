import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Election Administrator Dashboard</h1>
          <p className="text-gray-500 mt-2">Manage elections, configure ballots, and oversee the voting process.</p>
        </div>
        <button className="bg-civic-blue text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
          + Create New Election
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-500 mb-1">Total Active Elections</div>
          <div className="text-3xl font-bold text-gray-900">3</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-500 mb-1">Registered Voters</div>
          <div className="text-3xl font-bold text-gray-900">1.2M</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-500 mb-1">Votes Cast Today</div>
          <div className="text-3xl font-bold text-gray-900">45,201</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-500 mb-1">System Status</div>
          <div className="text-xl font-bold text-green-500 mt-2 flex items-center">
            <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span> Operational
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Manage Active Elections</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Election Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Voters</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">2026 National Presidential Election</div>
                  <div className="text-sm text-gray-500">ID: 1</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1,245,032</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-civic-blue hover:text-blue-900">Manage</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">City Council Initiative 42</div>
                  <div className="text-sm text-gray-500">ID: 2</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Draft</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-civic-blue hover:text-blue-900">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
