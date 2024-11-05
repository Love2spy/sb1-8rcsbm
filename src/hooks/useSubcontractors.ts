import { useQuery, useMutation, useQueryClient } from 'react-query';
import { apiService } from '../services/api';
import type { Subcontractor } from '../types';

export function useSubcontractors() {
  const queryClient = useQueryClient();

  const {
    data: subcontractors = [],
    isLoading: loading,
    error,
  } = useQuery(['subcontractors'], () => apiService.subcontractors.list());

  const { mutateAsync: addSubcontractor } = useMutation(
    (newSubcontractor: Omit<Subcontractor, 'id'>) =>
      apiService.subcontractors.add(newSubcontractor),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['subcontractors']);
      },
    }
  );

  return {
    subcontractors,
    loading,
    error: error ? (error as Error).message : null,
    addSubcontractor,
  };
}