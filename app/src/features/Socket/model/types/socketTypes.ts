import { ISlice } from 'entities/slice';
import {
  ITaskFull,
  ITaskOrderChangeResponse,
  ITaskReviewerSetResponse,
  ITaskStepChangeResponse,
} from 'entities/task';
import { ITodo } from 'entities/todo';

export type TSocketTaskEvent =
  | 'taskCreate'
  | 'taskOrderChange'
  | 'taskReviewerSet'
  | 'taskStepChange'
  | 'taskMetaChange'
  | 'taskDelete'
  | 'taskTodosChange'
  | 'taskTodoToggle';

export type TSocketSliceEvent = 'sliceCreate' | 'sliceUpdate' | 'sliceDelete';

export type TSocketCommentEvent = 'commentCreate';

export type TSocketClientEvent = 'join' | 'leave';

export type TSocketEvent =
  | TSocketTaskEvent
  | TSocketSliceEvent
  | TSocketCommentEvent
  | TSocketClientEvent;

export interface ISocketMessage<T> {
  from: 'server' | number;
  content: T;
}

interface ISocketArgsGen<E extends TSocketEvent, T> {
  event: E;
  callback: (message: ISocketMessage<T>) => void;
}

export type TSocketFnArgs =
  | ISocketArgsGen<'sliceCreate' | 'sliceUpdate', ISlice>
  | ISocketArgsGen<'sliceDelete', number>
  | ISocketArgsGen<'taskCreate', ITaskFull>
  | ISocketArgsGen<'taskMetaChange', ITaskFull>
  | ISocketArgsGen<'taskReviewerSet', ITaskReviewerSetResponse>
  | ISocketArgsGen<'taskOrderChange', ITaskOrderChangeResponse>
  | ISocketArgsGen<'taskStepChange', ITaskStepChangeResponse>
  | ISocketArgsGen<'taskDelete', number>
  | ISocketArgsGen<'taskTodosChange', { taskId: number; todos: ITodo[] }>
  | ISocketArgsGen<
      'taskTodoToggle',
      { taskId: number; todoId: number; checked: boolean }
    >;
