import { useAuthStore } from '../stores';
import type { LoginReqDto, PrincipalDto } from '@app/shared';
import { useMutation } from '@tanstack/react-query';
import { loginMutationKey } from '../consts';

async function loginUser(payload: LoginReqDto): Promise<PrincipalDto> {
  //
  return {
    id: 1,
    uuid: '1'
  };
}

export function useLogin() {
  const setUser = useAuthStore(state => state.setUser);

  return useMutation({
    mutationKey: loginMutationKey,
    mutationFn: loginUser,
    onSuccess: (data: PrincipalDto) => {
      setUser(data);
    }
  });
}
