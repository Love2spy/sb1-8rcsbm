import React, { useState } from 'react';
import { Search, Filter, Loader } from 'lucide-react';
import { useOpportunities } from '../hooks/useOpportunities';

const OpportunityFinder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { opportunities, loading, error, syncWithSAMGov } = useOpportunities();

  const filteredOpportunities = opportunities.filter(opp =>
    opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Find Opportunities</h2>
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          onClick={syncWithSAMGov}
          disabled={loading}
        >
          {loading ? <Loader className="h-5 w-5 animate-spin" /> : null}
          Sync with SAM.gov
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search opportunities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Recent Opportunities</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {loading ? (
            <div className="p-6 text-center">
              <Loader className="h-8 w-8 animate-spin mx-auto text-blue-600" />
              <p className="mt-2 text-gray-500">Loading opportunities...</p>
            </div>
          ) : filteredOpportunities.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No opportunities found
            </div>
          ) : (
            filteredOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{opportunity.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{opportunity.department}</p>
                  </div>
                  <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                    {opportunity.status}
                  </span>
                </div>
                <div className="mt-4 flex gap-4 text-sm text-gray-500">
                  <span>Due: {opportunity.dueDate}</span>
                  <span>Value: {opportunity.value}</span>
                  <span>Contract: {opportunity.contractType}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OpportunityFinder;