import { IStep, stepsContext, useStepsApi } from 'entities/step';
import { ReactNode, useEffect, useState } from 'react';

interface IProps {
  children: ReactNode;
}

export function StepsContextProvider({ children }: IProps) {
  const stepsApi = useStepsApi();
  const [steps, setSteps] = useState<IStep[]>([]);

  useEffect(() => {
    stepsApi.get().then((data) => {
      if (data) {
        setSteps(() => data);
      }
    });
  }, []);

  return (
    <stepsContext.Provider value={{ steps }}>{children}</stepsContext.Provider>
  );
}
