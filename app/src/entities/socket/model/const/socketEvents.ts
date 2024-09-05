import { TSocketEvent } from 'entities/socket';

export const socketEvents: Record<string, Record<string, TSocketEvent>> = {
  client: {
    join: 'join',
    leave: 'leave',
  },
  task: {
    create: 'taskCreate',
    orderChange: 'taskOrderChange',
    reviewerSet: 'taskReviewerSet',
    changeStep: 'taskChangeStep',
    metaChange: 'taskMetaChange',
    delete: 'taskDelete',
  },
  slice: {
    create: 'sliceCreate',
    update: 'sliceUpdate',
    delete: 'sliceDelete',
  },
  todo: {
    create: 'todoCreate',
    toggle: 'todoToggle',
    delete: 'todoDelete',
  },
  comment: {
    create: 'commentCreate',
  },
};