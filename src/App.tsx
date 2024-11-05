import React, { useState } from 'react';
import { 
  Layout, 
  Sidebar, 
  OpportunityFinder,
  OpportunityAnalyzer,
  SubcontractorManager,
  ProposalBuilder,
  AwardTracker
} from './components';
import { Building2, FileSearch, Users, FileCheck, Award } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('opportunities');

  const tabs = [
    { id: 'opportunities', label: 'Find Opportunities', icon: FileSearch },
    { id: 'analyze', label: 'Analyze & Qualify', icon: Building2 },
    { id: 'subcontractors', label: 'Subcontractors', icon: Users },
    { id: 'proposals', label: 'Proposal Builder', icon: FileCheck },
    { id: 'awards', label: 'Award Tracking', icon: Award },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'opportunities':
        return <OpportunityFinder />;
      case 'analyze':
        return <OpportunityAnalyzer />;
      case 'subcontractors':
        return <SubcontractorManager />;
      case 'proposals':
        return <ProposalBuilder />;
      case 'awards':
        return <AwardTracker />;
      default:
        return <OpportunityFinder />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Layout>
        <Sidebar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </Layout>
    </div>
  );
}

export default App;