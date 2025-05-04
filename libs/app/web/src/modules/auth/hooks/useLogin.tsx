import { useAuthStore } from '../stores';
import { Authority, type LoginPayloadDto, type PrincipalDto } from '@app/shared';
import { useMutation } from '@tanstack/react-query';
import { loginMutationKey } from '../consts';
import { useNavigate } from '@tanstack/react-router';

async function loginUser(payload: LoginPayloadDto): Promise<PrincipalDto> {
  //
  return {
    id: 1,
    uuid: '1',
    authorities: [Authority.RESOURCE_ACTION]
  };
}

export function useLogin() {
  const setUser = useAuthStore(state => state.setUser);
  const navigate = useNavigate();

  return useMutation({
    mutationKey: loginMutationKey,
    mutationFn: loginUser,
    onSuccess: (data: PrincipalDto) => {
      setUser(data);
      navigate({ to: '/dashboard' });
    }
  });
}
