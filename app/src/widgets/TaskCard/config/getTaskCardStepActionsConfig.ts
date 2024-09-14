import { TStep } from 'entities/step';
import { ITaskCardStepAction } from 'widgets/TaskCard';

export const getTaskCardStepActionsConfig = (
  taskReady: boolean,
  hasReviewer: boolean,
  handleReviewerChange: ITaskCardStepAction['onChoose'],
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
      hidden: !taskReady,
    },
  ],
  3: [
    {
      toStepId: 1,
      key: 'deny',
      icon: 'Undo2',
      access: 'reviewer',
      hidden: taskReady,
    },
    {
      toStepId: 4,
      key: 'approve',
      icon: 'ShieldCheck',
      access: 'reviewer',
      hidden: !taskReady,
    },
    {
      toStepId: 3,
      key: 'startReview',
      label: 'Начать проверку',
      icon: 'ClipboardList',
      access: 'manager',
      hidden: hasReviewer,
      onChoose: handleReviewerChange,
    },
    {
      toStepId: 3,
      key: 'closeReview',
      label: 'Закончить проверять',
      icon: 'ClipboardX',
      access: 'reviewer',
      onChoose: handleReviewerChange,
    },
  ],
  4: [
    {
      toStepId: 1,
      key: 'restart',
      label: 'Вернуть в бэклог',
      icon: 'CornerUpLeft',
      access: 'manager',
    },
  ],
});
