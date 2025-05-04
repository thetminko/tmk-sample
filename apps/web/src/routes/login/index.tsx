import { createFileRoute, redirect } from '@tanstack/react-router';
import { useLogin } from '@app/web';

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/dashboard' });
    }
  }
});

function RouteComponent() {
  const { mutate } = useLogin();

  return (
    <div>
      Login Page <button onClick={() => mutate({ username: 'mock', password: 'mock' })}>Login</button>
    </div>
  );
}
