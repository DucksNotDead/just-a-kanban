import { Progress } from 'antd';
import { useEffect, useRef, useState } from 'react';

interface IProps {
  ready: boolean
}

export function LoadingProgress({ready}: IProps) {
  const [value, setValue] = useState(5);
  const timer = useRef<ReturnType<typeof window.setInterval>>();

  useEffect(() => {
    timer.current = setTimeout(() => {
      setValue((v) => v >= 98? 98 : v + (100 - v) / (v * 2));
    }, 100);

    if (ready) {
      setValue(() => 100)
    }

    return () => clearTimeout(timer.current);
  }, [value, ready]);

  return <Progress showInfo={false} percent={value} />;
}
