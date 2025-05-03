import { useMemo } from 'react';
import { useAuthStore } from '../stores';

export function useAuth() {
  const user = useAuthStore(state => state.user);

  const isAuthenticated = useMemo(() => !!user, [user]);

  return {
    isAuthenticated
  };
}
