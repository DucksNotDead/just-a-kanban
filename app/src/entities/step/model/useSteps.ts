import { stepsContext } from 'entities/step';
import { useContext } from 'react';

export function useSteps() {
  return useContext(stepsContext);
}
