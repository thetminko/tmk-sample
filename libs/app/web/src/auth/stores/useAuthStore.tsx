import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { PrincipalDto } from '@app/shared';

export interface AuthState {
  user?: PrincipalDto;
}

export interface AuthAction {
  setUser: (user: PrincipalDto) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState & AuthAction>()(
  immer(set => ({
    setUser: user => {
      set(state => {
        state.user = user;
      });
    },
    clearUser: () => {
      set(state => {
        state.user = undefined;
      });
    }
  }))
);
