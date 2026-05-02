import { Link } from 'react-router-dom';
import { EmptyState } from '../components/ui/EmptyState';

export default function NotFound() {
  return <EmptyState title="Page Not Found" message="The route you opened does not exist in the secure voting portal." action={<Link className="rounded-lg bg-civic-accent px-4 py-3 font-semibold text-white" to="/">Return Home</Link>} />;
}
