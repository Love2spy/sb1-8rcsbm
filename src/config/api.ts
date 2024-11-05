export const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  opportunities: `${API_BASE_URL}/opportunities`,
  subcontractors: `${API_BASE_URL}/subcontractors`,
  proposals: `${API_BASE_URL}/proposals`,
  awards: `${API_BASE_URL}/awards`,
  sam: `${API_BASE_URL}/sam`,
} as const;