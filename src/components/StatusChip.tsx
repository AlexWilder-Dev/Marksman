import { useLondonClock } from '../lib/hooks';
import { openStatus } from '../lib/time';

interface Props {
  className?: string;
  compact?: boolean;
}

/** Live open/closed status, computed in Europe/London on the client. */
export function StatusChip({ className, compact }: Props) {
  const clock = useLondonClock();
  const status = clock ? openStatus(clock) : null;
  const state = status ? (status.open ? 'open' : 'closed') : 'pending';
  return (
    <p className={['status-chip', `is-${state}`, compact ? 'is-compact' : '', className ?? ''].join(' ')} aria-live="polite">
      <span className="status-dot" aria-hidden="true" />
      <span className="status-text">
        {status ? status.label : 'Open Tuesday to Sunday'}
      </span>
    </p>
  );
}
