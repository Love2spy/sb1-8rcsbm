export interface Opportunity {
  id: string;
  title: string;
  department: string;
  status: 'active' | 'expired';
  dueDate: string;
  value: string;
  contractType: string;
  description: string;
  naicsCode: string;
  attachments: string[];
}

export interface Subcontractor {
  id: string;
  name: string;
  type: string;
  email: string;
  phone: string;
  certifications: string[];
  pastProjects: number;
  rating: number;
}

export interface Proposal {
  id: string;
  opportunityId: string;
  status: 'draft' | 'submitted';
  technicalProposal: {
    executiveSummary: string;
    technicalApproach: string;
    pastPerformance: string[];
  };
  pricingDetails: PricingItem[];
  documents: string[];
  dueDate: string;
  questionsDeadline: string;
}

export interface PricingItem {
  id: string;
  laborCategory: string;
  hours: number;
  rate: number;
}

export interface Award {
  id: string;
  opportunityId: string;
  status: 'won' | 'lost' | 'pending';
  submissionDate: string;
  value: string;
  department: string;
  title: string;
}