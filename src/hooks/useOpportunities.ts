import { useQuery, useMutation, useQueryClient } from 'react-query';
import { apiService } from '../services/api';

export function useOpportunities() {
  const queryClient = useQueryClient();

  const {
    data: opportunities = [],
    isLoading: loading,
    error,
  } = useQuery(['opportunities'], () => apiService.opportunities.list());

  const { mutateAsync: syncWithSAMGov } = useMutation(
    () => apiService.opportunities.sync(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['opportunities']);
      },
    }
  );

  return {
    opportunities,
    loading,
    error: error ? (error as Error).message : null,
    syncWithSAMGov,
  };
}