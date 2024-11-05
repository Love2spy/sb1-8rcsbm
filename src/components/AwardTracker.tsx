import React from 'react';
import { Award, FileText, MessageSquare, AlertCircle } from 'lucide-react';

const AwardTracker = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Award Tracking</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Bids', value: '24', icon: FileText, color: 'blue' },
          { label: 'Won', value: '8', icon: Award, color: 'green' },
          { label: 'Lost', value: '12', icon: AlertCircle, color: 'red' },
          { label: 'Pending', value: '4', icon: MessageSquare, color: 'yellow' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Recent Submissions</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            { status: 'won', date: '2024-03-01' },
            { status: 'lost', date: '2024-02-28' },
            { status: 'pending', date: '2024-02-25' },
          ].map((submission, i) => (
            <div key={i} className="p-6 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">
                    Network Infrastructure Upgrade
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Department of Veterans Affairs
                  </p>
                </div>
                <span className={`px-3 py-1 text-sm rounded-full ${
                  submission.status === 'won' ? 'bg-green-100 text-green-800' :
                  submission.status === 'lost' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                </span>
              </div>
              <div className="mt-4 flex gap-4 text-sm text-gray-500">
                <span>Submitted: {submission.date}</span>
                <span>Value: $2.5M</span>
                {submission.status === 'lost' && (
                  <button className="text-blue-600 hover:text-blue-700">
                    Request Debrief
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AwardTracker;