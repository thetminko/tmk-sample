import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/dashboard' });
    }
  }
});

function RouteComponent() {
  return <div>Login Page</div>;
}
