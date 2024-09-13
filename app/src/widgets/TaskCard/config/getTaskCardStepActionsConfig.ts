import { TStep } from 'entities/step';
import { ITaskCardStepAction } from 'widgets/TaskCard';

export const getTaskCardStepActionsConfig = (
  taskReady: boolean,
  onDeny: ITaskCardStepAction['onChoose'],
): {
  [P in TStep]: ITaskCardStepAction[];
} => ({
  1: [
    {
      toStepId: 2,
      key: 'startWork',
      access: 'responsible',
      icon: 'Play',
    },
  ],
  2: [
    {
      toStepId: 1,
      key: 'pauseWork',
      icon: 'Pause',
      access: 'responsible',
    },
    {
      toStepId: 3,
      key: 'sendToReview',
      icon: 'ScanEye',
      access: 'responsible',
      hidden: taskReady,
    },
  ],
  3: [
    {
      toStepId: 1,
      key: 'deny',
      icon: 'MessageCircleReply',
      access: 'manager',
      onChoose: onDeny,
    },
    {
      toStepId: 4,
      key: 'approve',
      icon: 'ShieldCheck',
      access: 'manager',
    },
  ],
  4: [
    {
      toStepId: 1,
      key: 'restart',
      icon: 'CornerUpLeft',
      access: 'manager',
    },
  ],
});
