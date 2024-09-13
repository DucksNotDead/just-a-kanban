import { IStep } from 'entities/step';
import { createContext } from 'react';

export const stepsContext = createContext<{ steps: IStep[] }>({
  steps: [],
})