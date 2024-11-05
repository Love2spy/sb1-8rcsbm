import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import type { Opportunity, Subcontractor, Proposal } from '../types';

const api = axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  opportunities: {
    async list(params?: { search?: string; status?: string }) {
      const { data } = await api.get<Opportunity[]>(API_ENDPOINTS.opportunities, { params });
      return data;
    },

    async sync() {
      const { data } = await api.post(`${API_ENDPOINTS.sam}/sync`);
      return data;
    },

    async getById(id: string) {
      const { data } = await api.get<Opportunity>(`${API_ENDPOINTS.opportunities}/${id}`);
      return data;
    }
  },

  subcontractors: {
    async list() {
      const { data } = await api.get<Subcontractor[]>(API_ENDPOINTS.subcontractors);
      return data;
    },

    async add(subcontractor: Omit<Subcontractor, 'id'>) {
      const { data } = await api.post<Subcontractor>(
        API_ENDPOINTS.subcontractors,
        subcontractor
      );
      return data;
    },

    async update(id: string, subcontractor: Partial<Subcontractor>) {
      const { data } = await api.put<Subcontractor>(
        `${API_ENDPOINTS.subcontractors}/${id}`,
        subcontractor
      );
      return data;
    }
  },

  proposals: {
    async save(proposal: Partial<Proposal>) {
      const formData = new FormData();
      
      // Handle file uploads
      if (proposal.documents) {
        proposal.documents.forEach((doc) => {
          formData.append('documents', doc);
        });
      }

      // Add other proposal data
      formData.append('data', JSON.stringify(proposal));

      const { data } = await api.post<Proposal>(
        API_ENDPOINTS.proposals,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return data;
    },

    async getById(id: string) {
      const { data } = await api.get<Proposal>(`${API_ENDPOINTS.proposals}/${id}`);
      return data;
    }
  }
};