import { useEffect, useState } from 'react';

export function useEnterAnimation(style: string) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(() => true));
  }, []);

  return mounted ? style : '';
}
