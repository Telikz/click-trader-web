import { createFileRoute } from '@tanstack/react-router';
import { Leaderboards } from '~/components/Leaderboards';

export const Route = createFileRoute('/leaderboards')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Leaderboards />;
}
