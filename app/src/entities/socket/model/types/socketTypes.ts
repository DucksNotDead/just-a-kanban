import { ISlice } from 'entities/slice';

export type TSocketTaskEvent =
  | 'taskCreate'
  | 'taskOrderChange'
  | 'taskReviewerSet'
  | 'taskChangeStep'
  | 'taskMetaChange'
  | 'taskDelete';

export type TSocketSliceEvent = 'sliceCreate' | 'sliceUpdate' | 'sliceDelete';

export type TSocketTodoEvent = 'todoCreate' | 'todoToggle' | 'todoDelete';

export type TSocketCommentEvent = 'commentCreate';

export type TSocketClientEvent = 'join' | 'leave';

export type TSocketEvent =
  | TSocketTaskEvent
  | TSocketSliceEvent
  | TSocketTodoEvent
  | TSocketCommentEvent
  | TSocketClientEvent;

interface ISocketMessage<T> {
  from: 'server' | number;
  content: T;
}

interface ISocketArgsGen<E extends TSocketEvent, T> {
  event: E;
  callback: (message: ISocketMessage<T>) => void;
}

export type TSocketFnArgs =
  | ISocketArgsGen<'sliceCreate' | 'sliceUpdate', ISlice>
  | ISocketArgsGen<'sliceDelete', number>;

