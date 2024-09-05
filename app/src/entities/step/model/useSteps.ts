import { IStep, useStepsApi } from 'entities/step';
import { useEffect, useState } from 'react';

export function useSteps() {
  const stepsApi = useStepsApi();
  const [steps, setSteps] = useState<IStep[]>([]);

  useEffect(() => {
    stepsApi.get().then((data) => {
      if (data) {
        setSteps(() => data);
      }
    });
  }, []);

  return steps;
}
