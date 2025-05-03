import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/' });
    }
  }
});

function RouteComponent() {
  return <div>Protected routes</div>;
}
