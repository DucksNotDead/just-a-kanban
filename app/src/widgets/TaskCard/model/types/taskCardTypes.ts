import { TStep } from 'entities/step';
import { ITaskFull } from 'entities/task';
import { TTaskAccess } from 'features/TaskAccess';
import { icons } from 'lucide-react';

export type TTaskCardStatus = 'default' | 'inReview' | 'ghost';

export interface ITaskCard {
  key: number;
  task: ITaskFull;
  status: TTaskCardStatus;
}

export type TTaskStepAction =
  | 'startWork'
  | 'pauseWork'
  | 'sendToReview'
  | 'startReview'
  | 'closeReview'
  | 'deny'
  | 'approve'
  | 'restart';

export interface ITaskCardStepAction {
  key: TTaskStepAction;
  icon: keyof typeof icons;
  toStepId: TStep;
  access: TTaskAccess[number];
  label?: string;
  hidden?: boolean;
  onChoose?: (changeStepFn: () => void) => void;
}
