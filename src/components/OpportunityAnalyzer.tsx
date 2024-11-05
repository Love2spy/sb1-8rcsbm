import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const OpportunityAnalyzer = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Opportunity Analysis</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-lg mb-4">Qualification Checklist</h3>
          <div className="space-y-4">
            {[
              { label: 'NAICS Code Match', status: 'success' },
              { label: 'Past Performance', status: 'warning' },
              { label: 'Security Clearance', status: 'success' },
              { label: 'Financial Capability', status: 'error' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-gray-700">{item.label}</span>
                {item.status === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                {item.status === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                {item.status === 'error' && <XCircle className="h-5 w-5 text-red-500" />}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-lg mb-4">Risk Assessment</h3>
          <div className="space-y-4">
            {[
              { category: 'Technical Risk', level: 'Low' },
              { category: 'Financial Risk', level: 'Medium' },
              { category: 'Schedule Risk', level: 'High' },
              { category: 'Performance Risk', level: 'Low' },
            ].map((risk, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-gray-700">{risk.category}</span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  risk.level === 'Low' ? 'bg-green-100 text-green-800' :
                  risk.level === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {risk.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-lg mb-4">Decision Matrix</h3>
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Criteria</th>
              <th className="text-left py-3">Weight</th>
              <th className="text-left py-3">Score</th>
              <th className="text-left py-3">Weighted Score</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {[
              { criteria: 'Technical Capability', weight: 30, score: 8 },
              { criteria: 'Past Performance', weight: 25, score: 7 },
              { criteria: 'Cost Competitiveness', weight: 25, score: 6 },
              { criteria: 'Resource Availability', weight: 20, score: 9 },
            ].map((item, i) => (
              <tr key={i}>
                <td className="py-3">{item.criteria}</td>
                <td className="py-3">{item.weight}%</td>
                <td className="py-3">{item.score}/10</td>
                <td className="py-3">{(item.weight * item.score / 10).toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OpportunityAnalyzer;