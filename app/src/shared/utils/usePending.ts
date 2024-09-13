import { useEffect, useState } from 'react';
import { PENDING_TIMEOUT } from 'shared/const';

export function usePending(initial: boolean = true, delay?: number) {
  const [pending, setPending] = useState(initial);
  const [pendingWithTimeout, setPendingWithTimeout] = useState(initial);

  useEffect(() => {
    const timeout = setTimeout(
      () => setPendingWithTimeout(() => pending),
      pending ? 0 : (delay ?? PENDING_TIMEOUT),
    );

    return () => {
      clearTimeout(timeout);
    };
  }, [pending]);

  return [pendingWithTimeout, setPending] as const;
}
